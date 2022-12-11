import React, { useEffect } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import { handleError } from "../../utils/helperFunctions";
import CustomMessageBox from "./CustomMessageBox";
import { handleMessageFormation } from "./HelperFunctions";

function MessagesContainer({
  data,
  newData,
  handleScroll,
  scrollRef,
  active,
  getNewMessage,
  setNewData,
  reRender,
}) {
  const { user, currentUser } = useRealmContext();

  useEffect(() => {
    let breakAsyncIterator = false; // Later used to exit async iterator
    (async () => {
      const mongo = currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("test").collection("messages");

      for await (const change of collection.watch({
        filter: {
          operationType: "insert",
          "fullDocument.chatroomId": active.id,
        },
      })) {
        if (breakAsyncIterator) {
          return;
        }
        const { documentKey, fullDocument } = change;
        getNewMessage(fullDocument?._id.toString());
      }
    })();
    return () => {
      breakAsyncIterator = true; // Exit async iterator
    };
  }, []);
  return (
    <ChatContainer onScroll={handleScroll} ref={scrollRef}>
      {newData.length > 0 ? (
        <ChatContainer1>
          {newData.map((message) => {
            const newMessage = handleMessageFormation(message);
            return (
              <CustomMessageBox
                inverted={false}
                position={user?._id === newMessage?.userId ? "right" : "left"}
                title={newMessage?.userName}
                type={message?.type}
                key={message?._id}
                avatar={message?.userId?.profilePic}
                {...newMessage}
              />
            );
          })}
        </ChatContainer1>
      ) : null}
      <MessageListContainer>
        {data.map((message) => {
          const newMessage = handleMessageFormation(message);
          return (
            <CustomMessageBox
              position={user?._id === newMessage?.userId ? "right" : "left"}
              title={newMessage?.userName}
              type={message?.type}
              key={message?._id}
              avatar={message?.userId?.profilePic}
              {...newMessage}
            />
          );
        })}
      </MessageListContainer>
    </ChatContainer>
  );
}

export default MessagesContainer;
const ChatContainer = styled.div`
  overflow: scroll;
  transform: rotateX(180deg);
  flex: 1;
`;
const ChatContainer1 = styled.div`
  overflow: scroll;
  transform: rotateX(180deg);
  .gWUMbg.sc-ibYzZP {
    margin-top: 0;
  }
`;

const MessageListContainer = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
`;

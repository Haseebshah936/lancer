import React, { useEffect, useState } from "react";
import { ChatItem } from "react-chat-elements";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import colors from "../../utils/colors";

function CustomChatItem({ chatroom, onClick, onClickMute }) {
  const { currentUser } = useRealmContext();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    console.log("Chatroom", chatroom);
  }, []);

  const listenForUpdates = async (breakAsyncIterator) => {
    console.log("Calleed");
    const mongo = currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("test").collection("users");
    for await (const change of collection.watch({
      ids: [chatroom?.participantId],
    })) {
      console.log(breakAsyncIterator);
      if (breakAsyncIterator) {
        console.log("Exiting async iterator");
        return;
      } // Exit async iterator
      switch (change.operationType) {
        case "insert": {
          const { documentKey, fullDocument } = change;
          console.log(
            `new document: ${documentKey}`,
            fullDocument,
            fullDocument?._id.toString()
          );
          break;
        }
        case "update": {
          const { documentKey, fullDocument } = change;
          console.log(`updated document: ${documentKey}`, fullDocument);
          breakAsyncIterator = true;
          break;
        }
        case "replace": {
          const { documentKey, fullDocument } = change;
          console.log(`replaced document: ${documentKey}`, fullDocument);
          break;
        }
        case "delete": {
          const { documentKey } = change;
          console.log(`deleted document: ${documentKey}`);
          break;
        }
      }
    }
  };

  useEffect(() => {
    let breakAsyncIterator = false; // Later used to exit async iterator
    if (!chatroom?.isGroup) {
      listenForUpdates(breakAsyncIterator);
    }

    return () => {
      breakAsyncIterator = true;
    };
  }, []);

  return (
    <Container>
      <ChatItem
        onClick={() => {
          onClick(chatroom);
        }}
        onClickMute={() => onClickMute(chatroom, chatroom.muted)}
        {...chatroom}
        statusColor={status ? colors.lightGrey : colors.lightGreen}
        showMute={true}
      />
    </Container>
  );
}

export default CustomChatItem;

const Container = styled.div`
  .rce-citem-avatar img {
    object-fit: cover;
  }
`;

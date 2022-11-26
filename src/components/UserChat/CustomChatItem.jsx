import React, { useEffect, useState } from "react";
import { ChatItem } from "react-chat-elements";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import colors from "../../utils/colors";
import mongoose from "mongoose";
import { color } from "@mui/system";
import { useCustomContext } from "../../Hooks/useCustomContext";

function CustomChatItem({
  chatroom,
  onClick,
  onClickMute,
  changeChatroomsData,
  index,
}) {
  const { currentUser } = useRealmContext();
  const { activeChatroom, setActiveChatroom, setActiveChatroomStatus } =
    useCustomContext();
  const [isOnline, setIsOnline] = useState(
    new Date(chatroom.isOnline).getTime()
  );
  const [status, setStatus] = useState(
    isOnline >= new Date().getTime() - 45000 && isOnline < new Date().getTime()
  );
  let timeOut;
  // useEffect(() => {
  //   console.log("Chatroom", chatroom);
  // }, []);

  useEffect(() => {
    let breakAsyncIterator = false; // Later used to exit async iterator
    if (!chatroom?.isGroup) {
      (async () => {
        console.log("Calleed");
        const mongo = currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("test").collection("users");
        console.log(collection);
        for await (const change of collection.watch({
          filter: {
            operationType: "update",
            "fullDocument._id": mongoose.Types.ObjectId(chatroom.participantId),
          },
        })) {
          console.log(breakAsyncIterator);
          if (breakAsyncIterator) {
            console.log("Exiting async iterator");
            return;
          } // Exit async iterator
          const { documentKey, fullDocument } = change;
          console.log(
            `new document: ${documentKey}`,
            fullDocument,
            fullDocument?._id.toString()
          );
          const isOnline = new Date(fullDocument?.isOnline).getTime();
          console.log(
            new Date(fullDocument.isOnline).getTime() >=
              new Date().getTime() - 30000 &&
              new Date(fullDocument.isOnline).getTime() < new Date().getTime()
          );
          clearTimeout(timeOut);
          setIsOnline(isOnline);
          setStatus(true);
          setActiveChatroomStatus((prev) => {
            if (prev.id === chatroom.id) {
              return {
                ...prev,
                isOnline: fullDocument?.isOnline,
                status: true,
              };
            } else {
              return prev;
            }
          });
          changeChatroomsData(index, chatroom.id, isOnline);
        }
      })();
    }

    return () => {
      breakAsyncIterator = true;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline >= new Date().getTime() - 45000) {
        setStatus(true);
        setActiveChatroomStatus((prev) => {
          if (prev.id === chatroom.id) {
            return { ...prev, isOnline, status: true };
          } else {
            return prev;
          }
        });
      } else {
        setStatus(false);
        setActiveChatroomStatus((prev) => {
          if (prev.id === chatroom.id) {
            return { ...prev, status: false };
          } else {
            return prev;
          }
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
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
        statusColor={status ? colors.lightGreen : colors.gray}
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

import React, { useEffect, useState } from "react";
import { ChatItem } from "react-chat-elements";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import colors from "../../utils/colors";
import mongoose from "mongoose";
import { color } from "@mui/system";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { useRef } from "react";
import { InsertDriveFile } from "@mui/icons-material";
import { watchCollection } from "../../db/helperFunction";
import { requestMethod } from "../../requestMethod";

function CustomChatItem({
  chatroom,
  subtitle,
  onClick,
  onClickMute,
  changeChatroomsData,
  index,
}) {
  const { currentUser, user } = useRealmContext();
  const { activeChatroom, setActiveChatroom, setActiveChatroomStatus } =
    useCustomContext();
  const [isOnline, setIsOnline] = useState(
    new Date(chatroom.isOnline).getTime()
  );
  const [status, setStatus] = useState(
    new Date(chatroom.isOnline).getTime() >= new Date().getTime() - 60000
  );
  let interval;

  const handleOnlineStatus = (change) => {
    const { documentKey, fullDocument } = change;
    const isOnline = new Date(fullDocument?.isOnline).getTime();
    setIsOnline(isOnline);
    setStatus(true);
    setActiveChatroomStatus((prev) => {
      if (prev.id === chatroom.id) {
        return { ...prev, isOnline, status: true };
      } else {
        return prev;
      }
    });
    changeChatroomsData(index, chatroom.id, { isOnline });
  };

  const handleNewMessage = (change) => {
    const { documentKey, fullDocument } = change;
    // console.log("new message", fullDocument);
    // console.log("UserId", user._id);
    requestMethod
      .get(`/chatroom/getChatroom/${chatroom.id}/${user._id}`)
      .then((res) => {
        // console.log("res New message", res.data);
        changeChatroomsData(index, chatroom.id, res.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
    // if (sender !== currentUser.id) {
    //   changeChatroomsData(index, chatroom.id, { message });
    // }
  };

  useEffect(() => {
    // console.log("Chatroom", chatroom);
  }, []);

  useEffect(() => {
    let breakAsyncIterator_status = false;
    if (user) {
      let breakAsyncIterator_chatroom = false;
      if (!chatroom?.isGroup) {
        const filter = {
          filter: {
            operationType: "update",
            "fullDocument._id": mongoose.Types.ObjectId(chatroom.participantId),
          },
        };
        watchCollection(
          currentUser,
          "users",
          filter,
          breakAsyncIterator_status,
          handleOnlineStatus
        );
      }
      const filter = {
        filter: {
          operationType: "update",
          "fullDocument._id": mongoose.Types.ObjectId(chatroom.id),
        },
      };
      watchCollection(
        currentUser,
        "chatrooms",
        filter,
        breakAsyncIterator_chatroom,
        handleNewMessage
      );
    }

    return () => {
      breakAsyncIterator_status = true;
    };
  }, [user]);

  useEffect(() => {
    clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval = setInterval(() => {
      // console.log("Called", isOnline);
      const newIsOnline = new Date(isOnline);
      // console.log(
      //   newIsOnline.toLocaleString(),
      //   new Date(new Date().getTime() - 60000).toLocaleString()
      // );
      if (
        newIsOnline >= new Date().getTime() - 60000 &&
        newIsOnline < new Date().getTime()
      ) {
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
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  useEffect(() => {
    console.log("Chatroom", chatroom);
  }, [chatroom]);

  return (
    <Container>
      <ChatItem
        onClick={() => {
          onClick(chatroom);
        }}
        {...chatroom}
        onClickMute={() => onClickMute(chatroom, chatroom.muted)}
        statusColor={status ? colors.lightGreen : colors.gray}
        showMute={true}
        subtitle={
          subtitle !== "key##->doc" ? (
            chatroom.subtitle
          ) : (
            <InsertDriveFile fontSize="medium" />
          )
        }
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

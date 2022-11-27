import { ArrowBack, Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { ChatItem, ChatList } from "react-chat-elements";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { miniPc, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";
import CustomChatItem from "./CustomChatItem";
import MorePoper from "./MorePoper";
import mongoose from "mongoose";
import { useRealmContext } from "../../db/RealmContext";

function ChatRooms({
  chatrooms = [],
  onRoomClick = () => {},
  onMuteClick = () => {},
  onFilter = () => {},
  changeChatroomsData = () => {},
  setChatRooms,
}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const { currentUser } = useRealmContext();

  // getChatRooms()
  // .then(async (res) => {
  //   setChatRooms(res.data);
  //   setChatRoomsData(res.data);
  //   const chatroomsIds = [];
  //   res.data.map((chatroom) => {
  //     if (!chatroom.isGroup)
  //       chatroomsIds.push(
  //         mongoose.Types.ObjectId(chatroom.participantId)
  //       );
  //   });
  //   console.log("chatroomsIds", chatroomsIds);
  //   console.log("Calleed");
  //   const mongo = currentUser.mongoClient("mongodb-atlas");
  //   const collection = mongo.db("test").collection("users");
  //   console.log(collection);
  //   for await (const change of collection.watch({
  //     filter: {
  //       operationType: "update",
  //       "fullDocument._id": {
  //         $in: chatroomsIds,
  //       },
  //     },
  //   })) {
  //     console.log(breakAsyncIterator);
  //     if (breakAsyncIterator) {
  //       console.log("Exiting async iterator");
  //       return;
  //     } // Exit async iterator
  //     const { documentKey, fullDocument } = change;
  //     console.log(
  //       `new document: ${documentKey}`,
  //       fullDocument,
  //       fullDocument?._id.toString()
  //     );
  //   }
  // })
  // .catch((err) => console.log(err));

  // useEffect(() => {
  //   let breakAsyncIterator = false; // Later used to exit async iterator
  //   const chatroomsId = [];
  //   chatrooms.map((chatroom) => {
  //     if (!chatroom?.isGroup)
  //       chatroomsId.push(mongoose.Types.ObjectId(chatroom?.participantId));
  //   });
  //   console.log("CHatroomsId", chatroomsId);
  //   (async () => {
  //     console.log("Calleed");
  //     const mongo = currentUser.mongoClient("mongodb-atlas");
  //     const collection = mongo.db("test").collection("users");
  //     console.log(collection);
  //     for await (const change of collection.watch({
  //       filter: {
  //         operationType: "update",
  //         "fullDocument._id": {
  //           $in: chatroomsId,
  //         },
  //       },
  //     })) {
  //       console.log(breakAsyncIterator);
  //       if (breakAsyncIterator) {
  //         console.log("Exiting async iterator");
  //         return;
  //       } // Exit async iterator
  //       const { documentKey, fullDocument } = change;
  //       console.log(
  //         `new document: ${documentKey}`,
  //         fullDocument.isOnline,
  //         fullDocument?._id.toString()
  //       );
  //       setChatRooms((prev) => {
  //         let newChatrooms = [...prev];
  //         let index = 0;
  //         for (; index < prev.length; index++) {
  //           const element = prev[index];
  //           if (element.participantId === fullDocument?._id.toString()) {
  //             break;
  //           }
  //         }
  //         console.log(index);
  //         newChatrooms[index].isOnline = fullDocument?.isOnline;
  //         return newChatrooms;
  //       });
  //       // changeChatroomsData(
  //       //   fullDocument?._id.toString(),
  //       //   fullDocument.isOnline
  //       // );
  //     }
  //   })();
  //   return () => {
  //     breakAsyncIterator = true;
  //   };
  // }, []);

  return (
    <ChatRoomsContainer>
      {chatrooms.map((chatroom, i) => {
        return (
          <CustomChatItem
            key={chatroom.id}
            onClick={onRoomClick}
            onClickMute={onMuteClick}
            subtitle={chatroom.subtitle}
            chatroom={chatroom}
            index={i}
            changeChatroomsData={changeChatroomsData}
          />
        );
      })}
    </ChatRoomsContainer>
  );
}

export default ChatRooms;

const ChatRoomsContainer = styled.div`
  display: flex;
  padding-bottom: 1rem;
  flex-direction: column;
  height: 100%;
  flex-shrink: 1;
  .rce-citem-status {
    border: 1px solid white;
    height: 10px;
    bottom: 16px;
    right: 16px;
    width: 10px;
  }
  .rce-citem-body--bottom-status span {
    background: ${colors.lightGreen};
    height: 10px;
    width: 10px;
  }
  /* ${mobile({ margin: "2rem 0rem" })} */
`;

const SearchBox = styled.div`
  border: 1px solid ${colors.lightGrey};
  border-radius: 10rem;
  align-self: center;
  padding: 0.5rem 1rem;
  min-width: 28rem;
  width: 80%;
  display: flex;
  justify-content: space-between;
  ${miniPc({
    minWidth: "22rem",
  })}
`;
const Button = styled.div`
  /* border-bottom: 2px solid black; */
  align-self: center;
  font-size: 1.6rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
  animation: slide 2s ease-in-out;
  &:hover {
    animation: slide 2s infinite;
  }
  font-weight: 700;
  ${mobile({
    display: "flex",
  })}
  cursor: pointer;
`;

import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { MessageBox, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import styled from "styled-components";
import {
  miniMobile,
  miniPc,
  miniTablet,
  mobile,
  tablet,
} from "../../responsive";
import colors from "../../utils/colors";
import ChatRooms from "./ChatRooms";
import MessageHeader from "./MessageHeader";
import ChatInput from "./ChatInput";
import CustomMessageBox from "./CustomMessageBox";
import { chat } from "../../utils/dummyData";
import axios from "axios";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import { handleError } from "../../utils/helperFunctions";
import {
  handleMessageCreation,
  handleMessageFormation,
} from "./HelperFunctions";

const ChatRoomsData = [
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(new Date().getTime() - 500000),
    unread: true,
    muted: false,
    showMute: true,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Haseeb",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(new Date().getTime() - 500000),
    unread: false,
    muted: false,
    showMute: true,
  },
];

function Chat(props) {
  const messageRef = useRef();
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomsData, setChatRoomsData] = useState([]);
  const { user } = useRealmContext();

  const getChatRooms = () => {
    requestMethod
      .get(`chatroom/getChatroomsById/${user._id}`)
      .then((res) => {
        console.log(res.data);
        setChatRooms(res.data);
        setChatRoomsData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getChatRoomMessages = (chatRoomId) => {
    requestMethod
      .get(`message/${chatRoomId}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  };

  const handleChatRoomClick = (chatRoom) => {
    console.log("ChatRoom", chatRoom);
    setActive(chatRoom);
  };

  const handleBackClick = () => {
    setActive(false);
  };

  const handleSend = (message) => {
    const newMessage = handleMessageCreation(user._id, active.id, message);
    requestMethod
      .post("message", newMessage)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
    message = {
      ...newMessage,
      userId: {
        _id: user._id,
        name: user.name,
      },
    };
    console.log("message", message);
    setData((prev) => [
      ...prev,
      {
        ...message,
      },
    ]);
  };

  const handleMuteChatRoom = (chatroom, muted) => {
    console.log("Mute ChatRoom", muted);
    const index = chatRooms.indexOf(chatroom);
    let newChatRooms = [...chatRooms];
    newChatRooms[index].muted = !muted;
    setChatRooms(newChatRooms);
    requestMethod
      .put(`chatroom/${muted ? "unMute" : "mute"}Chatroom/${chatroom.id}`, {
        participantId: chatroom.userParticipantId,
      })
      .catch((err) => {
        console.log("Error", err);
        newChatRooms = [...chatRooms];
        newChatRooms[index].muted = muted;
        setChatRooms(newChatRooms);
        handleError(err);
      });
  };

  const handleFilter = (value) => {
    if (value !== "") {
      setChatRooms(
        chatRooms.filter((chatRoom) =>
          chatRoom.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setChatRooms(chatRoomsData);
    }
  };

  const handleCall = () => {};

  const handleVideoCall = () => {};

  useEffect(() => {
    // messageRef.current.scrollIntoView({
    //   block: "end",
    //   inline: "nearest",
    // });
  }, [data, active]);

  useEffect(() => {
    if (active) getChatRoomMessages(active.id);
  }, [active]);

  useEffect(() => {
    if (user) {
      getChatRooms();
    }
  }, [user]);

  return (
    <Container>
      <ChatRoomsContainer active={active}>
        <ChatRooms
          chatrooms={chatRooms}
          onRoomClick={handleChatRoomClick}
          onMuteClick={handleMuteChatRoom}
          onFilter={handleFilter}
        />
      </ChatRoomsContainer>
      <MessageContainer active={active}>
        <MessageHeader
          uri={active.avatar}
          name={active.title}
          status={active.isOnline}
          isGroup={active.isGroup}
          onBackClick={handleBackClick}
          onClickCall={handleCall}
          onClickVideoCall={handleVideoCall}
        />
        <ChatContainer>
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
            <div style={{ height: ".1rem" }} ref={messageRef} />
          </MessageListContainer>
        </ChatContainer>

        <ChatInput onSend={handleSend} />
      </MessageContainer>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  margin-inline: 7%;
  justify-content: space-between;
  margin-top: 2rem;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  height: 86vh;
  overflow-y: hidden;
  img.rce-avatar {
    object-fit: cover;
  }
  ${tablet({ marginInline: "2%" })}
  ${miniTablet({
    flexDirection: "column",
    marginInline: "7%",
  })}
  ${mobile({
    marginInline: "0%",
    height: "89vh",
    boxShadow: "none",
    overflowY: "hidden",
    marginTop: 0,
  })}
`;

const ChatRoomsContainer = styled.div`
  width: 35%;
  border-right: 1px solid ${colors.lightGrey};
  ${miniPc({ width: "40%" })}
  ${miniTablet({
    border: "none",
    display: (props) => (!props.active ? "block" : "none"),
    width: "100%",
  })};
  height: 100%;
`;

const MessageContainer = styled.div`
  width: 65%;
  background: ${colors.white};
  padding-top: 2rem;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  display: ${(props) => (props.active ? "flex" : "none")};
  ${miniTablet({
    width: "auto",
  })};
`;

const ChatContainer = styled.div`
  transform: rotateX(180deg);
  flex: 1;
  overflow: scroll;
`;

const MessageListContainer = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  padding-inline: 1rem;
  overflow-x: hidden;
  flex: 1;
  .rce-container-mbox {
    width: 100%;
    min-width: auto;
  }
  .rce-mbox {
    max-width: 70%;
    padding-right: 1.2rem;
    color: #4b3030;
    min-width: auto;
    box-shadow: none;
    background-color: ${colors.becomePartnerButtonGreen};
    margin: 0px;
    padding-bottom: 1.2rem;
  }
  .rce-mbox-text {
    color: ${colors.white};
  }

  .rce-mbox.rce-mbox-right {
    color: ${colors.black};
    padding-top: 1.2rem;
    background-color: ${colors.userChatMessageBackground};
    .rce-mbox-text {
      color: ${colors.black};
    }
  }
  .rce-mbox-title {
    color: white;
    font-weight: 700;
  }
  .rce-mbox.rce-mbox-right .rce-mbox-title {
    color: black;
  }
  [class*="notch"] {
    display: none;
  }
  scrollbar-width: 0.6rem;
  &::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray};
    border-radius: 10rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-resizer {
    display: none;
  }
  ${miniTablet({
    flexDirection: "column",
  })}
  ${mobile({
    ".rce-mbox": {
      maxWidth: "85%",
    },
  })}
  ${miniMobile({
    ".rce-mbox": {
      maxWidth: "95%",
    },
  })}
`;

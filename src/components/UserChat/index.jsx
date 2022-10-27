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

const ChatRoomsData = [
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(new Date().getTime() - 500000),
    unread: true,
    statusColor: colors.lightGreen,
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
    statusColor: colors.gray,
    muted: false,
    showMute: true,
  },
];

function Chat(props) {
  const messageRef = useRef();
  const [data, setData] = useState(chat);
  const [active, setActive] = useState(false);
  const [chatRooms, setChatRooms] = useState(ChatRoomsData);
  const [chatRoomsData, setChatRoomsData] = useState(ChatRoomsData);

  useEffect(() => {
    setData(chat);
  }, [chat]);

  const handleChatRoomClick = (chatRoom) => {
    console.log("ChatRoom", chatRoom);
    setActive(chatRoom);
  };

  const handleBackClick = () => {
    setActive(false);
  };

  const handleSend = (message) => {
    console.log("message", message);
    setData((prev) => [
      ...prev,
      {
        ...message,
        avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
        alt: "kursat_avatar",
      },
    ]);
  };

  const handleMuteChatRoom = (chatRoom) => {
    console.log("Mute ChatRoom", chatRoom);
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
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, active]);

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
          name={active.title}
          onBackClick={handleBackClick}
          onClickCall={handleCall}
          onClickVideoCall={handleVideoCall}
        />
        <MessageListContainer>
          {data.map(({ userId, userName, type, ...e }, i) => {
            return (
              <CustomMessageBox
                position={userId == 1 ? "right" : "left"}
                title={userName}
                type={type}
                key={i}
                {...e}
              />
            );
          })}
          <div ref={messageRef} />
        </MessageListContainer>

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
  height: 82vh;
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

const MessageListContainer = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  padding-inline: 1rem;
  .rce-container-mbox {
    width: 100%;
    min-width: auto;
  }
  .rce-mbox {
    max-width: 70%;
    padding-right: 1.5rem;
    color: white;
    min-width: auto;
    box-shadow: none;
    background-color: ${colors.becomePartnerButtonGreen};
    margin: 0px;
    padding-bottom: 1.2rem;
    min-width: 40%;
  }
  .rce-mbox.rce-mbox-right {
    color: black;
    background-color: ${colors.userChatMessageBackground};
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
  ${miniTablet({
    flexDirection: "column",
  })}
  ${miniMobile({
    ".rce-mbox": {
      width: "85%",
    },
  })}
`;

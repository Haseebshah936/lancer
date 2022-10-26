import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MessageBox, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import styled from "styled-components";
import { miniPc, miniTablet, tablet } from "../../responsive";
import colors from "../../utils/colors";
import ChatRooms from "./ChatRooms";
import MessageHeader from "./MessageHeader";
import AutoLinkText from "react-autolink-text2";
import ChatInput from "./ChatInput";

const data = [
  {
    uid: 0,
    type: "text",
    title: "Kursat",
    text: "Give me a message list example !",
  },
  {
    uid: 1,
    type: "text",
    title: "Emre",
    text: "www.google.com",
  },
];

function Chat(props) {
  return (
    <Container>
      <ChatRoomsContainer>
        <ChatRooms />
      </ChatRoomsContainer>
      <MessageContainer>
        <MessageHeader />

        {/* <MessageListContainer>
          {data.map((e, i) => {
            return (
              <MessageBox
                id={i}
                position={e.uid % 2 == 0 ? "left" : "right"}
                type={e.type}
                title={e.title}
                text={<AutoLinkText text={e.text} />}
              />
            );
          })}
        </MessageListContainer> */}
        <MessageListContainer
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example hey there how are you. I thought you were dead or some thing !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
            {
              position: "left",
              type: "text",
              title: "Kursat",
              text: "Give me a message list example !",
            },
            {
              position: "right",
              type: "text",
              title: "Emre",
              text: <AutoLinkText text={"google.com"} />,
            },
          ]}
        />
        <ChatInput />
      </MessageContainer>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  margin-inline: 7%;
  justify-content: space-between;
  margin-top: 5rem;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  height: 85vh;
  ${miniTablet({ boxShadow: "none", marginInline: "2%" })}/* ${miniPc({
    boxShadow: "none",
  })} */
`;

const ChatRoomsContainer = styled.div`
  width: 35%;
  border-right: 1px solid ${colors.lightGrey};
  ${tablet({ width: "40%" })}
  ${miniTablet({ boxShadow: "none" })};
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
`;
const MessageListContainer = styled(MessageList)`
  scroll-behavior: smooth;
  overflow-y: scroll;
  ${miniTablet({
    paddingInline: "1rem",
  })}
`;

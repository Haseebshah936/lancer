import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { MessageBox, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import styled from "styled-components";
import { miniPc, miniTablet, tablet } from "../../responsive";
import colors from "../../utils/colors";
import ChatRooms from "./ChatRooms";
import MessageHeader from "./MessageHeader";
import ChatInput from "./ChatInput";
import CustomMessageBox from "./CustomMessageBox";
import { chat } from "../../utils/dummyData";

function Chat(props) {
  const messageRef = useRef();
  const [data, setData] = useState(chat);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <Container>
      <ChatRoomsContainer>
        <ChatRooms />
      </ChatRoomsContainer>
      <MessageContainer>
        <MessageHeader />
        <MessageListContainer>
          {data.map(({ position, title, type, text, e }, i) => {
            return (
              <CustomMessageBox
                position={position % 2 === 0 ? "right" : "left"}
                title={title}
                type={type}
                text={text}
                key={i}
                {...e}
              />
            );
          })}
          <div ref={messageRef} />
        </MessageListContainer>
        {/* <MessageListContainer
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={data}
        /> */}
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
  margin-top: 3rem;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  height: 85vh;
  ${tablet({ marginInline: "2%" })}/* ${miniPc({
    boxShadow: "none",
  })} */
`;

const ChatRoomsContainer = styled.div`
  width: 35%;
  border-right: 1px solid ${colors.lightGrey};
  ${miniPc({ width: "40%" })}
  ${miniTablet({ border: "none" })};
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
// const MessageListContainer = styled(MessageList)`
//   scroll-behavior: smooth;
//   overflow-y: scroll;
//   ${miniTablet({
//     paddingInline: "1rem",
//   })}
// `;

const MessageListContainer = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  .rce-container-mbox {
    width: 100%;
    min-width: auto;
  }
  .rce-mbox {
    width: 70%;
    color: white;
    min-width: auto;
    box-shadow: none;
    background-color: ${colors.becomePartnerButtonGreen};
    margin: 0px;
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
  ${miniTablet({})}
`;

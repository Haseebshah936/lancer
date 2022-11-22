import React from "react";
import { ChatItem } from "react-chat-elements";
import styled from "styled-components";
import colors from "../../utils/colors";

function CustomChatItem({ chatroom, onClick, onClickMute }) {
  return (
    <Container>
      <ChatItem
        onClick={() => {
          onClick(chatroom);
        }}
        onClickMute={() => onClickMute(chatroom, chatroom.muted)}
        {...chatroom}
        statusColor={colors.lightGreen}
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

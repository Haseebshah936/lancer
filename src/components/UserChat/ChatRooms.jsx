import { Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ChatList } from "react-chat-elements";
import styled from "styled-components";
import { miniPc, tablet } from "../../responsive";
import colors from "../../utils/colors";

function ChatRooms(props) {
  return (
    <ChatRoomsContainer>
      <SearchBox>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </SearchBox>
      <ChatList
        className="chat-list"
        dataSource={[
          {
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
            alt: "kursat_avatar",
            title: "Kursat",
            subtitle: "Why don't we go to the No Way Home movie this weekend ?",
            date: new Date(new Date().getTime() - 500000),
            unread: true,
            statusColor: colors.becomePartnerGreen,
            muted: false,
            showMute: true,
          },
          {
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
            alt: "kursat_avatar",
            title: "Kursat",
            subtitle: "Why don't we go to the No Way Home movie this weekend ?",
            date: new Date(new Date().getTime() - 500000),
            unread: true,
            statusColor: colors.becomePartnerGreen,
            muted: false,
            showMute: true,
          },
        ]}
      />
    </ChatRoomsContainer>
  );
}

export default ChatRooms;

const ChatRoomsContainer = styled.div`
  display: flex;
  margin: 2rem 1rem;
  flex-direction: column;
  height: 100%;
  flex-shrink: 1;
  .rce-citem-status {
    border: 1px solid white;
    height: 10px;
    bottom: 16px;
    right: 16px;
    width: 10px;
    background: ${colors.lightGreen} !important;
  }
  .rce-citem-body--bottom-status span {
    background: ${colors.lightGreen};
    height: 10px;
    width: 10px;
  }
`;

const SearchBox = styled.div`
  border: 1px solid ${colors.lightGrey};
  border-radius: 10rem;
  align-self: center;
  padding: 0.5rem 1rem;
  min-width: 28rem;
  width: 80%;
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  ${miniPc({
    minWidth: "22rem",
  })}
`;

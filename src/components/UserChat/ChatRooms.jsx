import { ArrowBack, Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ChatItem, ChatList } from "react-chat-elements";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { miniPc, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";
import CustomChatItem from "./CustomChatItem";
import MorePoper from "./MorePoper";

function ChatRooms({
  chatrooms = [],
  onRoomClick = () => {},
  onMuteClick = () => {},
  onFilter = () => {},
}) {
  const navigate = useNavigate();
  return (
    <ChatRoomsContainer>
      <Box
        marginBottom={"2rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button onClick={() => navigate(-1)}>
          <ArrowBack style={{ fontSize: "1.6rem" }} />
        </Button>
        <SearchBox>
          <InputBase
            sx={{ ml: 1, flex: 1, py: 0.5, fontSize: "1.2rem" }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => onFilter(e.target.value)}
          />
          {/* <IconButton type="button" sx={{ p: "0.rem" }} aria-label="search">
            <Search sx={{ fontSize: "1.5rem" }} />
          </IconButton> */}
        </SearchBox>
        <MorePoper />
      </Box>
      {/* <ChatList
        onClick={onRoomClick}
        onClickMute={onMuteClick}
        className="chat-list"
        dataSource={chatrooms}
      /> */}
      {chatrooms.map((chatroom) => {
        return (
          <CustomChatItem
            key={chatroom.id}
            onClick={onRoomClick}
            onClickMute={onMuteClick}
            chatroom={chatroom}
          />
        );
      })}
    </ChatRoomsContainer>
  );
}

export default ChatRooms;

const ChatRoomsContainer = styled.div`
  display: flex;
  padding: 2rem 0rem;
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

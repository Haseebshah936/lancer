import { Divider, IconButton, InputBase, Modal, Tooltip } from "@mui/material";
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
import MessagesContainer from "./MessagesContainer";
import { useCallback } from "react";
import mongoose from "mongoose";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { Add, ArrowBack } from "@mui/icons-material";
import MorePoper from "./MorePoper";
import { useLocation, useNavigate } from "react-router-dom";
import {
  watchCollection,
  watchCollectionForAll,
} from "../../db/helperFunction";
import CreateGroup from "../CreateGroup";
import {
  getChatRoomMessages,
  getChatRooms,
  handleCall,
  handleChatRoomClick,
  handleChatroomsData,
  handleFilter,
  handleMuteChatRoom,
  handleScroll,
  handleSend,
  handleVideoCall,
} from "./handlersForIndex";
import RightDrawer from "./RightDrawer";
import ChatInfo from "./ChatInfo";

function Chat(props) {
  const messageRef = useRef();
  const scrollRef = useRef();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  // const [active, setActive] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomsData, setChatRoomsData] = useState([]);
  const { user, currentUser } = useRealmContext();
  const {
    activeChatroom: active,
    setActiveChatroom: setActive,
    setActiveChatroomStatus,
    activeChatroomStatus,
  } = useCustomContext();
  const location = useLocation();
  const [loadingMore, setLoadingMore] = useState(false);
  const [reRender, setReRender] = useState(true);
  let callerRef = undefined;
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [called, setCalled] = useState(false);

  const [drawer, setDrawer] = useState(true);

  const toggleDrawer = (state) => {
    setDrawer(state);
  };

  const handleToggle = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  const handleBackClick = () => {
    setActive(false);
    setActiveChatroomStatus(false);
  };

  const getNewMessage = useCallback(
    (messageId, realmMessageObject) => {
      requestMethod
        .get(`message/${active.id}/${messageId}/${user._id}`)
        .then((res) => {
          setNewData((prev) => {
            const prevMessage = prev[prev.length - 1];

            if (
              !(
                prevMessage?.userId?._id === res.data?.userId?._id &&
                prevMessage?.server === undefined
              )
            ) {
              return [...prev, { ...res.data, server: true }];
            } else return prev;
          });
        })
        .catch((err) => {
          handleError(err);
        });
    },
    [newData]
  );

  const handleNewChatroom = (change) => {
    const { documentKey, fullDocument } = change;
    // console.log("New chatroom added ", fullDocument);
    requestMethod
      .get(`/chatroom/getChatroom/${fullDocument._id}/${user._id}`)
      .then((res) => {
        setChatRoomsData((prev) => [res.data, ...prev]);
        setChatRooms((prev) => [res.data, ...prev]);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handleChatroomUpdate = (change) => {
    const { documentKey, fullDocument } = change;
    // console.log("Chatroom updated called", fullDocument);
    // console.log("Chatroom updated called", chatRooms);
    requestMethod
      .get(`/chatroom/getChatroom/${fullDocument._id}/${user._id}`)
      .then((res) => {
        setChatRoomsData((prev) => {
          let newChatRooms = [...prev];
          let index = newChatRooms.findIndex(
            (chatRoom) => chatRoom.id === res.data.id
          );
          // console.log("index", index);
          if (index === -1) {
            return [res.data, ...prev];
          }
          newChatRooms[index] = {
            ...newChatRooms[index],
            ...res.data,
          };
          // console.log(
          //   "newChatRooms",
          //   new Date(newChatRooms[index].date).getTime()
          // );
          return newChatRooms.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        });
        setChatRooms((prev) => {
          let newChatRooms = [...prev];
          let index = newChatRooms.findIndex(
            (chatRoom) => chatRoom.id === res.data.id
          );
          if (index === -1) {
            return [res.data, ...prev];
          }
          newChatRooms[index] = {
            ...newChatRooms[index],
            ...res.data,
          };
          return newChatRooms.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    let breakAsyncIterator = false;
    if (user?._id && !called) {
      setCalled(true);
      // console.log("Chatroom watcher called");
      callerRef = user._id;
      const filter1 = {
        filter: {
          operationType: "insert",
          "fullDocument.participants": {
            $elemMatch: {
              userId: mongoose.Types.ObjectId(user._id),
            },
          },
        },
      };
      const filter2 = {
        filter: {
          operationType: "update",
          "fullDocument.participants": {
            $elemMatch: {
              userId: mongoose.Types.ObjectId(user._id),
            },
          },
        },
      };
      watchCollection(
        currentUser,
        "chatrooms",
        filter1,
        breakAsyncIterator,
        handleNewChatroom
      );

      watchCollection(
        currentUser,
        "chatrooms",
        filter2,
        breakAsyncIterator,
        handleChatroomUpdate
      );
    }
    return () => {
      breakAsyncIterator = true;
      setCalled(false);
    };
  }, [user]);

  useEffect(() => {
    setReRender(true);
    if (active)
      getChatRoomMessages(
        active.id,
        location,
        user._id,
        setData,
        setNewData,
        setReRender
      );
    setDrawer(false);
  }, [active]);

  useEffect(() => {
    if (user?._id) {
      getChatRooms(setChatRooms, setChatRoomsData, user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    setActive(null);
    setChatRooms([]);
    setChatRoomsData([]);
    if (location.state) {
      setChatRooms((prev) => [location.state, ...prev]);
      setChatRoomsData((prev) => [location.state, ...prev]);
    }
  }, []);

  return (
    <Container>
      <ChatRoomsContainer active={active}>
        <Box
          marginTop={"2rem"}
          marginBottom={"1rem"}
          display={"flex"}
          justifyContent={"space-evenly"}
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
              onChange={(e) => handleFilter(e.target.value)}
            />
            {/* <IconButton type="button" sx={{ p: "0.rem" }} aria-label="search">
            <Search sx={{ fontSize: "1.5rem" }} />
          </IconButton> */}
          </SearchBox>
          {/* <MorePoper /> */}
          <Tooltip title="Create Group">
            <IconButton
              onClick={handleToggle}
              color="inherit"
              ari-label="add to shopping cart"
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
        {chatRooms.length > 0 && (
          <ChatRooms
            chatrooms={chatRooms}
            onRoomClick={(chatroom) =>
              handleChatRoomClick(chatroom, setActive, setActiveChatroomStatus)
            }
            onMuteClick={(chatroom, muted) =>
              handleMuteChatRoom(chatroom, muted, chatRooms, setChatRooms)
            }
            onFilter={(value) =>
              handleFilter(value, setChatRooms, chatRoomsData)
            }
            changeChatroomsData={(i, id, state) =>
              handleChatroomsData(
                i,
                id,
                state,
                chatRoomsData,
                setChatRooms,
                setChatRoomsData
              )
            }
            setChatRooms={setChatRooms}
          />
        )}
        <Modal
          open={toggle}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateGroup toggleClose={handleClose} />
        </Modal>
      </ChatRoomsContainer>
      {active && (
        <MessageContainer active={active}>
          <MessageHeader
            uri={active.avatar}
            name={active.title}
            status={active.isOnline}
            isGroup={active.isGroup}
            onBackClick={handleBackClick}
            onClickCall={handleCall}
            onClickVideoCall={handleVideoCall}
            temp={active.id === location.state?.id}
            userId={active.participantId}
            toggleDrawer={() => toggleDrawer(true)}
          />
          {!reRender && (
            <MessagesContainer
              scrollRef={scrollRef}
              data={data}
              active={active}
              newData={newData}
              handleScroll={() =>
                handleScroll(
                  scrollRef,
                  loadingMore,
                  setLoadingMore,
                  active,
                  user,
                  data,
                  newData,
                  setData
                )
              }
              getNewMessage={getNewMessage}
              setNewData={setNewData}
              reRender={reRender}
            />
          )}
          <ChatInput
            onSend={(message) => handleSend(message, user, active, setNewData)}
          />
          <RightDrawer drawer={drawer} toggleDrawer={toggleDrawer}>
            <ChatInfo drawer={drawer} />
          </RightDrawer>
        </MessageContainer>
      )}
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  margin-inline: 7%;
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
    height: "100vh",
    boxShadow: "none",
    overflowY: "hidden",
    marginTop: 0,
  })}
`;

const ChatRoomsContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.lightGrey};
  ${miniPc({ width: "40%" })}
  ${miniTablet({
    border: "none",
    display: (props) => (!props.active ? "flex" : "none"),
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
  justify-content: space-between;
  display: ${(props) => (props.active ? "flex" : "none")};
  ${miniTablet({
    width: "auto",
  })};
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

const ChatContainer = styled.div`
  overflow: scroll;
  transform: rotateX(180deg);
  flex: 1;
`;
const ChatContainer1 = styled.div`
  overflow: scroll;
  transform: rotateX(180deg);
  .gWUMbg.sc-ibYzZP {
    margin-top: 0;
  }
`;

const MessageListContainer = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
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

  font-weight: 700;
  ${mobile({
    display: "flex",
  })}
  cursor: pointer;
`;

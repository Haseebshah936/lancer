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
import { watchCollection } from "../../db/helperFunction";
import CreateGroup from "../CreateGroup";
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
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  const getChatRooms = async () => {
    setChatRooms([]);
    setChatRooms([]);
    requestMethod
      .get(`chatroom/getChatroomsById/${user._id}`)
      .then((res) => {
        setChatRooms((prev) => [...prev, ...res.data]);
        setChatRoomsData((prev) => [...prev, ...res.data]);
      })
      .catch((err) => console.log(err));
  };

  // console.log("USERID", location.state);

  const getChatRoomMessages = (chatRoomId) => {
    if (chatRoomId === location.state?.id) return;
    requestMethod
      .get(`message/${chatRoomId}/${user._id}`)
      .then((res) => {
        setData(res.data);
        setNewData([]);
        setReRender(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === "Chatroom not found") return;
        handleError(err);
      });
  };

  const handleChatRoomClick = (chatRoom) => {
    setActive(chatRoom);
    // console.log("Clicked", chatRoom);
    setActiveChatroomStatus({
      id: chatRoom.id,
      status:
        new Date(chatRoom.isOnline).getTime() >= new Date().getTime() - 30000 &&
        new Date(chatRoom.isOnline).getTime() < new Date().getTime(),
      isOnline: chatRoom.isOnline,
    });
  };

  const handleBackClick = () => {
    setActive(false);
    setActiveChatroomStatus(false);
  };

  const createChatRoom = async (id, participantId) => {
    const response = await requestMethod.post("chatroom/createChatroomWithId", {
      participantId,
      creatorId: user._id,
      id,
    });
    return response.data;
  };

  const handleSend = (message) => {
    let newMessage = handleMessageCreation(user._id, active.id, message);
    newMessage = {
      ...newMessage,
      userId: {
        _id: user._id,
        name: user.name,
      },
    };
    setNewData((prev) => [...prev, newMessage]);
    requestMethod
      .post("message", newMessage)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        if (err.response.data === "Chatroom not found") {
          // console.log("Not found", location.state?.id);
          createChatRoom(active.id, active?.userParticipantId)
            .then(async (data) => {
              await requestMethod.post("message", {
                ...newMessage,
                chatroomId: data._id,
              });
              getChatRoomMessages(data._id);
            })
            .catch((err) => {
              console.log(err);
              handleError(err);
            });
          return;
        }
        handleError(err);
      });
  };

  const handleMuteChatRoom = (chatroom, muted) => {
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

  const handleChatroomsData = (i, id, state) => {
    let newChatRoomsData = [...chatRoomsData];
    newChatRoomsData[i] = {
      ...newChatRoomsData[i],
      ...state,
    };
    setChatRoomsData(newChatRoomsData);
    // setChatRoomsData(newChatrooms);
    setChatRooms((prev) => {
      let newChatRooms = [...prev];
      let index = newChatRooms.findIndex((chatRoom) => chatRoom.id === id);
      // console.log("Chatroom Index", index);
      newChatRooms[index] = {
        ...newChatRooms[index],
        ...state,
      };
      return newChatRooms;
    });
  };

  const handleCall = () => {};

  const handleVideoCall = () => {};

  // useEffect(() => {
  //   messageRef.current.scrollIntoView({
  //     block: "end",
  //     inline: "nearest",
  //   });
  // }, [data, active]);

  // useEffect(() => {
  //   // console.log("Chatrooms", chatRooms);
  // }, [chatRooms]);

  const handleScroll = () => {
    const target = scrollRef.current;
    const difference = Math.sqrt(
      Math.pow(target.scrollHeight - target.scrollTop - target.clientHeight, 2)
    );
    // console.log(difference);
    if (difference <= 1 && !loadingMore) {
      // console.log("I am in");
      setLoadingMore(true);
      requestMethod
        .get(
          `message/${active.id}/${user._id}?skip=${
            data.length + newData.length
          }`
        )
        .then((res) => {
          // console.log("Load more", res.data);
          setLoadingMore(false);
          setData((pre) => [...pre, ...res.data]);
        })
        .catch((err) => {
          console.log(err);
          setLoadingMore(false);
          handleError(err);
        });
    }
  };

  const getNewMessage = useCallback(
    (messageId, realmMessageObject) => {
      // const id = newData[newData.length - 1]?.userId._id;
      // console.log("New Message userId", newData);
      // if (id !== user._id)
      requestMethod
        .get(`message/${active.id}/${messageId}/${user._id}`)
        .then((res) => {
          // console.log(res.data);
          setNewData((prev) => {
            const prevMessage = prev[prev.length - 1];
            // console.log("Previous state", prevMessage);
            // console.log("New message", res.data?.userId?._id);
            // console.log(
            //   "Condition",
            //   !prev.length,
            //   prevMessage?.userId?._id !== res.data?.userId?._id,
            //   prevMessage?.userId?._id === res.data?.userId?._id &&
            //     prevMessage?.server === true
            // );
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
        // console.log("res New message", res.data);
        setChatRoomsData((prev) => [res.data, ...prev]);
        setChatRooms((prev) => [res.data, ...prev]);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    setReRender(true);
    if (active) getChatRoomMessages(active.id);
  }, [active]);

  useEffect(() => {
    if (user?._id) {
      //console.log("User", user._id);
      getChatRooms();
    }
  }, [user]);

  useEffect(() => {
    setActive(null);
    setChatRooms([]);
    setChatRoomsData([]);
    if (location.state) {
      setChatRooms((prev) => [location.state, ...prev]);
      setChatRoomsData((prev) => [location.state, ...prev]);
    }
  }, []);

  useEffect(() => {
    let breakAsyncIterator = false;
    if (user) {
      // console.log("Watching for new chatrooms");
      const filter = {
        filter: {
          operationType: "insert",
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
        filter,
        breakAsyncIterator,
        handleNewChatroom
      );
    }
    return () => {
      breakAsyncIterator = true;
    };
  }, [user]);

  // useEffect(() => {
  //   console.log("Status changed", activeChatroomStatus);
  // }, [activeChatroomStatus]);

  useEffect(() => {
    // console.log("Active", active);
  }, [active]);

  return (
    <Container>
      <ChatRoomsContainer active={active}>
        <Box
          marginTop={"2rem"}
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
        <Modal
          open={toggle}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateGroup toggleClose={handleClose} />
        </Modal>
        {chatRooms.length > 0 && (
          <ChatRooms
            chatrooms={chatRooms}
            onRoomClick={handleChatRoomClick}
            onMuteClick={handleMuteChatRoom}
            onFilter={handleFilter}
            changeChatroomsData={handleChatroomsData}
            setChatRooms={setChatRooms}
          />
        )}
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
            userId={active.userParticipantId}
          />
          {!reRender && (
            <MessagesContainer
              scrollRef={scrollRef}
              data={data}
              active={active}
              newData={newData}
              handleScroll={handleScroll}
              getNewMessage={getNewMessage}
              setNewData={setNewData}
              reRender={reRender}
            />
          )}
          {/* <div style={{ height: ".5rem" }} ref={messageRef} /> */}
          <ChatInput onSend={handleSend} />
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

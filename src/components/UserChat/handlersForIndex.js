import { requestMethod } from "../../requestMethod";
import { handleError } from "../../utils/helperFunctions";
import { handleMessageCreation } from "./HelperFunctions";

export const getChatRooms = async (setChatRooms, setChatRoomsData, id) => {
  requestMethod
    .get(`chatroom/getChatroomsById/${id}`)
    .then((res) => {
      setChatRooms((prev) => [...prev, ...res.data]);
      setChatRoomsData((prev) => [...prev, ...res.data]);
    })
    .catch((err) => console.log(err));
};

export const getChatRoomMessages = (
  chatRoomId,
  location,
  id,
  setData,
  setNewData,
  setReRender
) => {
  if (chatRoomId === location.state?.id) return;
  requestMethod
    .get(`message/${chatRoomId}/${id}`)
    .then((res) => {
      setData(res.data);
      console.log(res.data);
      setNewData([]);
      setReRender(false);
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data === "Chatroom not found") return;
      handleError(err);
    });
};

export const handleChatRoomClick = (
  chatRoom,
  setActive,
  setActiveChatroomStatus
) => {
  setActive(chatRoom);
  setActiveChatroomStatus({
    id: chatRoom.id,
    status:
      new Date(chatRoom.isOnline).getTime() >= new Date().getTime() - 30000 &&
      new Date(chatRoom.isOnline).getTime() < new Date().getTime(),
    isOnline: chatRoom.isOnline,
  });
};

export const createChatRoom = async (id, participantId, creatorId) => {
  const response = await requestMethod.post("chatroom/createChatroomWithId", {
    participantId,
    creatorId,
    id,
  });
  return response.data;
};

export const handleSend = (message, user, active, setNewData) => {
  let newMessage = handleMessageCreation(user._id, active.id, message);
  newMessage = {
    ...newMessage,
    userId: {
      _id: user._id,
      name: user.name,
      profilePic: user.profilePic,
    },
  };
  setNewData((prev) => [...prev, newMessage]);
  requestMethod
    .post("message", newMessage)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      if (err.response.data === "Chatroom not found") {
        createChatRoom(active.id, active?.participantId)
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

export const handleMuteChatRoom = (
  chatroom,
  muted,
  chatRooms,
  setChatRooms
) => {
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

export const handleFilter = (value, setChatRooms, chatRoomsData) => {
  if (value !== "") {
    setChatRooms(
      chatRoomsData.filter((chatRoom) =>
        chatRoom.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  } else {
    setChatRooms(chatRoomsData);
  }
};

export const handleChatroomsData = (
  i,
  id,
  state,
  chatRoomsData,
  setChatRooms,
  setChatRoomsData
) => {
  let newChatRoomsData = [...chatRoomsData];
  newChatRoomsData[i] = {
    ...newChatRoomsData[i],
    ...state,
  };
  setChatRoomsData(newChatRoomsData);
  setChatRooms((prev) => {
    let newChatRooms = [...prev];
    let index = newChatRooms.findIndex((chatRoom) => chatRoom.id === id);
    newChatRooms[index] = {
      ...newChatRooms[index],
      ...state,
    };
    return newChatRooms;
  });
};

export const handleCall = () => {};

export const handleVideoCall = () => {};

export const handleScroll = (
  scrollRef,
  loadingMore,
  setLoadingMore,
  active,
  user,
  data,
  newData,
  setData
) => {
  const target = scrollRef.current;
  const difference = Math.sqrt(
    Math.pow(target.scrollHeight - target.scrollTop - target.clientHeight, 2)
  );
  if (difference <= 1 && !loadingMore) {
    setLoadingMore(true);
    requestMethod
      .get(
        `message/${active.id}/${user._id}?skip=${data.length + newData.length}`
      )
      .then((res) => {
        setLoadingMore(false);
        if(res.data.length === 0) setLoadingMore(false);
        setData((pre) => [...pre, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setLoadingMore(false);
        handleError(err);
      });
  }
};

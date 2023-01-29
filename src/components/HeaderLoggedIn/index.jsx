import { memo, useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import Head from "./Head";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Login from "../LoginCompoent";
import { ClickAwayListener } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import { useCustomContext } from "../../Hooks/useCustomContext";
import MessageList from "./MessageList";
import NotificationList from "./NotificationList";
import UserOptions from "./UserOptions";
import { useRealmContext } from "../../db/RealmContext";
import axios from "axios";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { requestMethod } from "../../requestMethod";

function Header({ setloader }) {
  const [state, setState] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [anchor3, setAnchor3] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [chats, setChats] = useState([]);
  const { user, logOut } = useRealmContext();
  const navigate = useNavigate();

  const getNotifications = async (id) => {
    const response = await requestMethod.get("notification/user/" + id);
    return response.data;
  };

  const getChats = async (id) => {
    const response = await requestMethod.get(
      "notification/messages/user/" + id
    );
    return response.data;
  };

  const toggleMessage = (event) => {
    setAnchor(event.currentTarget);
  };

  const toggleUserOptions = (event) => {
    setAnchor3(event.currentTarget);
  };

  const toggleNotification = (event) => {
    setAnchor2(event.currentTarget);
  };

  const CloseList = () => {
    setAnchor(null);
  };

  const CloseList2 = () => {
    setAnchor2(null);
  };

  const CloseList3 = () => {
    setAnchor3(null);
  };

  const toggleDrawer = (state) => {
    setState(state);
  };

  const { open, setOpen } = useCustomContext();

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let interval;
    if (user?.state === "banned") {
      navigate("/banned");
      logOut();
    }
    if (user?._id) {
      (async () => {
        try {
          const res = await axios.put(
            `http://localhost:3003/api/user/updateOnlineStatus/${user._id}`
          );
          // console.log("user after updating online", res.data);
        } catch (error) {
          console.log(error);
        }
      })();
      interval = setInterval(() => {
        (async () => {
          try {
            const res = await axios.put(
              `http://localhost:3003/api/user/updateOnlineStatus/${user._id}`
            );
            // console.log("user after updating online", res.data);
          } catch (error) {
            console.log(error);
          }
        })();
      }, 30000);

      getNotifications(user._id).then((res) => {
        setNotifications(res);
      });

      getChats(user._id).then((res) => {
        const newChats = res.splice(0, 4).map((chat) => {
          return {
            avatar: chat.senderId.profilePic,
            alt: chat.senderId.name,
            title: chat.senderId.name,
            subtitle: chat.description,
            date: new Date(chat.createdAt),
            id: chat._id,
            chatroom: chat.chatroomId,
          };
        });

        setChats(newChats);
      });
    }
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  return (
    <>
      <Head
        toggleDrawer={toggleDrawer}
        toggleLogin={handleToggle}
        toggleMessage={toggleMessage}
        toggleNotification={toggleNotification}
        toggleUserOptions={toggleUserOptions}
        setloader={setloader}
        chats={chats}
        notifications={notifications}
      />
      <ResponsiveDrawer
        state={state}
        toggleLogin={handleToggle}
        toggleDrawer={toggleDrawer}
      />
      <MessageList anchor={anchor} CloseList={CloseList} chats={chats} />
      <NotificationList
        anchor={anchor2}
        CloseList={CloseList2}
        notifications={notifications}
      />
      <UserOptions anchor={anchor3} CloseList={CloseList3} />

      <Modal
        open={open}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Login toggleClose={handleClose} />
      </Modal>
    </>
  );
}

export default memo(Header);

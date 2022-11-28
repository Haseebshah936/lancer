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

function Header(props) {
  const [data, setData] = useState([]);
  const [state, setState] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [anchor3, setAnchor3] = useState(null);
  const { user } = useRealmContext();
  console.log("User", user);

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
        data={data}
        setdata={setData}
      />
      <ResponsiveDrawer
        state={state}
        toggleLogin={handleToggle}
        toggleDrawer={toggleDrawer}
        data={data}
        setdata={setData}
      />
      <MessageList anchor={anchor} CloseList={CloseList} />
      <NotificationList anchor={anchor2} CloseList={CloseList2} />
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

import { memo, useState } from "react";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import Head from "./Head";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Login from "../LoginCompoent";
import { ClickAwayListener } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import { useCustomContext } from "../../Hooks/useCustomContext";
import MessageList from "./MessageList";

function Header(props) {
  const [state, setState] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [anchor2, setAnchor2] = useState(null);

  const toggleMessage = (event) => {
    setAnchor(event.currentTarget);
  };

  const toggleNotification = (event) => {
    setAnchor2(event.currentTarget);
  };

  const CloseList = () => {
    setAnchor(null);
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

  return (
    <>
      <Head
        toggleDrawer={toggleDrawer}
        toggleLogin={handleToggle}
        toggleMessage={toggleMessage}
      />
      <ResponsiveDrawer
        state={state}
        toggleLogin={handleToggle}
        toggleDrawer={toggleDrawer}
      />
      <MessageList anchor={anchor} CloseList={CloseList} />

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

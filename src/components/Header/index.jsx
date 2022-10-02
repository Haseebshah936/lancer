import { useState } from "react";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import Head from "./Head";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Login from "../Login";
import { ClickAwayListener } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import { useCustomContext } from "../../Hooks/useCustomContext";

function Header(props) {
  const [state, setState] = useState(false);

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
      <Head toggleDrawer={toggleDrawer} toggleLogin={handleToggle} />
      <ResponsiveDrawer
        state={state}
        toggleLogin={handleToggle}
        toggleDrawer={toggleDrawer}
      />
      <Modal
        open={open}
        style={{backgroundColor: "rgba(0,0,0,0.5)"}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Login toggleClose={handleClose} />
      </Modal>
    </>
  );
}

export default Header;

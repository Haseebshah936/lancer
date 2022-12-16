import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { ButtonBase, IconButton, Modal } from "@mui/material";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import CreateGroup from "../CreateGroup";

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Box alignSelf={"center"}>
      <IconButton
        type="button"
        onClick={handleClick}
        sx={{ p: 1, alignSelf: "flex" }}
        aria-label="search"
      >
        <MoreVert fontSize="large" />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ButtonBase>
          <Box
            onClick={() => {
              handleToggle();
            }}
            component={"div"}
            sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
          >
            Create New Group
          </Box>
        </ButtonBase>
      </Popper>
      <Modal
        open={toggle}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateGroup toggleClose={handleClose} />
      </Modal>
    </Box>
  );
}

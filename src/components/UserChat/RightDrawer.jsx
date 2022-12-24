import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function RightDrawer({ toggleDrawer, drawer, children }) {
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={drawer}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <IconButton
        sx={{ width: "4rem", margin: "1rem" }}
        onClick={() => toggleDrawer(false)}
      >
        <Close fontSize="large" />
      </IconButton>
      {children}
    </SwipeableDrawer>
  );
}

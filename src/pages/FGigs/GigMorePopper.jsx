import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { IconButton } from "@mui/material";
import { MoreVert } from "@material-ui/icons";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useRealmContext } from "../../db/RealmContext";

export default function GigMorePopper({ gig, setStateChanged, stateChanged }) {
  const { user } = useRealmContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log(gig._id);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handelEdit = () => {
    console.log("edit: ", gig._id);
  };
  const handelDelete = () => {
    axios.delete("http://localhost:3003/api/product/" + gig._id).then((res) => {
      console.log(res);
      setStateChanged(stateChanged + 1);
      console.log("deleteed");
    });
  };
  const handelPauseOrActivate = () => {
    setStateChanged(stateChanged + 1);
    if (gig.state === "live") {
      axios.put(`http://localhost:3003/api/product/updateState/${gig._id}`, {
        state: "paused",
      });
      console.log("pausing");
    } else {
      // http://localhost:3003/api/product/updateState/637900bf8f1fa87a3ef8ad6d
      axios.put(`http://localhost:3003/api/product/updateState/${gig._id}`, {
        state: "live",
      });
      console.log("making live");
    }
  };
  const handelResume = () => {
    console.log("resume");
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
        <Box>
          <Paper>
            <MenuList aria-labelledby="composition-button">
              <MenuItem onClick={handelEdit}>Edit</MenuItem>
              <MenuItem onClick={handelPauseOrActivate}>
                {gig.state === "live" ? "Pause" : "Activate"}
              </MenuItem>
              <MenuItem onClick={handelDelete}>Delete</MenuItem>
            </MenuList>
          </Paper>
        </Box>
      </Popper>
    </Box>
  );
}

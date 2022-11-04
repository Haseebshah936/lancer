import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { IconButton } from "@mui/material";
import { MoreVert } from "@material-ui/icons";

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Box alignSelf={"flex-start"} ml={1}>
      <IconButton
        type="button"
        onClick={handleClick}
        sx={{ p: "0.rem" }}
        aria-label="search"
      >
        <MoreVert sx={{ fontSize: "1.5rem" }} />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          The content of the Popper.
        </Box>
      </Popper>
    </Box>
  );
}

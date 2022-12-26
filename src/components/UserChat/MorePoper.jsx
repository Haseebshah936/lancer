import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { ButtonBase, CircularProgress, IconButton, Modal } from "@mui/material";
import { Clear, MoreVert, Person } from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import CreateGroup from "../CreateGroup";
import CustomIconButton from "../CustomIconButton";
import styled from "styled-components";
import colors from "../../utils/colors";
import { AdminPanelSettings, PersonOff } from "@mui/icons-material";

export default function MorePopper({
  isAdmin = false,
  onClick = () => {},
  isActive = false,
  removeParticipant = () => {},
  makeAdmin = () => {},
  removeAdmin = () => {},
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef();
  const handleClick = (event) => {
    if (isActive) setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const [loading, setLoading] = useState({
    adminLoading: false,
    removeLoading: false,
  });
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const resetState = () => {
    setAnchorEl(null);
    setLoading({
      adminLoading: false,
      removeLoading: false,
    });
  };

  useEffect(() => {
    if (!isActive) resetState();
    setAnchorEl(isActive ? btnRef.current : null);

    return () => {
      resetState();
    };
  }, [isActive]);

  return (
    <Box
      component={"div"}
      onClick={onClick}
      alignSelf={"center"}
      position={"relative"}
    >
      <IconButton
        type="button"
        ref={btnRef}
        onClick={handleClick}
        sx={{ p: 1, alignSelf: "flex" }}
        aria-label="search"
      >
        <MoreVert fontSize="large" />
      </IconButton>
      <Popper
        sx={{
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <PoperElementContainer>
          <PoperElement>
            <PoperElementButton
              sx={{
                color: colors.darkBlue,
              }}
              onClick={() => {
                isAdmin ? removeAdmin() : makeAdmin();
                setLoading({
                  ...loading,
                  adminLoading: true,
                });
              }}
            >
              {loading.adminLoading ? (
                <CircularProgress color="success" size={10} />
              ) : (
                <>
                  {isAdmin ? <PersonOff /> : <AdminPanelSettings />}
                  <PoperElementText>
                    {isAdmin ? "Remove " : "Make "}Admin
                  </PoperElementText>
                </>
              )}
            </PoperElementButton>
          </PoperElement>
          <PoperElement>
            <PoperElementButton
              sx={{
                color: colors.googleRed,
              }}
              onClick={() => {
                removeParticipant();
                setLoading({
                  ...loading,
                  removeLoading: true,
                });
              }}
            >
              {loading.removeLoading ? (
                <CircularProgress color="success" size={10} />
              ) : (
                <>
                  <Clear color="error" />
                  <PoperElementText>Remove</PoperElementText>
                </>
              )}
            </PoperElementButton>
          </PoperElement>
        </PoperElementContainer>
      </Popper>
    </Box>
  );
}

const PoperElementContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  /* background: ${colors.yellow}; */
  padding-inline: 0rem;
  border-inline: 1px solid ${colors.lightGrey};
`;

const PoperElement = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  border-block: 1px solid ${colors.lightGrey};
`;
const PoperElementButton = styled(ButtonBase)`
  width: 14rem;
  padding: 1rem !important;
  display: flex;
  flex: 1;
  justify-content: center !important;
  align-items: center;
  background-color: white !important;
`;

const PoperElementText = styled.p`
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`;

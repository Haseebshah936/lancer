import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function ResponsiveDrawer({
  toggleDrawer = () => {},
  state,
  toggleLogin,
}) {
  return (
    <Container>
      <SwipeableDrawer
        anchor="left"
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        open={state}
      >
        <Box sx={{ width: 150 }}>
          <List>
            <CloseContainer>
              <IconButton
                aria-label="menu"
                id="menu"
                onClick={() => toggleDrawer(false)}
              >
                <CloseIcon />
              </IconButton>
              <Btn
                variant="outlined"
                onClick={() => {
                  toggleLogin();
                  toggleDrawer(false);
                }}
              >
                Login
              </Btn>
            </CloseContainer>
            <ListItem>
              <SubContainer>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/discover">Discover</NavLink>
                <NavLink to="/howitwork">How&nbsp;it&nbsp;Works</NavLink>
              </SubContainer>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </Container>
  );
}

const Container = styled.div`
  display: none;
  @media (max-width: 786px) {
    display: flex;
  }

  a.active {
    background-color: tomato;
    color: "white";
  }
`;

const Btn = styled(Button)`
  border-radius: 2rem !important;
  color: black !important;
  border-color: black !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
    border-color: black !important;
  }
  font-size: 1rem !important;
  height: 2.8rem !important;
  width: 6.2rem !important;
  min-width: 1rem !important;
  text-transform: capitalize !important;
  min-width: 1rem !important;
`;

const CloseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 0.5rem;
  padding-right: 1.1rem;
  align-items: center;
`;

const SubContainer = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: black;
  a {
    text-decoration: none;
    color: #000000;
    margin-block: 1rem;
    width: 10rem;
    font-size: 1.2rem;
  }
  a:hover {
    color: #7d7d7d;
  }
  a.active {
    color: #125d4a;
  }
`;

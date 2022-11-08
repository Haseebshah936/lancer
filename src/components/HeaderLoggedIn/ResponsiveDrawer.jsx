import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, Typography } from "@mui/material";

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
            </CloseContainer>
            <ListItem>
              <SubContainer>
                <ProfileHeader>
                  <Avatar
                    sx={{
                      height: "3rem",
                      width: "3rem",
                    }}
                    aria-label="avatar"
                    src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg"
                  ></Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ pl: "3px", fontWeight: "bold" }}
                  >
                    Haseeb1122
                  </Typography>
                </ProfileHeader>

                <NavLink to="/chat/1">Messages</NavLink>
                <NavLink to="/sellerdashboard">Dashboard</NavLink>
                <NavLink to="/contactus">Seller&nbsp;Mode</NavLink>
                <NavLink to="/contactus">Your&nbsp;Orders</NavLink>
                {/* <NavLink to="/howitwork">How&nbsp;it&nbsp;Works</NavLink> */}
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

const CloseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 0.5rem;
  padding-right: 1.1rem;
  align-items: center;
`;

const ProfileHeader = styled.div`
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubContainer = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

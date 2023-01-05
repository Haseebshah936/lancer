import { Box, Paper, Popover, Typography } from "@mui/material";
import React from "react";
import { ChatList } from "react-chat-elements";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/colors";

const chats = [
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
  {
    avatar:
      "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg",
    alt: "Muhammad_Haseeb",
    title: "Muhammad Haseeb",
    subtitle: "Umer and Talha start working or else I'll tell miss.",
    date: new Date(),
    unread: 3,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
];
const MessageList = ({ anchor, CloseList }) => {
  const open = Boolean(anchor);

  return (
    <>
      <Popover
        open={open}
        // id={id}
        anchorEl={anchor}
        onClose={CloseList}
        anch
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box>
          <Paper
            variant="outlined"
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              p: 1,
              margin: "auto",
              maxWidth: "40rem",
              borderColor: colors.textGreen,
              borderWidth: "2px",
            }}
          >
            <ChatList className="chat-list" dataSource={chats} />
            <LinkWrapper>
              <Link
                to="/chat"
                style={{
                  textDecoration: "none",
                  color: colors.textGreen,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ ":hover": { color: "#045c4ab9 !important" } }}
                >
                  View All Messages
                </Typography>
              </Link>
            </LinkWrapper>
          </Paper>
        </Box>
      </Popover>
    </>
  );
};

export default MessageList;

const LinkWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  a: {
    text-decoration: none !important;
  }
  a:hover {
    color: #045c4ac4 !important;
  }
`;

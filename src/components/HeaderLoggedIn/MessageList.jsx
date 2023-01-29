import { Box, Paper, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatList } from "react-chat-elements";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";

const MessageList = ({ anchor, CloseList, chats }) => {
  const open = Boolean(anchor);
  const { user } = useRealmContext();

  const navigate = useNavigate();

  const MarkasRead = async (id) => {
    const response = await requestMethod.put("notification/read/" + id);
    return response.data;
  };

  const handleRead = (notificationID) => {
    MarkasRead(notificationID).then((resp) => {
      console.log(resp);
    });
  };

  useEffect(() => {
    console.log("Chats", chats);
  }, [chats]);

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
            {chats.length !== 0 ? (
              <ChatList
                className="chat-list"
                dataSource={chats}
                onClick={(chat) => {
                  handleRead(chat.id);
                  console.log("chat._id", chat.id);

                  requestMethod
                    .get(`chatroom/getChatroom/${chat.chatroom}/${user._id}`)
                    .then((res) => {
                      navigate("/chat", {
                        state: { chatroom: res.data },
                      });
                    });
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontSize: "1.5rem",
                    color: colors.textGreen,
                  }}
                >
                  You have read all your messages
                </div>
              </div>
            )}
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

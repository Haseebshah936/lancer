import React from "react";
import { Box, Paper, Popover, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../../utils/colors";
import ClearIcon from "@mui/icons-material/Clear";

const Notifications = [
  {
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
];

const NotificationList = ({ anchor, CloseList }) => {
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
              minWidth: "350px",
              maxWidth: "350px",
              borderColor: colors.textGreen,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "5px",
              }}
            >
              {Notifications.map((notify) => (
                <>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "1.2rem",
                      paddingTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          color: colors.textGreen,
                          cursor: "pointer",
                        }}
                      >
                        {notify.title}
                      </div>
                      <ClearIcon
                        sx={{
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          ":hover": { color: "#000000b1 !important" },
                        }}
                      />
                    </div>
                    <div style={{ cursor: "context-menu" }}>
                      {notify.description}
                    </div>
                  </div>
                  <Divider sx={{ mx: -2, mb: 1, pb: 1 }} />
                </>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Link
                to="/chat/1"
                style={{
                  textDecoration: "none",
                  color: colors.textGreen,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ ":hover": { color: "#045c4ab9 !important" } }}
                >
                  View All Notifications
                </Typography>
              </Link>
            </div>
          </Paper>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationList;

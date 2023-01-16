import React, { useEffect, useState } from "react";
import { Box, Paper, Popover, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../../utils/colors";
import ClearIcon from "@mui/icons-material/Clear";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";

const NotificationList = ({ anchor, CloseList, notifications }) => {
  const [ListData, setListData] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (notifications.length > 4) {
      setListData(notifications.slice(0, 4));
      setCount(4);
    } else {
      setListData(notifications);
    }
  }, [notifications]);

  const handleDelete = (itemToDelete) => () => {
    let Items = ListData.filter((item) => item.key !== itemToDelete.key);

    // console.log("before", Items);

    if (Items.length < 4 && notifications.length >= count + 1) {
      // console.log("IN if");
      Items = [...Items, notifications.slice(count, count + 1)[0]];
      setCount(count + 1);
    }
    // console.log("after", Items);
    setListData(Items);
  };

  const open = Boolean(anchor);

  useEffect(() => {
    console.log("ListData", ListData);
  }, [ListData]);
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
              borderWidth: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "5px",
              }}
            >
              {ListData.length !== 0 ? (
                ListData.map((notify) => (
                  <>
                    {" "}
                    <div
                      key={notify.key}
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
                          onClick={handleDelete(notify)}
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
                ))
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
                    You have no notifications!
                  </div>
                </div>
              )}
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

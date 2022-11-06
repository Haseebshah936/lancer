import React from "react";
import { Box, Paper, Popover, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../../utils/colors";
import ClearIcon from "@mui/icons-material/Clear";
import { LensTwoTone } from "@material-ui/icons";
import { useEffect } from "react";

const Notifications = [
  {
    key: 0,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    key: 1,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    key: 2,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    key: 3,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    key: 4,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    key: 5,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
  {
    key: 6,
    title: "Login Alert !",
    description:
      "A login took place from Lahore, Pakistan at 2:52pm on 04/11/2022",
  },
];

const NotificationList = ({ anchor, CloseList }) => {
  const [ListData, setListData] = React.useState([]);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (Notifications.length > 4) {
      setListData(Notifications.slice(0, 4));
      setCount(4);
    } else {
      setListData(Notifications);
    }
  }, []);

  const handleDelete = (itemToDelete) => () => {
    let Items = ListData.filter((item) => item.key !== itemToDelete.key);

    console.log("before", Items);

    if (Items.length < 4 && Notifications.length >= count + 1) {
      console.log("IN if");
      Items = [...Items, Notifications.slice(count, count + 1)[0]];
      setCount(count + 1);
    }
    console.log("after", Items);
    setListData(Items);
  };

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
              {ListData.map((notify) => (
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

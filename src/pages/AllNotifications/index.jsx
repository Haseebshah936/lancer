import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";

export default function AllNotifications() {
  const { user } = useRealmContext();
  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(true);

  const getAllNotifications = async (id) => {
    const response = await requestMethod.get("notification/all/user/" + id);
    return response.data;
  };

  useEffect(() => {
    if (user) {
      getAllNotifications(user._id).then((data) => {
        setNotifications(data);

        setLoader(false);
      });
    }
  }, [user]);

  return (
    <>
      <HeaderLoggedIn />
      <Typography variant="h3" sx={{ ml: 4, mt: 2 }}>
        All Notifications
      </Typography>
      <Paper
        variant="outlined"
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,
          m: 4,

          borderRadius: "30px",
        }}
      >
        {loader ? (
          <CircularProgress
            sx={{
              "&.MuiCircularProgress-root": {
                color: colors.textGreen,
              },
              alignSelf: "center",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "5px",
            }}
          >
            {notifications.length > 0 ? (
              notifications.map((notify, index) => (
                <>
                  {" "}
                  <div
                    key={notify.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "1.2rem",
                      paddingTop: "5px",
                      opacity: notify.isRead ? "0.8" : "1",
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
                    </div>
                    <div style={{ cursor: "context-menu" }}>
                      {notify.description}
                    </div>
                  </div>
                  {index !== notifications.length - 1 ? (
                    <Divider sx={{ mx: -2, mb: 1, pb: 1 }} />
                  ) : null}
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
                    fontSize: "2.5rem",
                    color: colors.textGreen,
                  }}
                >
                  You have no notifications!
                </div>
              </div>
            )}
          </div>
        )}
      </Paper>
      <Footer />
    </>
  );
}

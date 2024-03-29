import {
  Box,
  Paper,
  Popover,
  Typography,
  Divider,
  ButtonBase,
} from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../../utils/colors";
import React, { useState, useEffect } from "react";
import { AttachMoneyOutlined, LanguageOutlined } from "@mui/icons-material";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";
const UserOptions = ({ anchor, CloseList }) => {
  const open = Boolean(anchor);
  const { user, logOut } = useRealmContext();
  const { activeProfile } = useCustomContext();
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
              minWidth: "150px",
              maxWidth: "150px",

              borderColor: colors.textGreen,
              borderWidth: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Link
                to={`/profile/${user?._id}`}
                style={{
                  textDecoration: "none",
                  color: colors.black,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ":hover": { color: `${colors.textGreen} !important` },
                    pb: 1,
                    fontWeight: "bold",
                  }}
                >
                  Profile
                </Typography>
              </Link>
              {activeProfile !== "seller" && (
                <Link
                  to="/postProject"
                  style={{
                    textDecoration: "none",
                    color: colors.black,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      ":hover": { color: `${colors.textGreen} !important` },
                      pb: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Post a Request
                  </Typography>
                </Link>
              )}

              <Divider flexItem sx={{ mb: 1 }} />

              <Link
                to={activeProfile === "seller" ? "/f/settings" : "/e/settings"}
                style={{
                  textDecoration: "none",
                  color: colors.black,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ":hover": { color: `${colors.textGreen} !important` },
                    pb: 1,
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Typography>
              </Link>

              <Link
                to={activeProfile === "seller" ? "/f/payments" : "/e/payments"}
                style={{
                  textDecoration: "none",
                  color: colors.black,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ":hover": { color: `${colors.textGreen} !important` },
                    pb: 1,
                    fontWeight: "bold",
                  }}
                >
                  Payments
                </Typography>
              </Link>

              <Divider flexItem sx={{ mb: 1 }} />
              {/*
              <Link
                to="/chat/1"
                style={{
                  textDecoration: "none",
                  color: colors.black,
                }}
              >
                <ButtonBase
                  disableRipple={true}
                  sx={{
                    "&:hover": {
                      color: colors.textGreen,
                    },
                    pb: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Language</Typography>
                    <LanguageOutlined
                      fontSize="small"
                      sx={{ marginLeft: "3px" }}
                    />
                  </div>
                </ButtonBase>
              </Link>

              <Link
                to="/chat/1"
                style={{
                  textDecoration: "none",
                  color: colors.black,
                }}
              >
                <ButtonBase
                  disableRipple={true}
                  sx={{
                    "&:hover": {
                      color: colors.textGreen,
                    },
                    pb: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AttachMoneyOutlined
                      fontSize="small"
                      sx={{ marginLeft: "-4px" }}
                    />
                    <Typography variant="h6">USD</Typography>
                  </div>
                </ButtonBase>
              </Link>*/}
              <Link
                to="/customersupport"
                style={{
                  textDecoration: "none",
                  color: colors.black,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ":hover": { color: `${colors.textGreen} !important` },
                    pb: 1,
                    fontWeight: "bold",
                  }}
                >
                  Help & Support
                </Typography>
              </Link>
              <Divider flexItem sx={{ mb: 1 }} />

              <Typography
                onClick={logOut}
                variant="h6"
                sx={{
                  cursor: "pointer",
                  ":hover": { color: `${colors.textGreen} !important` },
                  fontWeight: "bold",
                }}
              >
                Logout
              </Typography>
            </div>
          </Paper>
        </Box>
      </Popover>
    </>
  );
};

export default UserOptions;

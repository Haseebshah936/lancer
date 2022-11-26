import * as React from "react";
import Paper from "@mui/material/Paper";

import colors from "../../utils/colors";

import { Avatar } from "@mui/material";
import * as styled2 from "styled-components";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { mobile } from "../../responsive";
import { Link, NavLink } from "react-router-dom";
import { useRealmContext } from "../../db/RealmContext";

const CustomList = styled(List)({
  color: colors.black,
  fontSize: "1.6rem !important",
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: "10px",
  },

  a: { textDecoration: "none" },
  "a:hover": { color: colors.textGreen },
  "a:active": {
    color: `${colors.textGreen} !important`,
  },
});

const CustomListText = styled(ListItemText)({
  ":hover": {
    color: colors.textGreen,
    cursor: "pointer",
  },
});

const CustomListItem = styled(ListItem)({
  marginBottom: "10px",
});

const Sidebar = () => {
  const { logOut } = useRealmContext();
  return (
    <>
      <Sticky>
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexDirection: "row",
            "@media (max-width: 550px)": {
              flexDirection: "column",
              justifyContent: "center",
            },
            alignItems: "center",
            justifyContent: "start",
            backgroundColor: colors.textGreen,
            color: colors.white,
          }}
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            aria-label="recipe"
            src="https://firebasestorage.googleapis.com/v0/b/web-mini-proj.appspot.com/o/unnamed.jpg?alt=media&token=ad1da1e1-7ba3-426e-9b29-4c1a263c3012"
          ></Avatar>
          <InfoWrapper>
            <p
              style={{
                fontWeight: 400,
                fontSize: "1.3rem",
              }}
            >
              welcome,{" "}
            </p>
            <p
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                marginBottom: "-2px",
              }}
            >
              Muhammad Umer,{" "}
            </p>
            <p style={{ fontWeight: 400, fontSize: "1.3rem" }}>@umer192 </p>
          </InfoWrapper>
        </Paper>
        <Paper
          sx={{
            p: 2,
            backgroundColor: colors.white,
            color: colors.textGreen,
            minWidth: 200,
            maxWidth: 500,
          }}
        >
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav>
              <CustomList>
                <Link to="/s/dashboard">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <DashboardOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Dashboard"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </Link>

                <Link to="/s/projects">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <WorkOutlineOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Projects"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </Link>

                <Link to="/s/favourites">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <FavoriteBorderOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Favourites"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </Link>

                <Link to="/s/reviews">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <StarOutlineOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Reviews"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </Link>

                <NavLink to="/chat/1">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <MessageOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Messages"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </NavLink>

                <Link to="/s/payments">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <PaidOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Payments"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </Link>

                <Link to="/s/settings">
                  <CustomListItem disablePadding>
                    <ListItemIcon>
                      <SettingsOutlinedIcon
                        sx={{
                          color: colors.textGreen,
                          fontSize: "2.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <CustomListText
                      primary="Settings"
                      disableTypography={true}
                    />
                  </CustomListItem>
                </Link>

                <CustomListItem disablePadding>
                  <ListItemIcon>
                    <PowerSettingsNewOutlinedIcon
                      sx={{
                        color: colors.textGreen,
                        fontSize: "2.2rem",
                        cursor: "pointer",
                      }}
                    />
                  </ListItemIcon>
                  <CustomListText
                    onClick={logOut}
                    primary="Logout"
                    disableTypography={true}
                  />
                </CustomListItem>
              </CustomList>
            </nav>
          </Box>
        </Paper>
      </Sticky>
    </>
  );
};

export default Sidebar;

const InfoWrapper = styled2.default.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 550px){
    align-items:center;
    justify-content:center;
    padding-top:5px;
  };
  margin-left: 8px;
`;

const Sticky = styled2.default.div`
${mobile({ position: "static" })}
  position:sticky;
  top:0px;
  z-index:5;
  
`;

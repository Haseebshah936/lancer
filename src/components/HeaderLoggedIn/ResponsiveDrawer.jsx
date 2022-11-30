import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";

export default function ResponsiveDrawer({
  toggleDrawer = () => {},
  state,
  toggleLogin,
}) {
  const { user, currentUser, logOut } = useRealmContext();
  const { activeProfile, setActiveProfile } = useCustomContext();
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;
  function matchRoutesinf() {
    if (
      currentPath === "/f/dashboard" ||
      currentPath == "/f/Gigs" ||
      currentPath == "/f/projects" ||
      currentPath == "/f/favourites" ||
      currentPath == "/f/reviews" ||
      currentPath == "/f/messages" ||
      currentPath == "/f/payments" ||
      currentPath == "/f/settings" ||
      currentPath == "/gig/gig" ||
      currentPath == "/createGig" ||
      currentPath == "/editGig"
    ) {
      return true;
    } else {
      return false;
    }
  }

  const allPurposeRoutes = () => {
    return (
      currentPath.includes("/profile/") || currentPath.includes("/portfolio/")
    );
  };

  React.useEffect(() => {
    // console.log(currentPath);
    if (allPurposeRoutes()) return;
    if (activeProfile === "seller" && !matchRoutesinf()) {
      // console.log("Active Profile", activeProfile);
      navigate("/f/dashboard");
    } else if (activeProfile !== "seller" && matchRoutesinf()) {
      navigate("/");
    }
  }, [activeProfile, user, currentUser]);

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
                    src={user?.profilePic}
                  ></Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ pl: "5px", fontWeight: "bold", lineHeight: "normal" }}
                  >
                    {user?.name}
                  </Typography>
                </ProfileHeader>

                <Link
                  style={{ marginTop: "20px" }}
                  to={
                    user?.seller
                      ? activeProfile === "seller"
                        ? "/"
                        : "/f/dashboard"
                      : "/becomeSeller"
                  }
                  onClick={() => {
                    if (user?.seller) {
                      activeProfile !== "seller"
                        ? localStorage.setItem(
                            "activeProfile",
                            JSON.stringify("seller")
                          )
                        : localStorage.removeItem(
                            "activeProfile",
                            JSON.stringify("buyerMode")
                          );
                      setActiveProfile(
                        activeProfile === "seller" ? "" : "seller"
                      );
                    }
                  }}
                >
                  {user?.seller ? (
                    //
                    activeProfile === "seller" ? (
                      "BuyerMode"
                    ) : (
                      "SellerMode"
                    )
                  ) : (
                    <p style={{ alignSelf: "center", marginBottom: 0 }}>
                      Become&nbsp;a&nbsp;Seller
                    </p>
                  )}
                </Link>
                {activeProfile === "seller" ? (
                  <Box display={"flex"} flexDirection={"column"}>
                    <NavLink to={`/profile/${user?._id}`}>Profile</NavLink>
                    <NavLink to={`/f/settings/${user?._id}`}>Settings</NavLink>
                    <NavLink to={`/f/payments/${user?._id}`}>Payments</NavLink>
                    <NavLink onClick={logOut}>Log out</NavLink>
                  </Box>
                ) : (
                  <Box display={"flex"} flexDirection={"column"}>
                    <NavLink to={`/profile/${user?._id}`}>Profile</NavLink>
                    <NavLink to="/postProject">Post Request</NavLink>
                    <NavLink to="/e/dashboard">Dashboard</NavLink>
                    <NavLink to="/e/settings">Setting</NavLink>
                    <NavLink onClick={logOut}>Log out</NavLink>
                  </Box>
                )}
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

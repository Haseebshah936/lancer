import React, { useState } from "react";
import styled from "styled-components";
import {
  Link,
  NavLink,
  useNavigate,
  matchRoutes,
  useLocation,
} from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import colors from "../../utils/colors";
import logo from "../../assets/logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRealmContext } from "../../db/RealmContext";
import { useEffect } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { useCustomContext } from "../../Hooks/useCustomContext";
import axios from "axios";

const InputField = ({
  label,
  onChange,
  value,
  styles,
  type,
  placeholder,
  id,
  name,
  ...props
}) => {
  return (
    <CustomInput
      id={id}
      type={type}
      fullWidth
      placeholder={placeholder}
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      style={{ ...styles }}
      {...props}
    />
  );
};

function Head({
  toggleDrawer,
  toggleLogin,
  setloader,
  toggleMessage,
  toggleNotification,
  toggleUserOptions,
  notifications,
  chats,
}) {
  // const currentPathDashboard = useCurrentPath([{ path: "/f/dashboard" }]);

  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = React.useState(false);
  const { user, currentUser, setUser } = useRealmContext();
  const {
    activeProfile,
    setActiveProfile,
    setSearchData,
    terms,
    setTerms,
    setSearchDataLoader,
    setAptitudeOpen,
    setCustomerOpen,
  } = useCustomContext();

  const handleSubmit = (search) => {
    if (search) {
      (async () => {
        try {
          const response = await axios.get(
            `http://localhost:3003/api/product/getProductBySearch/${search}`
          );

          // console.log("Search Response", response.data);
          setSearchData(response.data);
          setSearchDataLoader(false);
          navigate("/search");
          const newUser = await axios.put(
            `http://localhost:3003/api/user/updateRecentSearches/${user._id}`,
            { recentSearch: search }
          );
          setUser(newUser.data);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async () => {
        try {
          const response = await axios.get(
            `http://localhost:3003/api/product/`
          );

          // console.log("Search Response", response.data);
          setSearchData(response.data);
          setSearchDataLoader(false);
          navigate("/search");
        } catch (error) {
          console.log(error);
        }
      })();
      navigate("/search");
    }
  };

  const handleChange = (e) => {
    setTerms(e);
  };

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
      currentPath == "/chat" ||
      currentPath == "/editGig"
    ) {
      return true;
    } else {
      return false;
    }
  }

  const allPurposeRoutes = () => {
    return (
      currentPath.includes("/profile/") ||
      currentPath.includes("/portfolio/") ||
      currentPath == "/chat" ||
      currentPath == "/orderStatus"
    );
  };

  useEffect(() => {
    console.log(currentPath);
    if (allPurposeRoutes()) return;
    if (activeProfile === "seller" && !matchRoutesinf()) {
      navigate("/f/dashboard");
    } else if (activeProfile !== "seller" && matchRoutesinf()) {
      // console.log("Active Profile", activeProfile);
      navigate("/");
    }
  }, [activeProfile, user, currentUser]);

  // useEffect(() => {
  //   console.log("User from Realm", user);
  // }, [user]);

  return (
    <>
      <Container>
        <Menucontainer>
          <IconButton
            aria-label="menu"
            id="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Link to="/">
            <Image src={logo} />
          </Link>
          {activeProfile !== "seller" && (
            <SearchContainer>
              <div style={{ width: "10%" }}>
                <IconButton onClick={() => handleSubmit(terms)}>
                  <SearchOutlined sx={{ fontSize: "2rem" }} />
                </IconButton>
              </div>
              <form
                style={{ width: "90%" }}
                onSubmit={(e) => {
                  handleSubmit(terms);
                  e.preventDefault();
                }}
              >
                {" "}
                <InputField
                  value={terms}
                  styles={{
                    width: "100%",
                    backgroundColor: "transparent",
                    paddingLeft: "10px",
                  }}
                  placeholder={"What Services do you want?"}
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                />
              </form>
            </SearchContainer>
          )}
        </Menucontainer>
        <Wrapper>
          <SubContainer>
            <Link
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
                  setActiveProfile(activeProfile === "seller" ? "" : "seller");
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

            {activeProfile === "seller" ? null : (
              <NavLink to="/e/dashboard">Dashboard</NavLink>
            )}

            {activeProfile === "seller" ? (
              <Link
                onClick={() => {
                  setAptitudeOpen(true);
                }}
              >
                Aptitude&nbsp;Test
              </Link>
            ) : null}

            {activeProfile === "seller" ? (
              <Link
                onClick={() => {
                  setCustomerOpen(true);
                }}
              >
                Customer&nbsp;Support
              </Link>
            ) : null}

            {/* <NavLink to="/howitwork">How&nbsp;it&nbsp;Works</NavLink> */}
          </SubContainer>
          <ButtonContainer>
            <IconButton
              sx={{
                "@media (max-width: 786px)": {
                  display: "none",
                },
              }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {chats.length !== 0 ? (
                <Badge badgeContent={4} variant="dot" color="error">
                  {" "}
                  <MailOutlineIcon
                    onClick={toggleMessage}
                    sx={{ color: colors.textGreen }}
                    fontSize="large"
                  />
                </Badge>
              ) : (
                <MailOutlineIcon
                  onClick={toggleMessage}
                  sx={{ color: colors.textGreen }}
                  fontSize="large"
                />
              )}
            </IconButton>
            <IconButton
              sx={{
                "@media (max-width: 786px)": {
                  display: "none",
                },
              }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {notifications.length !== 0 ? (
                <Badge badgeContent={4} variant="dot" color="error">
                  <NotificationsOutlinedIcon
                    onClick={toggleNotification}
                    sx={{ color: colors.textGreen }}
                    fontSize="large"
                  />
                </Badge>
              ) : (
                <NotificationsOutlinedIcon
                  onClick={toggleNotification}
                  sx={{ color: colors.textGreen }}
                  fontSize="large"
                />
              )}
            </IconButton>
            {activeProfile !== "seller" && (
              <IconButton
                onClick={() => setSearchVisible((prev) => !prev)}
                sx={{
                  display: "none",
                  " @media (max-width: 700px)": {
                    display: "flex",
                  },
                }}
              >
                <SearchOutlinedIcon
                  style={{
                    color: colors.textGreen,
                  }}
                  fontSize="large"
                />
              </IconButton>
            )}

            <IconButton>
              <Avatar
                onClick={toggleUserOptions}
                sx={{
                  height: "4rem",
                  width: "4rem",
                  "@media (max-width: 786px)": {
                    display: "none",
                  },
                }}
                aria-label="avatar"
                src={user?.profilePic}
              ></Avatar>
            </IconButton>

            {/* {activeProfile === "seller" ? ( */}
            <Chip
              sx={{
                "@media (max-width: 786px)": {
                  display: "none",
                },
                color: colors.textGreen,
                borderColor: colors.textGreen,
                borderWidth: "2px",

                "& .MuiChip-label": {
                  paddingInline: "10px",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                },
              }}
              label={`$${user?.earnings === 0 ? 0 : user?.earnings}`}
              variant="outlined"
            />
            {/* ) : null} */}
          </ButtonContainer>
        </Wrapper>
      </Container>
      {searchVisible && (
        <Box
          sx={{
            height: "6rem",
            width: "100%",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "3px 2px 16px 3px rbga(0,0,0,0.5)",
            display: "none",
            " @media (max-width: 700px)": {
              display: "flex",
            },
          }}
        >
          {/* <SearchMobile>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["title"] }}
              placeholder="What Services do you want?"
              resultStringKeyName="title"
              styling={{ height: "40px", fontSize: "1.5rem" }}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </SearchMobile> */}
          <SearchMobile>
            <div style={{ width: "10%" }}>
              <IconButton onClick={() => handleSubmit(terms)}>
                <SearchOutlined sx={{ fontSize: "2.5rem" }} />
              </IconButton>
            </div>
            <form
              style={{ width: "90%" }}
              onSubmit={(e) => {
                handleSubmit(terms);
                e.preventDefault();
              }}
            >
              {" "}
              <InputField
                value={terms}
                styles={{
                  width: "100%",
                  backgroundColor: "transparent",
                  paddingLeft: "10px",
                }}
                placeholder={"What Services do you want?"}
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
            </form>
          </SearchMobile>
        </Box>
      )}
    </>
  );
}

export default Head;

const Container = styled.div`
  display: flex;
  padding-inline: 7%;
  max-height: 12vh;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.5rem;
  @media (max-width: 786px) {
    padding-inline: 7%;
  }
  /* overflow: hidden; */
`;
const Menucontainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  #menu {
    display: none;
  }
  @media (max-width: 786px) {
    #menu {
      display: flex;
      margin-right: 1rem;
    }
  }
`;
const Image = styled.img`
  width: 6rem;
  height: 2.5rem;
`;
const Wrapper = styled.div`
  display: flex;
`;
const SubContainer = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  text-decoration: none;
  align-items: flex-end !important;
  align-self: center;
  margin-right: 1rem;
  color: black;
  a {
    font-size: 1.2rem !important;
    text-decoration: none;

    color: black;
    margin-inline: 0.5rem;
    padding-bottom: 0.4rem;
    padding-inline: 1rem;
  }
  a:hover {
    color: ${colors.textGreen};
  }
  a.active {
    border-bottom: 0.3rem solid ${colors.textGreen};
    margin-top: 0.2rem;
  }
  @media (max-width: 786px) {
    & {
      display: none;
      width: 0px;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
  :hover {
    background-color: #eee;
  }
  border: 1px solid #dfe1e5;
  height: 44px;
  border-radius: 24px;
  color: #212121;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  padding-inline: 10px;
  width: 35ch;
  z-index: 10;
  @media (max-width: 700px) {
    display: none;
  } ;
`;

const SearchMobile = styled.div`
  box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
  :hover {
    background-color: #eee;
  }
  border: 1px solid #dfe1e5;
  height: 44px;
  border-radius: 24px;
  color: #212121;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-inline: 5%;
  justify-content: flex-start;
  padding-inline: 10px;
  width: 100%;
  z-index: 10;
`;

const CustomInput = styled.input`
  outline: none;
  border: 0px;
`;

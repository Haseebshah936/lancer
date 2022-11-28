import React from "react";
import styled from "styled-components";
import {
  Link,
  NavLink,
  useNavigate,
  matchRoutes,
  useLocation,
} from "react-router-dom";
import { Avatar, Badge, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import colors from "../../utils/colors";
import logo from "../../assets/logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRealmContext } from "../../db/RealmContext";
import { useEffect } from "react";

const Suggest = [
  { title: "Web Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "UI/UX Dev" },
  { title: "SEO" },
];

function Head({
  toggleDrawer,
  toggleLogin,
  toggleMessage,
  toggleNotification,
  toggleUserOptions,
}) {
  // const currentPathDashboard = useCurrentPath([{ path: "/f/dashboard" }]);
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = React.useState(false);
  const { user } = useRealmContext();

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    navigate("/search");
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.title}
        </span>
      </>
    );
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
      currentPath == "/f/settings"
    ) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    console.log(currentPath);
  }, []);

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

          <SearchContainer>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["title"] }}
              placeholder="What Services do you want?"
              resultStringKeyName="title"
              items={Suggest}
              styling={{ height: "40px", fontSize: "1.5rem" }}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </SearchContainer>
        </Menucontainer>
        <Wrapper>
          <SubContainer>
            <Link
              to={
                user?.seller
                  ? matchRoutesinf()
                    ? "/"
                    : "/f/dashboard"
                  : "/becomeSeller"
              }
            >
              {user?.seller ? (
                //
                matchRoutesinf() ? (
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
            <NavLink to="/contactus">Your&nbsp;Orders</NavLink>
            {currentPath === "/f/dashboard" ||
            currentPath == "/f/Gigs" ||
            currentPath == "/f/projects" ||
            currentPath == "/f/favourites" ||
            currentPath == "/f/reviews" ||
            currentPath == "/f/messages" ||
            currentPath == "/f/payments" ||
            currentPath == "/f/settings" ? null : (
              <NavLink to="/e/dashboard">Dashboard</NavLink>
            )}
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
              <Badge badgeContent={4} variant="dot" color="error">
                {" "}
                <MailOutlineIcon
                  onClick={toggleMessage}
                  sx={{ color: colors.textGreen }}
                  fontSize="large"
                />
              </Badge>
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
              <Badge badgeContent={4} variant="dot" color="error">
                <NotificationsOutlinedIcon
                  onClick={toggleNotification}
                  sx={{ color: colors.textGreen }}
                  fontSize="large"
                />
              </Badge>
            </IconButton>
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
          <SearchMobile>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["title"] }}
              placeholder="What Services do you want?"
              resultStringKeyName="title"
              items={Suggest}
              styling={{ height: "40px", fontSize: "1.5rem" }}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
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
    text-decoration: noimport useCurrentPath from './../../Hooks/useCurrentPath';
ne;
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
  margin-left: 30px;
  width: 55ch;
  z-index: 10;
  @media (max-width: 700px) {
    display: none;
  } ;
`;

const SearchMobile = styled.div`
  width: 95%;
  z-index: 10;
`;

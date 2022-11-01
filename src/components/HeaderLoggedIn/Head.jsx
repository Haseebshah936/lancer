import React from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import colors from "../../utils/colors";
import logo from "../../assets/logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

function Head({ toggleDrawer, toggleLogin }) {
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
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
  const navigate = useNavigate();
  return (
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
        <SubContainer>
          <NavLink to="/home">SellerMode</NavLink>
          <NavLink to="/contactus">Your&nbsp;Orders</NavLink>
          <NavLink to="/contactus">Dashboard</NavLink>
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
              <MailOutlineIcon
                sx={{ fontSize: "2.5rem", color: colors.textGreen }}
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
                sx={{ fontSize: "2.5rem", color: colors.textGreen }}
              />
            </Badge>
          </IconButton>
          <IconButton>
            <Avatar
              sx={{
                height: "3rem",
                width: "3rem",
                "@media (max-width: 786px)": {
                  display: "none",
                },
              }}
              aria-label="avatar"
              src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg"
            ></Avatar>
          </IconButton>
        </ButtonContainer>
      </Wrapper>
    </Container>
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
  margin-left: 30px;
  width: 55ch;
  z-index: 10;
  @media (max-width: 786px) {
    display: none;
  } ;
`;

const SearchMobile = styled.div`
  width: 50rem;
  z-index: 10;

  @media (min-width: 786px) {
    display: none;
  } ;
`;

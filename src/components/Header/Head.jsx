import React from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import colors from "../../utils/colors";
import logo from "../../assets/logo.png"

function Head({ toggleDrawer, toggleLogin }) {
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
      </Menucontainer>
      <Wrapper>
      <SubContainer>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contactus">Contact&nbsp;Us</NavLink>
        {/* <NavLink to="/howitwork">How&nbsp;it&nbsp;Works</NavLink> */}
      </SubContainer>
      <ButtonContainer>
        <Button
          variant="outlined"
          sx={{
            "@media (max-width: 786px)": {
              display: "none",
            },
            borderRadius: "2rem",
            color: "black",
            borderColor: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderColor: "black",
            },
            fontSize: "1rem",
            height: "2.8rem",
            width: "6.2rem",
            minWidth: "1rem",
            textTransform: "capitalize",
            minWidth: "1rem",
          }}
          onClick={toggleLogin}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "2rem",
            color: "white",
            borderColor: "black",
            backgroundColor: "black",
            marginLeft: "1.5rem",
            fontSize: "1rem",
            height: "2.8rem",
            width: "6.2rem",
            minWidth: "1rem",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            textTransform: "capitalize",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign&nbsp;Up
        </Button>
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
    padding-inline: 3%;
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
`
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
    text-decoration: none;
    color: black;
    margin-inline: 1rem;
    padding-bottom: 0.4rem;
    padding-inline: 1rem;
  }
  a:hover {
    color: #7d7d7d;
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

import React from "react";
import styled from "styled-components";
import UserChat from "../../components/UserChat";
import Footer from "../../components/Footer";
import Header from "../../components/HeaderLoggedIn";
import CustomIconButton from "../../components/CustomIconButton";
import { ArrowBack } from "@mui/icons-material";
import colors from "../../utils/colors";
import { miniTablet, mobile, tablet } from "../../responsive";
import { useNavigate } from "react-router-dom";

function Chat(props) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      {/* <CustomIconButton
        style={{
          alignSelf: "flex-end",
          width: "8rem",
          borderRadius: "5rem",
          marginBottom: 0,
          marginTop: 0,
          marginRight: "7%",
          backgroundColor: colors.black,
          fontSize: "1rem",
        }}
        text="Back"
        leftIcon={<ArrowBack style={{ fontSize: "1.2rem" }} />}
        onClick={() => navigate(-1)}
      /> */}
      <Button onClick={() => navigate(-1)}>
        <ArrowBack style={{ fontSize: "1.6rem" }} />
        Back
      </Button>
      <UserChat />
    </Wrapper>
  );
}

export default Chat;
const Wrapper = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const Button = styled.div`
  /* border-bottom: 2px solid black; */
  align-self: flex-end;
  font-size: 1.6rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7.5rem;
  animation: slide 2s ease-in-out;
  &:hover {
    animation: slide 2s infinite;
  }
  font-weight: 700;
  margin-right: 7%;
  ${tablet({
    marginRight: "2%",
  })}
  ${miniTablet({
    marginRight: "7%",
  })}
  cursor: pointer;
  @keyframes slide {
    0% {
      width: 7.5rem;
    }
    25% {
      width: 8rem;
    }
    50% {
      width: 7.5rem;
    }
    75% {
      width: 8rem;
    }
    100% {
      width: 7.5rem;
    }
  }
`;

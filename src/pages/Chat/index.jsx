import React from "react";
import styled from "styled-components";
import UserChat from "../../components/UserChat";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CustomIconButton from "../../components/CustomIconButton";
import { ArrowBack } from "@mui/icons-material";
import colors from "../../utils/colors";
import { mobile } from "../../responsive";
import { useNavigate } from "react-router-dom";

function Chat(props) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      <CustomIconButton
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
      />
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

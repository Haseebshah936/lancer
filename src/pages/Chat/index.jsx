import React from "react";
import styled from "styled-components";
import UserChat from "../../components/UserChat";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Chat(props) {
  return (
    <Wrapper>
      <Header />
      <UserChat />
    </Wrapper>
  );
}

export default Chat;
const Wrapper = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

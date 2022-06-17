import React from "react";
import styled from "styled-components";
import Footer from "../compontents/Footer";
import Header from "../compontents/Header";

function Discover(props) {
  return (
    <Container>
      <Header />
      Discover
      <Footer />
    </Container>
  );
}

export default Discover;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

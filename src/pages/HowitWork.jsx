import React from "react";
import styled from "styled-components";
import Footer from "../compontents/Footer";
import Header from "../compontents/Header";

function HowitWork(props) {
  return (
    <Container>
      <Header />
      How it Work
      <Footer />
    </Container>
  );
}

export default HowitWork;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

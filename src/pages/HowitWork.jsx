import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HowitWork(props) {
  return (
    <Container>
      <Header />
      How it Work Not being Used
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

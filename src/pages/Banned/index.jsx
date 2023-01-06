import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import BannedDetails from "./BannedDetails";
function Banned(props) {
  return (
    <Container>
      <Header />
      <BannedDetails />
      <Footer />
    </Container>
  );
}

export default Banned;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
`;

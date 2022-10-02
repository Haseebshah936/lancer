import React from "react";
import styled from "styled-components";
import Footer from "../compontents/Footer";
import Header from "../compontents/Header";

function ContactUs(props) {
  return (
    <Container>
      <Header />
      ContactUs
      <Footer />
    </Container>
  );
}

export default ContactUs;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

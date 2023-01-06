import React from "react";
import styled from "styled-components";
import { banned } from "../../assets";
import { miniTablet } from "../../responsive";
function BannedDetails(props) {
  return (
    <Container>
      <Image src={banned} />
      <Text>
        You have been banned from this site. Please contact the customer support
        for more info.
      </Text>
    </Container>
  );
}

export default BannedDetails;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  height: 25vh;
`;
const Text = styled.p`
  font-size: 2rem;
  text-align: center;
  width: 40%;
  ${miniTablet({
    width: "30rem",
  })}
  margin-top: 3rem;
  margin-bottom: 4rem;
`;

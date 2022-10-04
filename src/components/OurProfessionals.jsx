import { Button } from "@mui/material";
import { ImgOverlay } from "image-overlay-react";
import React, { useState } from "react";
import styled from "styled-components";
import ProfessionalProfile from "./ProfessionalProfile";

function OurProfessionals(props) {
  const [data, setData] = useState([1, 2, 3]);
  return (
    <Container>
      <TextContainer>
        <Heading>Our&nbsp;Professionals</Heading>
        <Tagline>Team Behind The Curtain</Tagline>
      </TextContainer>
      {data.map((item) => (
        <ProfessionalProfile key={item.id} item={item} />
      ))}
    </Container>
  );
}

export default OurProfessionals;
const Container = styled.div`
  display: flex;
  margin-inline: 5%;
  margin-top: 5rem;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 39rem;
  min-width: 39rem;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  text-transform: capitalize;
  @media (max-width: 768px) {
    text-align: start;
  }
`;
const Tagline = styled.p`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  line-height: 2rem;
  text-align: justify;
`;

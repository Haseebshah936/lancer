import { Avatar, Button } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import teamImg from "../assets/1.svg"

function Seller(props) {
  return (
    <NewCard>
      <Image variant="top" src={teamImg} />
      <Body>
        <Title>Haseeb</Title>
        <Wrapper>
          <Button
            variant="contained"
            sx={{
              borderRadius: "2rem",
              color: "white",
              borderColor: "black",
              backgroundColor: "black",
              fontSize: "1rem",
              padding: ".7rem 2.5rem",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
              textTransform: "capitalize",
            }}
          >
            Check Out
          </Button>
        </Wrapper>
      </Body>
      <Pic
        alt="Remy Sharp"
        src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg"
      />
    </NewCard>
  );
}

export default Seller;

const NewCard = styled(Card)`
  border-radius: 10% !important;
  overflow: hidden;
  width: 16rem;
  min-width: 16rem;
  height: 20rem;
  margin-top: 4rem;
  background-color: #fdfdfd;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  margin-right: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Pic = styled(Avatar)`
  position: absolute !important;
  align-self: center;
  top: 15%;
  width: 8rem !important;
  height: 8rem !important;
  border: 1px solid white;
`;

const Image = styled.img`
  width: 100%;
  height: 42%;
  object-fit: contain;
  overflow: hidden;
`;
const Body = styled.div`
  width: 100%;
  height: 54%;
  padding: 3rem 2rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  align-self: center;
  margin-bottom: 0.4rem;
`;

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
`;
const Text = styled.p`
  font-size: 1rem;
  opacity: 0.6;
  margin-left: 1rem;
`;

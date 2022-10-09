import { Button } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import teamImg from "../assets/1.svg"

function Category(props) {
  return (
    <NewCard>
      <Image variant="top" src={teamImg} />
      <Body>
        <div>
          <Title>Mobile Development</Title>
        </div>
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
          <Text>251 Services</Text>
        </Wrapper>
      </Body>
    </NewCard>
  );
}

export default Category;

const NewCard = styled(Card)`
  border-radius: 10% !important;
  overflow: hidden;
  width: 21rem;
  min-width: 21rem;
  height: 29rem;
  margin-top: 4rem;
  background-color: #fdfdfd;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  margin-right: 1rem;
`;
const Image = styled.img`
  width: 100%;
  height: 50%;
  object-fit: contain;
  overflow: hidden;
`;
const Body = styled.div`
  width: 100%;
  height: 50%;
  padding: 3rem 2rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.p`
  font-size: 1rem;
  opacity: 0.6;
  margin-left: 1rem;
`;

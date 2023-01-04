import { Button, ClickAwayListener, Modal } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import colors from "../../utils/colors";

function Greetings(props) {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <Heading>Greetings {"&"} Welcome</Heading>
          <Tagline>
            Welcome to our freelance platform! We are a team of dedicated
            professionals who have come together to create a space where
            talented freelancers can connect with clients looking for their
            services. Our platform is designed to make it easy for freelancers
            to showcase their skills and experience, and for clients to find the
            perfect match for their project needs. We believe that everyone has
            unique talents and skills to offer, and our goal is to help
            freelancers put those talents to work in a way that is convenient
            and rewarding.
          </Tagline>
          <Tagline>
            We are constantly working to improve and expand our platform, and we
            are always looking for ways to make it easier for freelancers and
            clients to connect and collaborate. If you have any feedback or
            suggestions, we would love to hear from you! Thank you for choosing
            our platform, and we look forward to helping you succeed in your
            freelance endeavors.
          </Tagline>
        </TextContainer>
        <ImageContainer
          src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655442109/lancer/video-img_mvwa4l.png"
          onClick={() => setOpen(true)}
        />
      </Container>
      <CountContainer>
        <CountTextContainer>
          <CountText>10K+</CountText>
          <SubText>Active Projects</SubText>
        </CountTextContainer>
        <CountTextContainer>
          <CountText>97%</CountText>
          <SubText>Great Feedback</SubText>
        </CountTextContainer>
        <CountTextContainer>
          <CountText>20K+</CountText>
          <SubText>Active Freelancers</SubText>
        </CountTextContainer>
      </CountContainer>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Wrap>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/scfwAel4N0I"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </ClickAwayListener>
        </Wrap>
      </Modal>
    </Wrapper>
  );
}

export default Greetings;
const Wrapper = styled.div`
  padding-inline: 7%;
  margin-top: 5rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 750px) {
    justify-content: flex-start;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Heading = styled.h1`
  font-size: 4rem;
  text-transform: capitalize;
  @media (max-width: 768px) {
    text-align: start;
  }
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;
const Tagline = styled.p`
  font-size: 1rem;
  margin-top: 3rem;
  line-height: 2rem;
  text-align: justify;
  @media (max-width: 600px) {
    margin-top: 1.5rem;
  }
`;

const CountContainer = styled.div`
  display: flex;
  width: 60%;
  margin-top: 3rem;
`;

const CountTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;
  margin-right: 4rem;
`;
const CountText = styled.h2`
  font-size: 3rem;
  color: ${colors.textGreen};
  margin-bottom: 0rem;
`;
const SubText = styled.p`
  opacity: 0.6;
`;

const ImageContainer = styled.img`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  margin-left: 7%;
  @media (max-width: 750px) {
    display: none;
  }
  align-self: center;
  cursor: pointer;
  resize: vertical;
  height: 40rem;
  width: 40rem;
  object-fit: contain;
`;
const Wrap = styled.div`
  min-height: 100vh !important;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

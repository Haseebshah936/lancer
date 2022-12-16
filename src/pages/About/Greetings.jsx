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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
            dolore praesentium earum quam, alias laudantium nobis nihil dolorem
            ea, neque totam. Dicta et aliquam exercitationem quam. Debitis
            officiis impedit nisi, in nihil aut enim odio non reiciendis
            veritatis. Beatae facere laboriosam sed accusantium provident
            repellendus enim magnam dolor quia animi facilis, praesentium eum
            perspiciatis dicta recusandae veniam minus similique quisquam
            voluptatum reiciendis nisi corrupti nam aperiam! Eum rem adipisci
            magnam ipsam corporis voluptatum beatae hic minus. Earum error
            distinctio odio, aspernatur doloribus vero nisi accusantium natus
            doloremque culpa eaque sint sed laudantium quam amet. Sapiente ab
            dolorem impedit. Praesentium, quibusdam?
          </Tagline>
          <Tagline>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad qui
            voluptatem quod modi adipisci esse officia atque distinctio itaque
            eveniet commodi, aliquid iste perferendis saepe eligendi beatae ab
            ratione molestiae earum eum sit. Mollitia, vitae at repudiandae
            maxime animi natus rem quibusdam praesentium hic non impedit sit ad
            neque fugiat.
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

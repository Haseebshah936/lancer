import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
function BecomePartner(props) {
  return (
    <Container>
      <ImageContainer src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655445328/lancer/Capture-removebg-preview_cc7ga1.png" />

      <TextContainer>
        <Heading>Become An Investor.</Heading>
        <Tagline>
          Lancer is the world's largest freelancing marketplace. We have the
          best freelancer community specialized in every field.{" "}
        </Tagline>
        <ButtonContainer>
          <Btn>
            <BtnText>Join Now</BtnText>
          </Btn>
        </ButtonContainer>
      </TextContainer>
    </Container>
  );
}

export default BecomePartner;

const Container = styled.div`
  display: flex;
  margin-inline: 5%;
  justify-content: space-around;
  margin-top: 5rem;
  background-color: #068a6fdc;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  justify-content: center;
  padding-inline: 5%;
`;

const Heading = styled.h1`
  font-size: 4rem;
  margin-top: 4rem;
  text-transform: capitalize;
  color: white;
  @media (max-width: 768px) {
    text-align: start;
  }
`;
const Tagline = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  line-height: 2rem;
  text-align: justify;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 55%;
  justify-content: space-between;
  margin-bottom: 4rem;
`;

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 1rem 1rem;
  cursor: pointer;
  margin-top: 2.5rem;
  color: black !important;
  box-shadow: 3px 2px 16px 5px rgba(8, 8, 8, 0.18);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(8, 8, 8, 0.18);
  -moz-box-shadow: 3px 2px 16px 5px rgba(8, 8, 8, 0.18);
  background-color: #05ad8c !important;
`;

const BtnText = styled.div`
  font-size: 1.5rem;
  margin-inline: 1.5rem;
  text-transform: capitalize;
  color: white;
`;

const ImageContainer = styled.img`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  @media (max-width: 760px) {
    display: none;
  }
  align-self: flex-end;
  cursor: pointer;
  resize: vertical;
  width: 45rem;
  object-fit: contain;
  margin-top: 5rem;
  margin-left: 2%;
`;

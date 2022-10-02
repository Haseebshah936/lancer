import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import colors from "../utils/colors";
function Title(props) {
  return (
    <Container>
      <TextContainer>
        <Heading>Discover the largest freelancing marketplace.</Heading>
        <Tagline>
          Lancer is the world's largest freelancing marketplace. We have the
          best freelancer community specialized in every field.{" "}
        </Tagline>
        <ButtonContainer>
          <Btn>
            <BtnText>Explore</BtnText>
            <IconContainer>
              <ArrowUpwardIcon fontSize="medium" />
            </IconContainer>
          </Btn>
        </ButtonContainer>
        <CountContainer>
          <CountTextContainer>
            <CountText>40K+</CountText>
            <SubText>Users</SubText>
          </CountTextContainer>
          <CountTextContainer>
            <CountText>20K+</CountText>
            <SubText>Sellers</SubText>
          </CountTextContainer>
          <CountTextContainer>
            <CountText>30K+</CountText>
            <SubText>Services</SubText>
          </CountTextContainer>
        </CountContainer>
      </TextContainer>
      <ImageContainer />
    </Container>
  );
}

export default Title;

const Container = styled.div`
  display: flex;
  padding-inline: 7%;
  justify-content: space-around;
  margin-top: 5rem;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 4rem;
  text-transform: capitalize;
  @media (max-width: 768px) {
    text-align: start;
  }
`;
const Tagline = styled.p`
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  line-height: 2rem;
  text-align: justify;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 55%;
  justify-content: space-between;
`;

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 1rem 1rem;
  cursor: pointer;
  opacity: 0.6;
  margin-top: 2.5rem;
  border-radius: 50px !important;
  color: black !important;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 2px solid transparent;
    background: linear-gradient(45deg, #050505, ${colors.borderGreen}) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  &:hover {
    opacity: 1;
    background-color: #fff !important;
  }
`;

const BtnText = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  text-transform: capitalize;
`;

const IconContainer = styled.div`
  margin-left: 0.5rem;
  transform: rotate(45deg);
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
  font-size: 2.5rem;
  color: ${colors.textGreen};
  margin-bottom: 0rem;
`;
const SubText = styled.p`
  opacity: 0.6;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  margin-left: 7%;
  @media (max-width: 650px) {
    display: none;
  }
  align-self: center;

  height: 50vh;
  @media (max-width: 1200px) {
    height: 40vh;
  }
  background-image: url("1.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-clip: border-box;
`;

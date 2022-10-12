import Button from "@mui/material/Button";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";
import React from "react";
import BuyerCard from "./BuyerCard";
import colors from "../../utils/colors";
import { mobile } from "../../responsive";
import { teamImg } from "../../assets";

const MPGigSlider = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const GigRef = useRef();

  return (
    <Container>
      <HeadingContainer>
        <Heading>Most Popular in Web Development</Heading>
      </HeadingContainer>
      <BuyerListContainer>
        <ButtonContainer>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "2rem",
              color: "black",
              borderColor: "#0000009e",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "#0000009e",
              },
              marginRight: "1.5rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              textTransform: "capitalize",
              minWidth: "1rem",
            }}
            onClick={() => scroll(-GigRef.current.offsetWidth)}
          >
            <ArrowBackIcon fontSize="medium" />
          </Button>
        </ButtonContainer>
        <BuyerContainer ref={ref}>
          {a.map((c) => (
            <div ref={GigRef}>
              <BuyerCard
                count={c}
                GigImage={teamImg}
                Avatar={
                  "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg"
                }
                SellerName={"Muhammad Haseeb"}
                SellerLevel={"Level Rana Seller"}
                GigTitle={"I will assassinate Talha and Umer with pressure"}
                SellerRating={"5.0"}
                GigReviewsTotal={"33"}
                GigStartPrice={"$50"}
              />
            </div>
          ))}
        </BuyerContainer>
        <ButtonContainer>
          <Button
            variant="contained"
            sx={{
              borderRadius: "2rem",
              color: "white",
              marginLeft: "1.5rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              background:
                " linear-gradient(130deg, #172f33, #43856b) border-box",
              textTransform: "capitalize",
            }}
            onClick={() => scroll(GigRef.current.offsetWidth)}
          >
            <ArrowForwardIcon fontSize="medium" />
          </Button>
        </ButtonContainer>
        <MobileButtonContainer>
          <Button
            variant="contained"
            sx={{
              borderRadius: "2rem",
              color: "white",
              marginLeft: "1.5rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              background: ` linear-gradient(130deg, #172f33, ${colors.primaryGreen}) border-box`,
              marginTop: "5rem",
              textTransform: "capitalize",
            }}
            onClick={() => scroll(GigRef.current.offsetWidth)}
          >
            <ArrowForwardIcon fontSize="medium" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "2rem",
              color: "black",
              borderColor: "#0000009e",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "#0000009e",
              },
              marginLeft: "1.5rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              textTransform: "capitalize",
              minWidth: "1rem",
              marginTop: "1rem",
            }}
            onClick={() => scroll(-GigRef.current.offsetWidth)}
          >
            <ArrowBackIcon fontSize="medium" />
          </Button>
        </MobileButtonContainer>
      </BuyerListContainer>
    </Container>
  );
};

export default MPGigSlider;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 7%;
  align-items: start;
  margin-top: 10rem;
`;

const HeadingContainer = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;
const Heading = styled.h2`
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BuyerListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 95%;
  align-self: center;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const BuyerContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  scroll-behavior: smooth;
`;

const ButtonContainer = styled.div`
  ${mobile({ display: "none" })};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileButtonContainer = styled.div`
  ${mobile({ display: "flex" })};
  display: none;
  flex-direction: column;
  justify-content: center;
`;

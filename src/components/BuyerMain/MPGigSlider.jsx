import Button from "@mui/material/Button";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import React from "react";
import PortfolioCard from "../PortfolioCard";
import colors from "../../utils/colors";
import { mobile } from "../../responsive";
import { teamImg } from "../../assets";
import { useRealmContext } from "../../db/RealmContext";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";

const MPGigSlider = () => {
  const { user } = useRealmContext();
  const [Gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    console.log("hide", hide);
  }, [hide]);

  useEffect(() => {
    const search = user?.recentSearches[user?.recentSearches.length - 1];
    console.log("Search ", search);
    if (search === undefined) {
      setHide(true);
    } else {
      (async () => {
        try {
          const response = await axios.get(
            `http://localhost:3003/api/product/getProductBySearch/${search}`
          );
          setHide(false);
          setLoading(false);
          setGigs(response.data.slice(0, 9));
          console.log("Gigs", Gigs);
        } catch (error) {
          console.log("Error", error);
        }
      })();
    }
  }, [user]);

  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const GigRef = useRef();

  return (
    <>
      {hide === false && (
        <Container>
          <HeadingContainer>
            <Heading>Recent Searches</Heading>
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
              {loading ? (
                <CircularProgress
                  sx={{
                    "&.MuiCircularProgress-root": {
                      color: colors.textGreen,
                    },
                  }}
                />
              ) : (
                Gigs.map((c) => (
                  <div ref={GigRef}>
                    <PortfolioCard
                      count={c}
                      GigImage={c?.images[0]}
                      Avatar={c?.owner?._id?.profilePic}
                      SellerName={c?.owner?._id?.name}
                      SellerLevel={c?.owner?._id?.badge}
                      GigTitle={c?.title}
                      SellerRating={c?.owner?._id?.seller?.rating}
                      GigReviewsTotal={c?.owner?._id?.seller?.reviews}
                      GigStartPrice={c?.cost}
                      ownerId={c?.owner?._id?._id}
                      productId={c?._id}
                    />
                  </div>
                ))
              )}
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
      )}
    </>
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

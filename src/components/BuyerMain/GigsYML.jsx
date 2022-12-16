import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import PortfolioCard from "../PortfolioCard";
import { teamImg } from "../../assets";
import { mobile } from "../../responsive";
import PortfolioCardMobile from "../PortfolioCardMobile";

const GigsYML = () => {
  const a = [1, 2, 3, 4, 5, 6];
  return (
    <Container>
      <HeadingContainer>
        <Heading>Gigs You may like</Heading>
      </HeadingContainer>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={3}>
          {a.map((c) => (
            <Grid item lg={2} md={3} sm={4} sx={{ mr: { lg: 5 } }}>
              <Laptop>
                <PortfolioCard
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
              </Laptop>

              <Mobile>
                <PortfolioCardMobile
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
              </Mobile>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GigsYML;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 7%;
  align-items: start;
  margin-top: 10rem;
`;
const HeadingContainer = styled.div`
  display: "flex";
  justify-content: space-between;
  position: relative;
  margin-bottom: 4rem;
`;
const Heading = styled.h2`
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Mobile = styled.div`
  display: none;
  ${mobile({ display: "initial" })}
`;

const Laptop = styled.div`
  ${mobile({ display: "none" })}
`;

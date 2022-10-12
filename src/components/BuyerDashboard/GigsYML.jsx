import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import BuyerCard from "./BuyerCard";
import { teamImg } from "../../assets";

const GigsYML = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Container>
      <HeadingContainer>
        <Heading>Gigs You may like</Heading>
      </HeadingContainer>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {a.map((c) => (
            <Grid item lg={2} md={3} sm={4}>
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

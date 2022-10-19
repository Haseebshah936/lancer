import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { teamImg } from "../../assets";
import PortfolioCard from "../../components/PortfolioCard";
import { miniTablet } from "../../responsive";

function Portfolios({
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
}) {
  return (
    <Container>
      {data.map((c, i) => (
        <PortfolioCard
          style={{ marginRight: 0 }}
          key={i}
          hideProfileInfo={false}
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
      ))}
    </Container>
  );
}

export default Portfolios;

const Container = styled.div`
  display: flex;
  ${miniTablet({ alignItems: "center", justifyContent: "center" })}
  flex-wrap: wrap;
  gap: 3rem;
`;

import React from "react";
import PortfolioCard from "../PortfolioCard";
import Grid from "@mui/material/Grid";
import { teamImg } from "../../assets";

const SearchGrid = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "4px", marginLeft: "0px" }}>
        {data.map((c) => (
          <Grid xs={3} lg={3} md={4} sm={4}>
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
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SearchGrid;

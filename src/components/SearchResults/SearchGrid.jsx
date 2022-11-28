import React from "react";
import PortfolioCard from "../PortfolioCard";
import Grid from "@mui/material/Grid";
import { teamImg } from "../../assets";
import PortfolioCardMobile from "../PortfolioCardMobile";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { useEffect } from "react";

const SearchGrid = ({ data }) => {
  const { searchData } = useCustomContext();

  useEffect(() => {
    console.log("Search Data", searchData);
  }, [searchData]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {searchData.map((c) => (
          <Grid
            item
            xs={3}
            lg={3}
            md={4}
            sm={4}
            rowspacing={2}
            columnSpacing={2}
          >
            <Laptop>
              <PortfolioCard
                count={c}
                GigImage={searchData?.images}
                Avatar={searchData?.owner?._id?.profilePic}
                SellerName={searchData?.owner?._id?.name}
                SellerLevel={searchData?.owner?._id?.badge}
                GigTitle={searchData?.title}
                SellerRating={searchData?.rating}
                GigReviewsTotal={searchData?.reviews}
                GigStartPrice={searchData?.cost}
              />
            </Laptop>

            <Mobile>
              <PortfolioCardMobile
                GigTitle={"I will assassinate Talha and Umer with pressure"}
                SellerRating={"5.0"}
                GigReviewsTotal={"33"}
                GigImage={teamImg}
                Avatar={
                  "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg"
                }
                SellerName={"Muhammad Haseeb"}
                SellerLevel={"Level Rana Seller"}
                GigStartPrice={"$50"}
              />
            </Mobile>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SearchGrid;

const Mobile = styled.div`
  display: none;
  ${mobile({ display: "initial" })}
`;

const Laptop = styled.div`
  ${mobile({ display: "none" })}
`;

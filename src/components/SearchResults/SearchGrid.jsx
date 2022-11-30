import React from "react";
import PortfolioCard from "../PortfolioCard";
import Grid from "@mui/material/Grid";
import { teamImg } from "../../assets";
import PortfolioCardMobile from "../PortfolioCardMobile";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { useEffect } from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import colors from "../../utils/colors";

const SearchGrid = () => {
  const { searchData, searchDataLoader } = useCustomContext();

  useEffect(() => {
    // console.log("Search Data", searchData);
  }, [searchData]);

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        {searchDataLoader ? (
          // <Backdrop
          //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          //   open={searchDataLoader}
          // >
          // <CircularProgress color={colors.textGreen} />
          <Typography>Hello</Typography>
        ) : (
          // </Backdrop>
          searchData.map((c) => (
            <Grid
              item
              xs={3}
              lg={3}
              md={4}
              sm={4}
              rowspacing={2}
              columnSpacing={2}
              key={c._id}
            >
              <Laptop>
                <PortfolioCard
                  count={c}
                  GigImage={c?.images[0]}
                  Avatar={c?.owner?._id?.profilePic}
                  SellerName={c?.owner?._id?.name}
                  SellerLevel={c?.owner?._id?.badge}
                  GigTitle={c?.title}
                  SellerRating={c?.rating}
                  GigReviewsTotal={c?.reviews}
                  GigStartPrice={c?.cost}
                  ownerId={c?.owner?._id?._id}
                  productId={c?._id}
                />
              </Laptop>

              <Mobile>
                <PortfolioCardMobile
                  count={c}
                  GigImage={c?.images[0]}
                  Avatar={c?.owner?._id?.profilePic}
                  SellerName={c?.owner?._id?.name}
                  SellerLevel={c?.owner?._id?.badge}
                  GigTitle={c?.title}
                  SellerRating={c?.rating}
                  GigReviewsTotal={c?.reviews}
                  GigStartPrice={c?.cost}
                  ownerId={c?.owner?._id?._id}
                  productId={c?._id}
                />
              </Mobile>
            </Grid>
          ))
        )}
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

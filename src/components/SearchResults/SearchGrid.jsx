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

const SearchGrid = ({ data }) => {
  const { searchDataLoader } = useCustomContext();

  // useEffect(() => {{)}

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        {searchDataLoader ? (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "80vh" }}
          >
            <CircularProgress
              sx={{
                "&.MuiCircularProgress-root": {
                  color: colors.textGreen,
                },
              }}
            />
          </Grid>
        ) : (
          data.map((c) => (
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
                  SellerRating={c?.owner?._id?.seller?.rating}
                  GigReviewsTotal={c?.owner?._id?.seller?.reviews}
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
                  SellerRating={c?.owner?._id?.seller?.rating}
                  GigReviewsTotal={c?.owner?._id?.seller?.reviews}
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

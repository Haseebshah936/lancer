import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import PortfolioCard from "../PortfolioCard";
import { teamImg } from "../../assets";
import { mobile } from "../../responsive";
import PortfolioCardMobile from "../PortfolioCardMobile";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import colors from "../../utils/colors";

const GigsYML = () => {
  const [Gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/product/`);

        // console.log("Search Response", response.data);
        setLoading(false);
        setGigs(response.data.slice(0, 10));
        console.log("Gigs", Gigs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container>
      <HeadingContainer>
        <Heading>Gigs You may like</Heading>
      </HeadingContainer>
      <Box sx={{ flexGrow: 1 }}>
        {loading ? (
          <CircularProgress
            sx={{
              "&.MuiCircularProgress-root": {
                color: colors.textGreen,
              },
            }}
          />
        ) : (
          <Grid container rowSpacing={3}>
            {Gigs.map((c) => (
              <Grid item lg={2} md={3} sm={4} sx={{ mr: { lg: 5 } }}>
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
            ))}
          </Grid>
        )}
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

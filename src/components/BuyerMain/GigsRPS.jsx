import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import PortfolioCard from "../PortfolioCard";
import { teamImg } from "../../assets";
import colors from "../../utils/colors";
import { mobile } from "../../responsive";
import PortfolioCardMobile from "../PortfolioCardMobile";

const GigsRPS = () => {
  const a = [1, 2, 3, 4, 5];
  return (
    <div>
      <Container>
        <HeadingContainer>
          <Heading>
            Pro Services in{" "}
            <p
              style={{
                color: colors.textGreen,
                display: "inline",
                fontWeight: "600",
              }}
            >
              Web Programing
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                marginLeft: "2px",
                marginTop: "2px",
              }}
            >
              Hand-vetted talent for all your professional needs.
            </p>
          </Heading>
          <h4
            style={{
              color: colors.textGreen,
              textDecoration: "Underline",
              marginTop: "4%",
              cursor: "pointer",
            }}
          >
            View&nbsp;More
          </h4>
        </HeadingContainer>

        <Box sx={{ flexGrow: 1 }}>
          <Grid item container rowSpacing={3}>
            {a.map((c) => (
              <Grid
                item
                lg={2}
                md={3}
                sm={4}
                rowSpacing={3}
                sx={{ mr: { lg: 4 } }}
              >
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
    </div>
  );
};

export default GigsRPS;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10rem;
  background-color: #fafafa;
  margin-inline: 7%;
  padding-inline: 2%;
`;
const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  margin-bottom: 4rem;
  width: 100%;
`;
const Heading = styled.h2`
  margin-top: 5px;
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Mobile = styled.div`
  display: none;
  ${mobile({ display: "initial", paddingInline: "5%" })}
`;

const Laptop = styled.div`
  ${mobile({ display: "none" })}
`;

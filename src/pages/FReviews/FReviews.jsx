import React from "react";
import { Avatar, Box, Button, Grid, Rating, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
import { reviews } from "../../utils/dummyData";
export default function FReviews() {
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} md={11}>
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item xs={11} sm={2.7}>
              <FSideBar></FSideBar>
            </Grid>
            <Grid
              item
              xs={11}
              sm={9}
              marginLeft={"10px"}
              my={{ xs: 1, md: 0 }}
              // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              paddingLeft={{ md: "10px" }}
            >
              <HeadP>Customer Reviews</HeadP>
              <Box>
                {reviews.map((review) => (
                  <Grid container my={1}>
                    <Grid item xs={12} sm={2}>
                      <Avatar
                        alt="Travis Howard"
                        src={review.img}
                        sx={{ width: 50, height: 50 }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      display={"flex"}
                      justifyContent="center"
                      alignItems={"center"}
                    >
                      <ReviewText>{review.text}</ReviewText>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={2}
                      display={"flex"}
                      alignItems={"center"}
                      flexDirection="column"
                      justifyContent={{ xs: "left", sm: "center" }}
                    >
                      <Box>Rating</Box>
                      <Rating name="read-only" value={review.rating} readOnly />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={2}
                      display="flex"
                      justifyContent={{ xs: "right", sm: "center" }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: colors.becomePartnerGreen,
                          height: "30px",
                        }}
                      >
                        Reply
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <hr></hr>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: colors.becomePartnerGreen,
                      height: "30px",
                    }}
                  >
                    Load more Reviews
                  </Button>
                </Grid>
              </Box>
            </Grid>

            <Grid xs={11} sm={9}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}
const HeadP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;
const ReviewText = Styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    `;

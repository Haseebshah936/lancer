import React from "react";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  Grid,
  Rating,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
import { reviews } from "../../utils/dummyData";
export default function FReviews() {
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>

      <Container>
        <Box sx={{ flexGrow: 1, pt: 1, pb: 1 }}>
          <ThemeProvider
            theme={createTheme({
              breakpoints: {
                values: {
                  laptop: 1024,
                  tablet: 640,
                  mobile: 0,
                  desktop: 1280,
                  xs: 0,
                  sm: 600,
                  md: 900,
                  lg: 1200,
                  xl: 1536,
                },
              },
            })}
          >
            <Grid container spacing={2}>
              <Grid item mobile={12} laptop={4} tablet={5} desktop={3}>
                <FSideBar></FSideBar>
              </Grid>

              <Grid
                item
                mobile={12}
                tablet={7}
                laptop={8}
                desktop={9}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid
                  item
                  xs={12}
                  ml={1}
                  my={{ xs: 1, md: 0 }}
                  // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
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
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                          />
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
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"center"}
                    >
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
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

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
const Container = Styled.div`
margin-inline: 7%;
`;

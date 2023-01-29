import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
// import { reviews } from "../../utils/dummyData";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import { StarBorderOutlined } from "@mui/icons-material";
export default function FReviews() {
  const { activeProfile } = useCustomContext();
  const [loader, setLoader] = useState(true);
  const { user } = useRealmContext();
  const [reviews, setReviews] = useState([]);

  const getBuyerReviews = async (id) => {
    const response = await requestMethod.get("review/buyerReviews/" + id);
    return response.data;
  };

  useEffect(() => {
    if (user) {
      getBuyerReviews(user._id).then((res) => {
        setReviews(res);
        setLoader(false);
      });
    }
  }, [user]);
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>

      <Container>
        <Box sx={{ flexGrow: 1, pt: 1, pb: 1 }}>
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

                {reviews.length > 0 ? (
                  <Box>
                    {reviews.map((review, index) => (
                      <Grid
                        item
                        xs={12}
                        p={2}
                        mt={1.5}
                        boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                        className="rounded"
                      >
                        <Box key={index}>
                          <Grid container>
                            <Grid item xs={12}>
                              <TitleP>{review?.projectId?.title}</TitleP>
                            </Grid>
                            <Grid item xs={12}>
                              <p>{review?.comment}</p>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={3} sm={1}>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={review?.buyerId?.profilePic}
                                    sx={{ width: 45, height: 45 }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  sm={1.2}
                                  display={"flex"}
                                  // alignItems={"center"}
                                  justifyContent={"flex-end"}
                                  flexDirection={"column"}
                                >
                                  <UserNameP>{review?.buyerId?.name}</UserNameP>
                                  <p style={{ marginBottom: "0px" }}>
                                    {new Date(review?.createdAt).toDateString()}
                                  </p>
                                </Grid>
                                <Grid
                                  item
                                  xs={5}
                                  display={"flex"}
                                  alignItems={"center"}
                                >
                                  <Rating
                                    name="read-only"
                                    value={review?.rating}
                                    readOnly
                                  />
                                  ({review?.rating})
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                    {/* <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"center"}
                      mt={2}
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
                    </Grid> */}
                  </Box>
                ) : (
                  <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    my={2}
                  >
                    <Typography variant="h2">No Reviews Yet</Typography>
                    <StarBorderOutlined sx={{ fontSize: "10rem" }} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer></Footer>
    </div>
  );
}

const ReviewText = Styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    `;

const HeadP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
`;
const TitleP = Styled.p`
    font-size: 1.35rem;
    font-weight: 600;
`;
const UserNameP = Styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 5px;
`;

const Container = Styled.div`
  margin-inline: 7%;
`;

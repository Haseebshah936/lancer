import React from "react";
import { Avatar, Box, Grid, Rating, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
import colors from "../../utils/colors";
import ESideBar from "../../pages/ESideBar/ESideBar";
import Footer from "./../../components/Footer/index";
import { sReviews } from "../../utils/dummyData";

export default function EReviews() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} md={11}>
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item xs={11} sm={2.7}>
              <ESideBar></ESideBar>
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
              <HeadP>Reviews</HeadP>
              <Grid container>
                {sReviews.map((item, index) => (
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
                          <TitleP>{item.reviewTitle}</TitleP>
                        </Grid>
                        <Grid item xs={12}>
                          <p>{item.reiewDescription}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={3} sm={1}>
                              <Avatar
                                alt="Remy Sharp"
                                src={item.userImg}
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
                              <UserNameP>{item.userName}</UserNameP>
                              <p style={{ marginBottom: "0px" }}>
                                {item.reviewDate}
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
                                value={item.stars}
                                readOnly
                              />
                              ({item.stars})
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
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
const TitleP = Styled.p`
    font-size: 1.35rem;
    font-weight: 600;
`;
const UserNameP = Styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 5px;
`;

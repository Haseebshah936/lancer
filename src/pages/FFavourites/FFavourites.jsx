import React from "react";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
import { favData } from "../../utils/dummyData";
import StarIcon from "@mui/icons-material/Star";
export default function FFavourites() {
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
                  my={{ xs: 1, md: 0 }}
                  // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                >
                  <Grid item xs={12}>
                    <TitleP className="text-left">Favorites</TitleP>
                  </Grid>
                  <Grid item mobile={12}>
                    <Grid container>
                      {favData.map((per, index) => (
                        <Grid
                          item
                          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                          my={0.5}
                          mobile={12}
                          tablet={6}
                          laptop={4}
                          desktop={3}
                          display={"flex"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                          className="rounded"
                        >
                          <Grid container>
                            <Grid item xs={3}></Grid>
                            <Grid
                              item
                              xs={6}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={per.userImg}
                                sx={{ width: 56, height: 56 }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              mt={2}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <StarIcon
                                style={{
                                  color: colors.becomePartnerGreen,
                                  fontSize: "22px",
                                }}
                              />
                            </Grid>
                          </Grid>
                          <UsernnameP className="text-center">
                            {per.userName}
                          </UsernnameP>
                          <OtherTextP className="text-center">
                            {per.mainSkill}
                          </OtherTextP>
                          <OtherTextP className="text-center">
                            {per.location}
                          </OtherTextP>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid
                                item
                                display={"flex"}
                                justifyContent={"center"}
                                xs={12}
                              >
                                <SkillBox className="text-center">
                                  {per.skill[0]}
                                </SkillBox>
                              </Grid>
                              <Grid
                                item
                                display={"flex"}
                                justifyContent={"center"}
                                xs={12}
                              >
                                <SkillBox className="text-center">
                                  {per.skill[1]}
                                </SkillBox>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <SkillBox className="text-center">
                                  {per.skill[2]}
                                </SkillBox>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <OtherTextLargeP className="text-center">
                              ${per.sBudget}-${per.eBudget}
                            </OtherTextLargeP>
                          </Grid>
                          <Grid item xs={!2}>
                            <Grid container>
                              <Grid item xs={4}>
                                <OtherTextP className="text-center">
                                  Expiry
                                </OtherTextP>
                                <OtherTextP className="text-center">
                                  {per.willExpireIn} Days Left
                                </OtherTextP>
                              </Grid>
                              <Grid item xs={4}>
                                <OtherTextP className="text-center">
                                  Perposals
                                </OtherTextP>
                                <OtherTextP className="text-center">
                                  {per.perposals}
                                </OtherTextP>
                              </Grid>
                              <Grid item xs={4}>
                                <OtherTextP className="text-center">
                                  Job Type
                                </OtherTextP>
                                <OtherTextP className="text-center">
                                  {per.jobType}
                                </OtherTextP>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} margin={"5px"}>
                            <Button
                              fullWidth
                              variant="centained"
                              style={{
                                backgroundColor:
                                  colors.becomePartnerButtonGreen,
                                color: colors.white,
                                marginTop: "10px",
                              }}
                            >
                              View Profile
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
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

const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;
const UsernnameP = Styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 0px;
    color: ${colors.becomePartnerGreen};
    `;
const OtherTextP = Styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 0px;
    color: #6e727d;
    `;
const OtherTextLargeP = Styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 0px;
    color: #6e727d;
    `;

const SkillBox = Styled(Box)`
    background-color: #f6f6f6;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    `;

const Container = Styled.div`
  margin-inline: 7%;
`;
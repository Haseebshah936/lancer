import React from "react";
import { Box, Grid, Tab, Tabs, Avatar, Button, Rating } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import colors from "../../utils/colors";
import ESideBar from "../../pages/ESideBar/ESideBar";
import Footer from "./../../components/Footer/index";
import { favData } from "../../utils/dummyData";
import StarIcon from "@mui/icons-material/Star";

export default function EFavourites() {
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
              <HeadP>Favorites</HeadP>
              <Grid container>
                <Grid item xs={11.5}>
                  <Grid container>
                    {favData.map((per, index) => (
                      <Grid
                        item
                        boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                        mx={0.5}
                        my={0.5}
                        xs={12}
                        sm={2.8}
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
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          my={0.5}
                        >
                          <Rating name="read-only" value={4} readOnly />
                          4.5 (12)
                        </Grid>
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
                            ${per.sBudget * 0.2} Hourly
                          </OtherTextLargeP>
                        </Grid>

                        <Grid item xs={12} margin={"5px"}>
                          <Button
                            fullWidth
                            variant="centained"
                            style={{
                              backgroundColor: colors.becomePartnerButtonGreen,
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

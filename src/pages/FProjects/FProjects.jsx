import React, { useEffect, useState } from "react";
import {
  Box,
  createTheme,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import colors from "../../utils/colors";
import { allProject } from "../../utils/EProjectsData";
import AvalibleProjects from "../../components/FProject/AvalibleProjects";
import CancelledProjects from "../../components/FProject/CancelledProjects";
import CompletedProjects from "../../components/FProject/CompletedProjects";
import MyPerposals from "../../components/FProject/MyPerposals";
import OnGoingProjects from "../../components/FProject/OnGoingProjects";
import FSideBar from "../../pages/FSideBar/FSideBar";

// import Sidebar from "../../components/DashboardComponents/Sidebar";

import Footer from "../../components/Footer/index";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import LoadingComp from "../../components/LoadingComp/LoadingComp";

export default function FProjects() {
  const [value, setValue] = React.useState(0);
  const { user } = useRealmContext();
  const [loadingValue, setLoadingValue] = useState(false);
  const [allAvalibleProjects, setAllAvalibleProjects] = React.useState([]);
  const [myPerposals, setMyPerposals] = React.useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const allAvalibleProjectsFun = async () => {
    setLoadingValue(true);
    await requestMethod.get(`project/pending/${user?._id}`).then((res) => {
      console.log(res.data);
      setAllAvalibleProjects(res.data);
    });
    setLoadingValue(false);
  };
  // useEffect(() => {
  //   allAvalibleProjectsFun();
  // }, []);
  const allMyPerposalsFun = async () => {
    setLoadingValue(true);
    await requestMethod.get(`proposal/user/${user?._id}`).then((res) => {
      console.log(res.data);
      setMyPerposals(res.data);
    });
    setLoadingValue(false);
  };
  // useEffect(() => {
  //   allMyPerposalsFun();
  // }, []);
  const allOngoingProjectsFun = async () => {
    setLoadingValue(true);
    await requestMethod
      .get(`project/seller/onGoing/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setOngoingProjects(res.data);
      });
    setLoadingValue(false);
  };

  // useEffect(() => {
  //   allOngoingProjectsFun();
  // }, []);

  // useEffect(() => {
  //   allMyPerposalsFun();
  //   allAvalibleProjectsFun();
  //   allOngoingProjectsFun();
  //   // console.log("allAvalibleProjects", allAvalibleProjects);
  //   // console.log("myPerposals", myPerposals);
  // }, [value]);

  const getAllAvalibleProjects = async () => {
    const res = await requestMethod
      .get("project")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err in catching all projects", err);
      });
  };
  useEffect(() => {
    setValue(value);
    console.log("value", value);
  }, [value]);
  useEffect(() => {
    // setLoadingValue(true);
    // getAllAvalibleProjects();
    // setLoadingValue(false);
    // console.log("allAvalibleProjects", allAvalibleProjects);
    // // while (true) {
    // //   setTimeout(() => {
    // //     console.log("Loading Value", loadingValue);
    // //   }, 300);
    // // }
    handleChange("e", 0);
  }, []);

  const handleChange = (event, newValue) => {
    console.log("value in handel", loadingValue);
    if (newValue === 0) {
      allAvalibleProjectsFun();
    } else if (newValue === 1) {
      allMyPerposalsFun();
    } else if (newValue === 2) {
      allOngoingProjectsFun();
    }
    // allMyPerposalsFun();
    // allAvalibleProjectsFun();
    // allOngoingProjectsFun();
    setValue(newValue);
  };
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
                  marginLeft={"10px"}
                  my={{ xs: 1, md: 0 }}
                  // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  paddingLeft={{ md: "10px" }}
                >
                  <HeadP>Manage Projects</HeadP>
                  <Box
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                    display={"flex"}
                    justifyContent="center"
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      aria-label="scrollable force tabs example"
                      textColor={colors.becomePartnerGreen}
                      TabIndicatorProps={{
                        style: {
                          background: colors.becomePartnerGreen,
                        },
                      }}
                      //   textColor={colors.borderGreen}
                      //   indicatorColor={colors.becomePartnerGreen}
                    >
                      <Tab
                        label="Avalible Projects"
                        style={{ color: colors.black, fontWeight: "bold" }}
                      />
                      <Tab
                        label="My Perposals"
                        style={{ color: colors.black, fontWeight: "bold" }}
                      />
                      <Tab
                        label="Ongoing Projects"
                        style={{ color: colors.black, fontWeight: "bold" }}
                      />
                      <Tab
                        label="Completed Projects"
                        style={{ color: colors.black, fontWeight: "bold" }}
                      />
                      <Tab
                        label="Cancelled Projects"
                        style={{ color: colors.black, fontWeight: "bold" }}
                      />
                    </Tabs>
                  </Box>
                  <Grid container>
                    <Grid item xs={12} display="flex" justifyContent={"center"}>
                      {value === 0 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <AvalibleProjects
                            data={allAvalibleProjects}
                          ></AvalibleProjects>
                        ))}
                      {value === 1 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <MyPerposals data={myPerposals}></MyPerposals>
                        ))}
                      {value === 2 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <OnGoingProjects
                            data={ongoingProjects}
                          ></OnGoingProjects>
                        ))}
                      {value === 3 && (
                        <CompletedProjects
                          data={allProject}
                        ></CompletedProjects>
                      )}
                      {value === 4 && (
                        <CancelledProjects
                          data={allProject}
                        ></CancelledProjects>
                      )}
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
const HeadP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;

const Container = Styled.div`
  margin-inline: 7%;
`;

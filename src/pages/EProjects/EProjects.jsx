import React, { useEffect, useState } from "react";
import {
  Box,
  createTheme,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
  Drawer,
} from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import colors from "../../utils/colors";
import { allProject } from "../../utils/EProjectsData";
import AllProjects from "../../components/EProject/AllProjects";
import CompletedProjects from "../../components/EProject/CompletedProjects";
import OngoingProjects from "../../components/EProject/OngoingProjects";
import PendingProjects from "../../components/EProject/PendingProjects";
import CancelledProjects from "./../../components/EProject/CancelledProjects";
import ESideBar from "../../pages/ESideBar/ESideBar";
import Footer from "./../../components/Footer/index";
import { requestMethod } from "./../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import LoadingComp from "../../components/LoadingComp/LoadingComp";

export default function EProjects() {
  const { user } = useRealmContext();
  const [drawerValue, setDrawerValue] = useState(false);
  const [loadingValue, setLoadingValue] = useState(false);

  const [value, setValue] = React.useState(0);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [cancelledProjects, setCancelledProjects] = useState([]);
  const completedProjectsFun = async () => {
    setLoadingValue(true);
    await requestMethod
      .get(`project/creator/completed/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setCompletedProjects(res.data);
      });
    setLoadingValue(false);
  };
  const onGoingProjectFun = async () => {
    setLoadingValue(true);
    await requestMethod
      .get(`project/creator/onGoing/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setOngoingProjects(res.data);
      });
    setLoadingValue(false);
  };
  useEffect(() => {
    onGoingProjectFun();
  }, []);

  const pendingProjectsFun = async () => {
    setLoadingValue(true);
    await requestMethod
      .get(`project/creator/pending/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setPendingProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoadingValue(false);
  };
  const allCancelledProjectsFun = async () => {
    setLoadingValue(true);
    await requestMethod
      .get(`project/creator/cancelled/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setCancelledProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoadingValue(false);
  };
  useEffect(() => {
    pendingProjectsFun();
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      pendingProjectsFun();
    } else if (newValue === 1) {
      onGoingProjectFun();
    } else if (newValue === 2) {
      completedProjectsFun();
    } else if (newValue === 3) {
      allCancelledProjectsFun();
    }
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
                <ESideBar />=
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
                <Grid item xs={12} my={{ xs: 1, md: 0 }}>
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
                      {/* <Tab
                        label="All Projects"
                        style={{ color: colors.black, fontWeight: "bold" }}
                      /> */}
                      <Tab
                        label="Pending Projects"
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
                      {/* {value === 0 && (
                        <AllProjects data={allProject}></AllProjects>
                      )} */}
                      {value === 0 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <PendingProjects
                            data={pendingProjects}
                          ></PendingProjects>
                        ))}
                      {value === 1 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <OngoingProjects
                            data={ongoingProjects}
                          ></OngoingProjects>
                        ))}
                      {value === 2 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <CompletedProjects
                            data={completedProjects}
                          ></CompletedProjects>
                        ))}
                      {value === 3 &&
                        (loadingValue ? (
                          <LoadingComp></LoadingComp>
                        ) : (
                          <CancelledProjects
                            data={cancelledProjects}
                          ></CancelledProjects>
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
const HeadP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;

const Container = Styled.div`
  margin-inline: 7%;
`;

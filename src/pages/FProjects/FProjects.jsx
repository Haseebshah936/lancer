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

export default function FProjects() {
  const [value, setValue] = React.useState(0);
  const [allAvalibleProjects, setAllAvalibleProjects] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    getAllAvalibleProjects();
  }, []);
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
                      {value === 0 && (
                        <AvalibleProjects data={allProject}></AvalibleProjects>
                      )}
                      {value === 1 && (
                        <MyPerposals data={allProject}></MyPerposals>
                      )}
                      {value === 2 && (
                        <OnGoingProjects data={allProject}></OnGoingProjects>
                      )}
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
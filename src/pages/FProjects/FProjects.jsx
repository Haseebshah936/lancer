import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
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
import Sidebar from "../../components/DashboardComponents/Sidebar";

export default function FProjects() {
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
                    label="Avalible Perposals"
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
                  {value === 1 && <MyPerposals data={allProject}></MyPerposals>}
                  {value === 2 && (
                    <OnGoingProjects data={allProject}></OnGoingProjects>
                  )}
                  {value === 3 && (
                    <CompletedProjects data={allProject}></CompletedProjects>
                  )}
                  {value === 4 && (
                    <CancelledProjects data={allProject}></CancelledProjects>
                  )}
                </Grid>
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

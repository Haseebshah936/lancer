import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
import colors from "../../utils/colors";
import { allProject } from "../../utils/EProjectsData";
import AllProjects from "../../components/EProject/AllProjects";
import CompletedProjects from "../../components/EProject/CompletedProjects";
import OngoingProjects from "../../components/EProject/OngoingProjects";
import PendingProjects from "../../components/EProject/PendingProjects";
import CancelledProjects from "./../../components/EProject/CancelledProjects";
import Sidebar from "../../components/DashboardComponents/Sidebar";
import Footer from "./../../components/Footer/index";

export default function EProjects() {
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
              <Sidebar></Sidebar>
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
                    label="All Projects"
                    style={{ color: colors.black, fontWeight: "bold" }}
                  />
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
                  {value === 0 && <AllProjects data={allProject}></AllProjects>}
                  {value === 1 && (
                    <PendingProjects data={allProject}></PendingProjects>
                  )}
                  {value === 2 && (
                    <OngoingProjects data={allProject}></OngoingProjects>
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

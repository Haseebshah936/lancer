import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Styled from "styled-components";
import Header from "../../components/Header";
import colors from "../../utils/colors";
import Sidebar from "../ESideBar/ESideBar";
import Footer from "./../../components/Footer/index";
import Dashboard from "../../components/SellerDashboardRenders/Dashboard";

export default function EDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>
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
                <Dashboard />
              </Grid>
              <Grid xs={11} sm={9}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>

      <Footer></Footer>
    </div>
  );
}
const HeadP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;

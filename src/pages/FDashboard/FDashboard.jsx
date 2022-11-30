import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
// import Header from "../../components/Header";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FSideBar from "../../pages/FSideBar/FSideBar";
import SellerDashboard from "../SellerDashboard";
import Dashboard from "../../components/SellerDashboardRenders/Dashboard";
export default function FDashboard() {
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
                <Dashboard />
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

      {/* </ThemeProvider> */}

      <Footer></Footer>
    </div>
  );
}

const Container = Styled.div`
  margin-inline: 7%;
`;

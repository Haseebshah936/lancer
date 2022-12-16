import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
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
                <Sidebar />=
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

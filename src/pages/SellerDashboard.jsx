import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Header from "../components/HeaderLoggedIn";
import Footer from "../components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../components/DashboardComponents/Sidebar";
import StatCardWidget from "../components/DashboardComponents/StatCardWidget";
import LineGraphWidget from "../components/DashboardComponents/LineGraphWidget";
import RadialChartWidget from "../components/DashboardComponents/RadialChartWidget";
import OngoingOrdersWidget from "../components/DashboardComponents/OngoingOrdersWidget";
import PastOrdersWidget from "../components/DashboardComponents/PastOrdersWidget";
import { Button } from "@material-ui/core";
import { useRealmContext } from "../db/RealmContext";
import { Outlet } from "react-router-dom";

const SellerDashboard = () => {
  const { currentUser } = useRealmContext();
  return (
    <>
      <Header />
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
                <Sidebar />{" "}
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
                <Outlet />
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default SellerDashboard;

const Container = styled.div`
  margin-inline: 7%;
`;

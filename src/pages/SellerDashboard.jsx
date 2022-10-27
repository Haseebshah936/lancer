import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Header from "../components/BuyerMain/Header";
import Footer from "../components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../components/SellerDashboard/Sidebar";

const SellerDashboard = () => {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
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
              <Grid mobile={12} laptop={4} tablet={5} desktop={3}>
                <Sidebar />
              </Grid>
              <Grid
                mobile={12}
                tablet={7}
                laptop={8}
                desktop={9}
                sx={{ backgroundColor: "aqua" }}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid container>
                  <Grid item desktop={3} sx={{ backgroundColor: "blue" }}>
                    as
                  </Grid>
                  <Grid item desktop={3} sx={{ backgroundColor: "red" }}>
                    as
                  </Grid>
                  <Grid item desktop={3} sx={{ backgroundColor: "green" }}>
                    as
                  </Grid>
                </Grid>
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

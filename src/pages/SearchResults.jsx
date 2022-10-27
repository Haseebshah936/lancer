import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Filters from "../components/SearchResults/Filters";
import styled from "styled-components";
import Header from "../components/BuyerMain/Header";
import Footer from "../components/Footer";
import SearchGrid from "../components/SearchResults/SearchGrid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { tablet } from "../responsive";

const SearchResults = () => {
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
              <Grid item mobile={12} tablet={3}>
                <Filters></Filters>
              </Grid>
              <Grid item mobile={12} tablet={9}>
                <SearchGrid></SearchGrid>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;

const Container = styled.div`
  margin-inline: 7%;
  ${tablet({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  })};
`;

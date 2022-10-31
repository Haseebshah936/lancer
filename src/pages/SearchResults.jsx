import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Filters from "../components/SearchResults/Filters";
import styled from "styled-components";
import Header from "../components/BuyerMain/Header";
import Footer from "../components/Footer";
import SearchGrid from "../components/SearchResults/SearchGrid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { tablet } from "../responsive";
import { Pagination } from "@mui/material";

const SearchResults = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const [pagination, setPagination] = React.useState(1);
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    setCount(Math.ceil(data.length / 12));
  }, [pagination]);

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
              <Grid
                item
                mobile={12}
                tablet={9}
                rowspacing={2}
                columnSpacing={2}
              >
                <SearchGrid
                  data={data.slice((pagination - 1) * 12, pagination * 12)}
                ></SearchGrid>
                <Box
                  mt={"4rem"}
                  display="flex"
                  justifyContent="center"
                  alignContent={"center"}
                  width="100%"
                >
                  <Pagination
                    count={count}
                    page={pagination}
                    onChange={(e, page) => setPagination(page)}
                  />
                </Box>
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

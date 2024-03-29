import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Filters from "../components/SearchResults/Filters";
import styled from "styled-components";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Header from "../components/Header";

import Footer from "../components/Footer";
import SearchGrid from "../components/SearchResults/SearchGrid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { tablet } from "../responsive";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useCustomContext } from "../Hooks/useCustomContext";
import { useRealmContext } from "../db/RealmContext";

const SearchResults = () => {
  // const [count, setCount] = useState(1);
  const {
    searchPagination,
    setSearchPagination,
    searchData,
    pageCount,
    setpageCount,
  } = useCustomContext();
  const { user } = useRealmContext();

  // useEffect(() => {
  //   axios.get("http://localhost:3003/api/product/").then((response) => {
  //     handleData(response.data);
  //     console.log("Gig Data", searchData);
  //     setCount(Math.ceil(searchData.length / 12));
  //   });
  // }, []);

  return (
    <Wrapper>
      {user ? <HeaderLoggedIn /> : <Header />}

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
                <Filters />
              </Grid>
              <Grid
                item
                mobile={12}
                tablet={9}
                rowspacing={2}
                columnSpacing={2}
              >
                <SearchGrid
                  // data={searchData.slice(
                  //   (searchPagination - 1) * 12,
                  //   searchPagination * 12
                  // )}

                  data={searchData.slice(
                    (searchPagination - 1) * 12,
                    searchPagination * 12
                  )}
                ></SearchGrid>
                {searchData.length > 12 && (
                  <Box
                    mt={"4rem"}
                    display="flex"
                    justifyContent="center"
                    alignContent={"center"}
                    width="100%"
                  >
                    <Pagination
                      count={pageCount}
                      page={searchPagination}
                      onChange={(e, page) => setSearchPagination(page)}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default SearchResults;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div`
  margin-inline: 7%;

  ${tablet({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  })};
`;

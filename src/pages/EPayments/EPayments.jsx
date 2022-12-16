import * as React from "react";
import {
  Box,
  createTheme,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import ESideBar from "../../pages/ESideBar/ESideBar";

import WithdrawFunds from "../../components/EPayments/WithdrawFunds";
import Invoices from "../../components/EPayments/Invoices";
import TransectionHistory from "../../components/EPayments/TransectionHistory";
export default function FPayments() {
  const [value, setValue] = React.useState("one");

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
                <ESideBar></ESideBar>
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
                <Grid
                  item
                  xs={12}
                  my={{ xs: 1, md: 0 }}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Box sx={{ width: { xs: "100%" } }}>
                    <Box
                      sx={{
                        width: { xs: "100%" },
                        paddingLeft: { md: "70px" },
                        paddingRight: { md: "70px" },
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        variant="fullWidth"
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: colors.becomePartnerGreen,
                            color: colors.becomePartnerGreen,
                          },
                        }}
                      >
                        <Tab
                          value="one"
                          label="Withdraw Funds"
                          style={{ color: colors.black, fontWeight: "bold" }}
                        ></Tab>
                        <Tab
                          value="two"
                          label="Invoices"
                          style={{ color: colors.black, fontWeight: "bold" }}
                        />
                        <Tab
                          value="three"
                          label="Transactions History"
                          style={{ color: colors.black, fontWeight: "bold" }}
                        />
                      </Tabs>
                    </Box>
                    <Box display="flex" justifyContent={"center"}>
                      {value === "one" && <WithdrawFunds></WithdrawFunds>}
                      {value === "two" && <Invoices></Invoices>}
                      {value === "three" && (
                        <TransectionHistory></TransectionHistory>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

      <Footer></Footer>
    </div>
  );
}

const Container = Styled.div`
  margin-inline: 7%;
`;

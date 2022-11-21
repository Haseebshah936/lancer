import * as React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";

import WithdrawFunds from "../../components/FPayments/WithdrawFunds";
import Invoices from "../../components/FPayments/Invoices";
import TransectionHistory from "../../components/FPayments/TransectionHistory";
export default function FPayments() {
  const [value, setValue] = React.useState("one");

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
              <FSideBar></FSideBar>
            </Grid>
            <Grid
              item
              xs={11}
              sm={9}
              marginLeft={"10px"}
              my={{ xs: 1, md: 0 }}
              // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              paddingLeft={{ xs: 0, md: "10px" }}
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
                      sx={{
                        fontWeight: "bold",
                        color: colors.becomePartnerGreen,
                      }}
                    ></Tab>
                    <Tab
                      value="two"
                      label="Invoices"
                      sx={{
                        color: colors.becomePartnerGreen,
                        fontWeight: "bold",
                      }}
                    />
                    <Tab
                      value="three"
                      label="Transactions History"
                      sx={{
                        fontWeight: "bold",
                        color: colors.becomePartnerGreen,
                      }}
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

            <Grid item xs={11} sm={9}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

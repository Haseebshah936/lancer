import React from "react";
import { Box, Button, Grid, Tab, Tabs, TextField } from "@mui/material";
import Styled from "styled-components";
import colors from "./../../utils/colors";

export default function WithdrawFunds() {
  return (
    <div style={{ width: "100%" }}>
      <Grid conatiner>
        <Grid
          item
          xs={12}
          boxShadow=" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          my={2}
        >
          <Box padding={2}>
            <TitleP className="text-left">Add Wallet</TitleP>
            <Grid container>
              <Grid item xs={12}>
                <GreenBorderTextField
                  fullWidth
                  id="outlined-basic"
                  label="Add Amount"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={12} my={1}>
                <Grid conatiner display={"flex"} flexDirection={"row"}>
                  <Grid item xs={1.9} mx={1} sm={0.7}>
                    <PayentAmountDiv>50$</PayentAmountDiv>
                  </Grid>
                  <Grid item xs={2} sm={0.7}>
                    <PayentAmountDiv>100$</PayentAmountDiv>
                  </Grid>
                  <Grid item xs={2} mx={1} sm={0.7}>
                    <PayentAmountDiv>150$</PayentAmountDiv>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid item xs={12}>
                <GreenBorderTextField
                  fullWidth
                  id="outlined-basic"
                  label="Card Number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} my={1.6}>
                <Grid
                  conatiner
                  display={"flex"}
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={12} sm={5.8}>
                    <GreenBorderTextField
                      fullWidth
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={5.8} my={{ xs: 1.2, sm: 0 }}>
                    <GreenBorderTextField
                      fullWidth
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  conatiner
                  display={"flex"}
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={12} sm={3}>
                    <GreenBorderTextField
                      fullWidth
                      id="outlined-basic"
                      label="Expiry Date"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} my={{ xs: 1.2, sm: 0 }}>
                    <GreenBorderTextField
                      fullWidth
                      id="outlined-basic"
                      label="CVV (Security Code)"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                my={1.2}
                display={"flex"}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    width: "130px",
                    height: "40px",
                    backgroundColor: colors.becomePartnerGreen,
                  }}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3.5}
          my={1.2}
          className="border rounded"
          padding={2}
        >
          <div style={{ height: "200px" }}>
            <TitleP>Wallet</TitleP>
            <div
              className="d-flex justify-content-center align-items-center rounded"
              style={{
                height: "100px",
                backgroundColor: colors.becomePartnerButtonGreen,
              }}
            >
              <div
                style={{
                  backgroundColor: colors.becomePartnerGreen,
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  fontSize: "30px",
                  paddingTop: "10px",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <p style={{ color: "white" }}>$</p>
              </div>
              <Box mx={{ xs: 3, sm: 1 }}>
                <p style={{ color: "white", fontSize: "1.5rem" }}>
                  Avalible Amount
                </p>
                <p style={{ color: "white", fontSize: "1.5rem" }}>120$</p>
              </Box>
            </div>
            <div className="d-flex to-row justify-content-between pe-2 ps-2">
              <div className="pt-3">
                <STitleP>Total Credit</STitleP>
                <STitleP>120$</STitleP>
              </div>
              <div className="pt-3">
                <STitleP>Total Credit</STitleP>
                <STitleP>120$</STitleP>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;
const STitleP = Styled.p`
    font-size: 1.4rem;
    font-weight: 600;
    `;
const GreenBorderTextField = Styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  }
`;
const PayentAmountDiv = Styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #f5f5f5;
  `;

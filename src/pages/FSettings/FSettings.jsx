import React from "react";
import { Box, Grid, Tab, Tabs, TextField } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
export default function FSettings() {
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
              paddingLeft={{ md: "10px" }}
            >
              <Grid container display={"flex"} justifyContent={"center"}>
                <Grid item xs={11.5}>
                  <TitleP className="text-left">Transection History</TitleP>
                </Grid>
                <Grid item xs={11.5} mt={1}>
                  <GreenBorderTextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    style={{ color: colors.becomePartnerGreen }}
                  />
                </Grid>
                <Grid item xs={11.5} mt={2}>
                  <GreenBorderTextField
                    id="outlined-basic"
                    label="Tag Line"
                    variant="outlined"
                    fullWidth
                    style={{ color: colors.becomePartnerGreen }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}
const TitleP = Styled.p`
    font-size: 2rem;
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

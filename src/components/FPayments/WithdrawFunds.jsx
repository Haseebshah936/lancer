import React from "react";
import { Box, Grid, Tab, Tabs, TextField } from "@mui/material";
import Styled from "styled-components";
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
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  defaultValue="Hello World"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;

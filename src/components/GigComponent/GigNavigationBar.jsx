import React from "react";
import { Grid, Box, Button } from "@mui/material";
import colors from "../../utils/colors";
import { useNavigate } from "react-router";

export default function GigNavigationBar({ title, pathName, validate }) {
  const navigate = useNavigate();
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Grid
        item
        xs={11}
        md={6}
        paddingTop={{ xs: "10px", sm: "30px" }}
        paddingBottom={{ xs: "10px", sm: "30px" }}
        style={{
          backgroundColor: colors.becomePartnerGreen,
        }}
        borderRadius="8px"
      >
        <Grid
          container
          display="flex"
          // flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={5} md={5}>
            <h3 style={{ color: colors.white, fontWeight: "bold" }}>{title}</h3>
          </Grid>
          <Grid item xs={7} sm={5} md={4}>
            <h5 style={{ color: colors.white }}>
              Click "Save & continue" to add latest chages made by you.
            </h5>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            md={2}
            display="flex"
            justifyContent="center"
          >
            <button
              type="button"
              class="btn"
              style={{
                backgroundColor: colors.becomePartnerButtonGreen,
                color: colors.white,
                padding: "8px 5px 5px 8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              onClick={() => {
                const v = validate();
                if (v) {
                  console.log("v", v);
                } else {
                  navigate(pathName);
                }
              }}
            >
              Save & Continue
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

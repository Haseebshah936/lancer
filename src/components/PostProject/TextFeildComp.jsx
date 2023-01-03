import React from "react";
import { Grid, TextField, Alert } from "@mui/material";
import colors from "../../utils/colors";

export default function TextFeildComp({ label, placeholder, onChange, error }) {
  return (
    <Grid container display={"flex"} justifyContent="center" my={3}>
      <Grid item xs={11.4}>
        <h4 style={{ fontWeight: "bold" }}>{label}</h4>
      </Grid>
      <Grid item xs={11.4}>
        <TextField
          fullWidth
          id="fullWidth"
          onChange={onChange}
          placeholder={placeholder}
          sx={{
            "& label.Mui-focused": {
              color: colors.textGreen,
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: colors.textGreen,
              },
            },
          }}
        />
        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
    </Grid>
  );
}

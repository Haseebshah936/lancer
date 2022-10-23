import React from "react";
import { Grid, TextField } from "@mui/material";

export default function TextFieldComp({ label, value, onChange, name, error }) {
  return (
    <Grid
      item
      xs={10}
      sm={3.5}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      paddingTop={{ xs: "10px", ms: "10px" }}
      mx="5px"
    >
      <TextField
        fullWidth
        id="fullWidth"
        variant="outlined"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Grid>
  );
}

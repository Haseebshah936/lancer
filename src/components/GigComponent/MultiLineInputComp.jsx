import React from "react";
import { Grid, TextField } from "@mui/material";

export default function MultiLineInputComp({
  label,
  value,
  onChange,
  name,
  error,
}) {
  return (
    <Grid
      item
      xs={10}
      sm={9.2}
      md={8.1}
      lg={8.1}
      xl={8}
      className="d-flex justify-content-center flex-column"
    >
      <TextField
        id="outlined-multiline-static"
        label={label}
        name={name}
        multiline
        rows={4}
        // defaultValue="Default Value"
        className="mt-4"
        value={value}
        onChange={onChange}
        sx={{
          width: "100%",
        }}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Grid>
  );
}

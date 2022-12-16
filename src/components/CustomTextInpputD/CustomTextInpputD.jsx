import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function CustomTextInpputD({
  handleChange,
  value,
  name,
  label,
}) {
  return (
    <Grid item xs={11} sm={10.3} className="d-flex justify-content-center">
      <TextField
        id="outlined-multiline-static"
        fullWidth
        label={label}
        name={name}
        multiline
        rows={4}
        // defaultValue="Default Value"
        className="mt-4"
        value={value}
        onChange={handleChange}
        sx={{}}
      />
    </Grid>
  );
}

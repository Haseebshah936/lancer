import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function CustomTextInpputD({ handleChange, value }) {
  return (
    <Grid item xs={12} className="d-flex justify-content-center">
      <TextField
        id="outlined-multiline-static"
        label="Your Job Discription"
        multiline
        rows={4}
        // defaultValue="Default Value"
        className="mt-4"
        value={value}
        onChange={(e) => {
          handleChange({
            ...value,
            jobDiscription: e.target.value,
          });
        }}
        sx={{
          width: { xs: 270, sm: "99%", md: "99%", lg: "85%" },
        }}
      />
    </Grid>
  );
}

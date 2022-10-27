import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";

export default function GigDropDownInput({
  list,
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
      sm={3.5}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      paddingTop={{ xs: "10px", ms: "10px" }}
      mx="5px"
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={list}
        sx={{ width: "100%" }}
        name={name}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Grid>
  );
}

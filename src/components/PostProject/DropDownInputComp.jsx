import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Alert } from "@mui/material";

export default function DropDownInputComp({
  list,
  label,
  value,
  onChange,
  name,
  error,
  placeholder,
}) {
  const [inputValue, setInputValue] = React.useState([]);

  return (
    <Grid container display="flex" justifyContent={"center"} my={3}>
      <Grid item xs={11.4}>
        <h4 style={{ fontWeight: "bold" }}>{label}</h4>
      </Grid>
      <Grid
        item
        xs={11.4}
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        mx="5px"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          name={name}
          options={list}
          sx={{ width: "100%" }}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
    </Grid>
  );
}

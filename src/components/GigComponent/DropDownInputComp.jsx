import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";
import colors from "../../utils/colors";

export default function GigDropDownInput({
  list,
  label,
  value,
  onChange,
  name,
  error,
}) {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={list}
        sx={{
          width: "100%",
          "& label.Mui-focused": {
            color: colors.textGreen,
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: colors.textGreen,
            },
          },
        }}
        name={name}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
}

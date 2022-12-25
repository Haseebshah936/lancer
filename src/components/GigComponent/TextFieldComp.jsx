import React from "react";
import { TextField } from "@mui/material";
import colors from "../../utils/colors";

export default function TextFieldComp({
  label,
  value,
  onChange,
  name,
  error,
  pattern,
  onFocus,
  type,
  errmsg = "Field is Required",
}) {
  return (
    <>
      <TextField
        sx={{
          "& label.Mui-focused": {
            color: colors.textGreen,
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: colors.textGreen,
            },
          },
          "& 	.MuiFormHelperText-root": {
            fontSize: "1rem",
          },
        }}
        fullWidth={true}
        id="fullWidth"
        variant="outlined"
        error={error === undefined ? false : true}
        helperText={error === undefined ? "" : errmsg}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        inputProps={{ pattern: pattern, onFocus: onFocus, type: type }}
        // pattern={pattern}
      />
    </>
  );
}

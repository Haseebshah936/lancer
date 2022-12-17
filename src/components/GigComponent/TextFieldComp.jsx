import React from "react";
import { Grid, TextField } from "@mui/material";
import colors from "../../utils/colors";

export default function TextFieldComp({ label, value, onChange, name, error }) {
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
        helperText={error === undefined ? "" : "Please Enter Gig Title"}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
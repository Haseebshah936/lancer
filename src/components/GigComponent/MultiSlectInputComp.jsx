import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSlectInputComp({
  list,
  value,
  onChange,
  label,
  error,
}) {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={10}
      sm={3.5}
      marginTop="10px"
      display="flex"
      flexDirection="column"
    >
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {list.map((li) => (
            <MenuItem
              key={li.label}
              value={li.label}
              style={getStyles(li.label, value, theme)}
            >
              {li.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <div className="alert alert-danger">{error}</div>}
    </Grid>
  );
}

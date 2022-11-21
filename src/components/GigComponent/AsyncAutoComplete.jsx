import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import colors from "../../utils/colors";

export default function AsyncAutoComplete({
  gigCategory = null,
  gigSubCategory = null,

  setGigSubCategory,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    console.log(gigCategory);
    (async () => {
      const response = await axios.get(
        `http://localhost:3003/api/category/subCategories/${gigCategory?.id}`
      );
      console.log("Response", response.data);
      if (active) {
        setOptions(response.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, gigCategory]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [gigCategory]);

  return (
    <Autocomplete
      id="asynchronous-demo"
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
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      value={gigSubCategory}
      loading={loading}
      onChange={setGigSubCategory}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Sub Category"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress
                    sx={{ color: colors.textGreen }}
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

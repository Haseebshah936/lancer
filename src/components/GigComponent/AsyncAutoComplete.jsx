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

  additionalFeatures,
  error,
  setAdditionalFeatures,
  setBasicPlan,
  setStandardPlan,
  setPremiumPlan,

  basicPlan,
  standardPlan,
  premiumPlan,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    // console.log(gigCategory);
    (async () => {
      const response = await axios.get(
        `http://localhost:3003/api/category/subCategories/${gigCategory?.id}`
      );
      // console.log("Response", response.data);
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

  const setFeatures = (SubCategory, Category) => {
    const all = [...SubCategory.features, ...Category.features];
    const allAdditional = [
      ...SubCategory.additionalFeatures,
      ...Category.additionalFeatures,
    ];

    // console.log("All additional", allAdditional);

    const newfeatures = all.map((e) => {
      return {
        title: e.title,
        active: false,
        quantity: 0,
      };
    });

    const newfeatures1 = all.map((e) => {
      return {
        title: e.title,
        active: false,
        quantity: 0,
      };
    });

    const newfeatures2 = all.map((e) => {
      return {
        title: e.title,
        active: false,
        quantity: 0,
      };
    });

    const newadditional = allAdditional.map((e) => {
      return {
        title: e.title,
        active: false,
        quantity: 0,
        cost: 0,
        type: e.type,
      };
    });

    // console.log("additional", newadditional);
    setAdditionalFeatures(newadditional);
    setBasicPlan({ ...basicPlan, features: [...newfeatures] });
    setStandardPlan({ ...standardPlan, features: [...newfeatures1] });
    setPremiumPlan({ ...premiumPlan, features: [...newfeatures2] });

    // console.log("basic", basicPlan);
    // console.log("standard", standardPlan);
    // console.log("premium", premiumPlan);
  };

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
      onChange={(e, v) => {
        setGigSubCategory(v);
        // console.log("I am in auto", v);
        setFeatures(v, gigCategory);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            "& 	.MuiFormHelperText-root": {
              fontSize: "1rem",
            },
          }}
          error={error === undefined ? false : true}
          helperText={error === undefined ? "" : "Please Select a Sub Category"}
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

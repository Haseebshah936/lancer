import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

import {
  // gigCategories,
  languageList,
  tagsList,
} from "../../utils/GigDropDownValues";
import { CountryNAME } from "../../utils/Countries";
import { Button, Chip, Paper, TextField, Typography } from "@mui/material";
import colors from "../../utils//colors";
import GigNavigationBar from "./../../components/GigComponent/GigNavigationBar";
import TextFieldComp from "./../../components/GigComponent/TextFieldComp";
import DropDownInputComp from "./../../components/GigComponent/DropDownInputComp";

import MultiLineInputComp from "./../../components/GigComponent/MultiLineInputComp";
import MultiSlectInputComp from "./../../components/GigComponent/MultiSlectInputComp";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AsyncAutoComplete from "../../components/GigComponent/AsyncAutoComplete";

export default function GigServiceIntroduction({
  gigCategories,
  setGigCategories,
  gigSubCategories,
  setGigSubCategories,
  gigIntroduction,
  setGigIntroduction,
}) {
  const location = useLocation();
  const [pathName, setPathName] = React.useState(location.pathname);
  const [value, setValue] = useState("");

  const handleCategories = (CategoryArray) => {
    const Array = CategoryArray.map((c, index) => {
      return {
        value: index.toString(),
        label: c.title,
        id: c._id,
        features: c.features,
        additionalFeatures: c.additionalFeatures,
      };
    });
    setGigCategories(Array);
  };
  const [errors, setErrors] = useState({});
  var schema = {
    gigTitle: Joi.string().required().label("Gig Title"),
    gigCategory: Joi.string().required().label("Gig Category"),
    gigDescription: Joi.string().required().label("Gig Description"),
    language: Joi.string().required().label("Language"),
    tage: Joi.array().items(Joi.string()).min(3).label("Tages"),
    country: Joi.string().required().label("Country"),
    addres: Joi.string().required().label("Address"),
  };

  const validate = () => {
    const result = Joi.validate(gigIntroduction, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return null;
    } else {
      const errors = {};
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrors(errors);
      console.log(errors);
      return errors;
    }
  };

  const [tagsArr, setTagArr] = useState([]);
  const [ctag, setCTag] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/category/categories")
      .then((response) => {
        handleCategories(response.data);
        console.log(gigCategories);
      });
  }, []);

  useEffect(() => {
    setPathName(location.pathname);
    console.log("pathname", `${location.pathname}`);
  }, [location.pathname]);
  useEffect(() => {
    const tagslist = tagsList;
    for (var dat in tagslist) {
      if (Object.keys(tagslist[dat])[0] === gigIntroduction.gigCategory) {
        const name = Object.keys(tagslist[dat])[0];
        setTagArr(tagslist[dat][name]);
      }
    }
    console.log(gigIntroduction);
  }, [gigIntroduction]);
  useEffect(() => {
    const name = Object.keys(tagsList[18])[0];
    setTagArr(tagsList[18][name]);
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2 }}
      >
        <Grid item container mobile={12} justifyContent="flex-start">
          <Typography variant="h4">Service Introduction</Typography>
        </Grid>

        <Grid
          item
          container
          mobile={12}
          justifyContent="flex-start"
          sx={{ mt: 2 }}
        >
          <TextFieldComp
            label="Enter Your Service Title"
            name="serviceTitle"
            value={gigIntroduction.gigTitle}
            error={errors.gigTitle}
            onChange={(e) => {
              setGigIntroduction({
                ...gigIntroduction,
                gigTitle: e.target.value,
              });
            }}
          />
        </Grid>

        <Grid item container mobile={12} sx={{ mt: 2 }}>
          <Grid item container mobile={5.5}>
            <DropDownInputComp
              list={gigCategories}
              label="Select Category"
              name="gigCategory"
              value={gigIntroduction.gigCategory}
              error={errors.gigCategory}
              onChange={(e, value) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  gigCategory: value,
                  gigSubCategory: null,
                });
              }}
            />
          </Grid>
          <Grid item mobile={1}></Grid>
          <Grid item container mobile={5.5}>
            <AsyncAutoComplete
              gigCategory={gigIntroduction.gigCategory}
              gigSubCategory={gigIntroduction.gigSubCategory}
              setGigSubCategory={(subCat) =>
                setGigIntroduction((prev) => {
                  return { ...prev, gigSubCategory: subCat };
                })
              }
            />
          </Grid>
        </Grid>
        <Grid item container sx={{ mt: 2 }} mobile={12}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "150px",
            }}
          />
        </Grid>
        <Grid item container sx={{ mt: 2 }} mobile={12}>
          <Grid item container mobile={5.5}>
            <MultiSlectInputComp
              list={tagsArr}
              name="Tags"
              label="Select Tags"
              value={gigIntroduction.tage}
              error={errors.tage}
              onChange={(e) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  tage: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item container mobile={1}></Grid>

          <Grid item container mobile={4.5}>
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
              }}
              value={ctag}
              onChange={(e) => {
                setCTag(e.target.value);
              }}
              fullWidth
              id="outlined-basic"
              label="Enter Custom Tag"
              variant="outlined"
            />
            {errors.tage && (
              <div className="alert alert-danger">{errors.tage}</div>
            )}
          </Grid>
          <Grid item container mobile={1}>
            <Button
              sx={{ ml: 1 }}
              fullWidth
              variant="contained"
              style={{ backgroundColor: colors.textGreen }}
              onClick={() => {
                setGigIntroduction({
                  ...gigIntroduction,
                  tage: [...gigIntroduction.tage, ctag],
                });
                setCTag("");
              }}
            >
              Add
            </Button>
          </Grid>
          <Grid
            item
            container
            mobile={12}
            sx={{ mt: gigIntroduction.tage.length === 0 ? 0 : 2 }}
          >
            {gigIntroduction.tage.length !== 0 && (
              <Paper
                elevation={1}
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  listStyle: "none",
                  backgroundColor: colors.white,
                  borderColor: colors.white,
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {gigIntroduction.tage.map((tag) => (
                  <>
                    <Chip
                      sx={{
                        color: colors.textGreen,
                        borderColor: colors.textGreen,
                        mr: 1,
                        mb: 1,
                        "&	.MuiChip-deleteIcon": {
                          color: colors.textGreen,
                        },
                      }}
                      label={tag}
                      variant="outlined"
                      onDelete={() => {
                        setGigIntroduction({
                          ...gigIntroduction,
                          tage: gigIntroduction.tage.filter((t) => t !== tag),
                        });
                      }}
                    />
                  </>
                ))}
              </Paper>
            )}
          </Grid>

          <Grid item container mobile={12} sx={{ mt: 2 }}>
            <Grid item container mobile={5.5}>
              <DropDownInputComp
                list={languageList}
                name="language"
                label="Choose Language"
                error={errors.language}
                value={gigIntroduction.language}
                onChange={(e, value) => {
                  setGigIntroduction({
                    ...gigIntroduction,
                    language: value.label,
                  });
                }}
              />
            </Grid>
            <Grid item mobile={1}></Grid>
            <Grid item container mobile={5.5}>
              <DropDownInputComp
                list={CountryNAME}
                name="Countries"
                label="Select Country"
                value={gigIntroduction.country}
                error={errors.country}
                onChange={(e, value) => {
                  setGigIntroduction({
                    ...gigIntroduction,
                    country: value.label,
                  });
                }}
              />
            </Grid>
          </Grid>
          <Grid item container mobile={12} sx={{ mt: 2 }}>
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
              }}
              fullWidth
              width="100%"
              id="outlined-basic"
              label="Enter Your Address"
              value={gigIntroduction.addres}
              onChange={(e) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  addres: e.target.value,
                });
              }}
              variant="outlined"
            />
            {errors.addres && (
              <div className="alert alert-danger">{errors.addres}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { tagsList } from "../../utils/GigDropDownValues";
import { Button, Chip, Paper, TextField, Typography } from "@mui/material";
import colors from "../../utils//colors";
import TextFieldComp from "./../../components/GigComponent/TextFieldComp";
import DropDownInputComp from "./../../components/GigComponent/DropDownInputComp";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AsyncAutoComplete from "../../components/GigComponent/AsyncAutoComplete";

export default function GigServiceIntroduction({
  gigCategories,
  setGigCategories,
  gigIntroduction,
  setGigIntroduction,
  errors,
  additionalFeatures,
  setAdditionalFeatures,
  setBasicPlan,
  setStandardPlan,
  setPremiumPlan,

  basicPlan,
  standardPlan,
  premiumPlan,
}) {
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

  const [tagsArr, setTagArr] = useState([]);
  const [ctag, setCTag] = useState("");
  const [CatObject, setCatObject] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/category/categories")
      .then((response) => {
        handleCategories(response.data);
        console.log(gigCategories);
      });
  }, []);

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
          <Grid item container laptop={5.5} mobile={12}>
            <DropDownInputComp
              list={gigCategories}
              label="Select Category"
              name="gigCategory"
              value={gigIntroduction.gigCategory}
              error={errors.gigCategory}
              onChange={(e, value) => {
                setCatObject(value);
                setGigIntroduction({
                  ...gigIntroduction,
                  gigCategory: value,
                  gigSubCategory: null,
                });
              }}
            />
          </Grid>
          <Grid item laptop={1} mobile={0}></Grid>
          <Grid
            item
            container
            laptop={5.5}
            mobile={12}
            sx={{ mt: { mobile: 2, laptop: 0 } }}
          >
            <AsyncAutoComplete
              error={errors.gigSubCategory}
              setBasicPlan={setBasicPlan}
              setStandardPlan={setStandardPlan}
              setPremiumPlan={setPremiumPlan}
              additionalFeatures={additionalFeatures}
              setAdditionalFeatures={setAdditionalFeatures}
              basicPlan={basicPlan}
              standardPlan={standardPlan}
              premiumPlan={premiumPlan}
              gigCategory={gigIntroduction.gigCategory}
              gigSubCategory={gigIntroduction.gigSubCategory}
              setGigSubCategory={(subCat) => {
                // console.log("Subcategory", CatObject);
                setGigIntroduction((prev) => {
                  return { ...prev, gigSubCategory: subCat };
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid item container sx={{ mt: 2 }} mobile={12}>
          <ReactQuill
            theme="snow"
            value={gigIntroduction.gigDescription}
            onChange={(e) => {
              setGigIntroduction({
                ...gigIntroduction,
                gigDescription: e,
              });
              console.log("Gig Description", gigIntroduction.gigDescription);
            }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "150px",
            }}
          />
          {errors.gigDescription && (
            <div className="alert alert-danger">
              {"Please Enter Gig Description"}
            </div>
          )}
        </Grid>
        <Grid item container sx={{ mt: 2 }} mobile={12}>
          <Grid item container mobile={10}>
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
              value={ctag}
              error={errors.tage === undefined ? false : true}
              helperText={
                errors.tage === undefined ? "" : "Please Add at least 3 tags"
              }
              onChange={(e) => {
                setCTag(e.target.value);
              }}
              fullWidth
              id="outlined-basic"
              label="Enter Custom Tag"
              variant="outlined"
            />
          </Grid>
          <Grid item container mobile={2}>
            <Button
              sx={{ my: 0, mr: 0, ml: 1, minWidth: "0px" }}
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
      </Grid>
    </>
  );
}

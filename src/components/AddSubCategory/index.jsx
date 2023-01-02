import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";
import CustomIconButton from "../CustomIconButton";
import TextFieldComp from "../GigComponent/TextFieldComp";
import DropDownInputComp from "../GigComponent/DropDownInputComp";
import FeatureCard from "../AddCategory/FeatureCard";

export default function AddSubCategory() {
  const [subCategory, setSubCategory] = useState({
    title: "",
    category: "",
    features: [],
    additionalFeatures: [],
  });

  const [feature, setFeature] = useState({ title: "", type: "" });
  const [additionalFeature, setAdditionalFeature] = useState({
    title: "",
    type: "",
  });
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState({ title: "" });

  const handleDeleteFeature = (title) => {
    setSubCategory({
      ...subCategory,
      features: subCategory.features.filter((t) => t.title !== title),
    });
  };

  const handleDeleteAdditional = (title) => {
    setSubCategory({
      ...subCategory,
      additionalFeatures: subCategory.additionalFeatures.filter(
        (t) => t.title !== title
      ),
    });
  };

  const createSubCategory = async () => {
    const response = await requestMethod.post(
      "category/createSubCategory",
      subCategory
    );
    return response.data;
  };

  useEffect(() => {
    console.log(subCategory);
  }, [subCategory]);

  const handleCategories = (CategoryArray) => {
    const Array = CategoryArray.map((c, index) => {
      return {
        value: c._id,
        label: c.title,
      };
    });
    setCategories(Array);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/category/categories")
      .then((response) => {
        handleCategories(response.data);
        // console.log(gigCategories);
      });
  }, []);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mx: 1 }}
          mobile={12}
        >
          <Grid item>
            <Typography variant="h3">Add New SubCategory</Typography>
          </Grid>

          <Grid container mobile={12} sx={{ mt: 2 }}>
            <Grid item laptop={5.5} mobile={12}>
              <TextFieldComp
                label="Enter SubCategory Name"
                name="title"
                value={subCategory.title}
                // error={errors.gigTitle}
                // errmsg="Service Title is Required"
                onChange={(e) => {
                  setSubCategory({
                    ...subCategory,
                    title: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item laptop={1} mobile={0}></Grid>
            <Grid
              item
              laptop={5.5}
              mobile={12}
              sx={{ mt: { mobile: 2, laptop: 0 } }}
            >
              <DropDownInputComp
                list={categories}
                label="Select Category"
                name="category"
                value={category.title}
                // error={errors.gigCategory}
                onChange={(e, value) => {
                  console.log("Value", value);
                  setCategory({ title: value.label });
                  setSubCategory({
                    ...subCategory,
                    category: value.value,
                  });
                }}
              />
            </Grid>
          </Grid>

          <Grid container mobile={12} sx={{ mt: 2 }} alignItems="center">
            <Grid item laptop={4} desktop={3}>
              <TextFieldComp
                label="Enter Feature Name"
                name="title"
                value={feature.title}
                // error={errors.gigTitle}
                // errmsg="Service Title is Required"
                onChange={(e) => {
                  setFeature({
                    ...feature,
                    title: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item mobile={1} laptop={1} desktop={0.5}></Grid>

            <Grid item laptop={2.5} desktop={2}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <RadioHeading>Feature Type</RadioHeading>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setFeature({
                      ...feature,
                      type: e.target.value,
                    });
                  }}
                >
                  <FormControlLabel
                    value=""
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Simple"
                  />
                  <FormControlLabel
                    value="quantity"
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Quantity Based"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item mobile={1} laptop={0.5} desktop={0.5}></Grid>
            <Grid
              item
              sx={{ mt: { mobile: 2, tablet: 0 } }}
              mobile={12}
              tablet={2}
              laptop={2}
              desktop={1}
            >
              <Button
                sx={{ my: 0, mx: 0, minWidth: "0px" }}
                fullWidth
                variant="contained"
                style={{ backgroundColor: colors.textGreen }}
                onClick={() => {
                  setSubCategory({
                    ...subCategory,
                    features: [...subCategory.features, feature],
                  });
                  setFeature({ title: "", type: "" });
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
            sx={{ mt: subCategory.features.length === 0 ? 0 : 2 }}
          >
            {subCategory.features.length !== 0 && (
              <Paper
                elevation={1}
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",

                  backgroundColor: colors.white,
                  borderColor: colors.white,
                  p: 0.5,
                  m: 0,
                }}
              >
                {subCategory.features.map((item, i) => (
                  <>
                    <FeatureCard
                      key={i}
                      name={item.title}
                      type={item.type}
                      handleDelete={handleDeleteFeature}
                    />
                  </>
                ))}
              </Paper>
            )}
          </Grid>

          <Grid item container mobile={12} sx={{ mt: 2 }} alignItems="center">
            <Grid item mobile={12} tablet={5} laptop={4} desktop={3}>
              <TextFieldComp
                label="Enter Additional Feature Name"
                name="name"
                value={additionalFeature.title}
                // error={errors.gigTitle}
                // errmsg="Service Title is Required"
                onChange={(e) => {
                  setAdditionalFeature({
                    ...additionalFeature,
                    title: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item mobile={1} desktop={0.5}></Grid>

            <Grid
              item
              laptop={4}
              desktop={3}
              sx={{ mt: { mobile: 2, tablet: 0 } }}
            >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <RadioHeading>Feature Type</RadioHeading>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setAdditionalFeature({
                      ...additionalFeature,
                      type: e.target.value,
                    });
                  }}
                >
                  <FormControlLabel
                    value=""
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Simple"
                  />
                  <FormControlLabel
                    value="quantity"
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Quantity Based"
                  />

                  <FormControlLabel
                    value="timeAndQuantity"
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Quantity&Time Based"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item mobile={1} laptop={0.5} desktop={0.5}></Grid>
            <Grid
              item
              sx={{ mt: { mobile: 2, laptop: 0 } }}
              mobile={12}
              laptop={2}
              desktop={1}
            >
              <Button
                sx={{ my: 0, mx: 0, minWidth: "0px" }}
                fullWidth
                variant="contained"
                style={{ backgroundColor: colors.textGreen }}
                onClick={() => {
                  setSubCategory({
                    ...subCategory,
                    additionalFeatures: [
                      ...subCategory.additionalFeatures,
                      additionalFeature,
                    ],
                  });
                  setAdditionalFeature({ title: "", type: "" });
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
            sx={{ mt: subCategory.additionalFeatures.length === 0 ? 0 : 2 }}
          >
            {subCategory.additionalFeatures.length !== 0 && (
              <Paper
                elevation={1}
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",

                  backgroundColor: colors.white,
                  borderColor: colors.white,
                  p: 0.5,
                  m: 0,
                }}
              >
                {subCategory.additionalFeatures.map((item, i) => (
                  <>
                    <FeatureCard
                      key={i}
                      name={item.title}
                      type={item.type}
                      handleDelete={handleDeleteAdditional}
                    />
                  </>
                ))}
              </Paper>
            )}
          </Grid>

          <Grid item mobile={12} sx={{ mt: 2 }}>
            <CustomIconButton
              style={{
                fontSize: "1.3rem",
              }}
              text={`Submit`}
              onClick={() => {
                createSubCategory().then((data) => {
                  console.log("Data", data);
                  toast.success("Category Created Successfully");
                  setSubCategory({
                    title: "",
                    category: "",
                    features: [],
                    additionalFeatures: [],
                  });
                  setFeature({ title: "", type: "" });
                  setAdditionalFeature({ title: "", type: "" });
                  setCategory({ title: "" });
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const RadioHeading = styled(Typography)({
  color: colors.black,
  fontWeight: "400",
  fontSize: "1.5rem",
});

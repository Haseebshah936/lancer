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
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";
import CustomIconButton from "../CustomIconButton";
import TextFieldComp from "../GigComponent/TextFieldComp";
import FeatureCard from "./FeatureCard";

export default function AddCategory() {
  const [category, setCategory] = useState({
    title: "",
    features: [],
    additionalFeatures: [],
  });

  const [feature, setFeature] = useState({ title: "", type: "" });
  const [additionalFeature, setAdditionalFeature] = useState({
    title: "",
    type: "",
  });

  const handleDeleteFeature = (title) => {
    setCategory({
      ...category,
      features: category.features.filter((t) => t.title !== title),
    });
  };

  const handleDeleteAdditional = (title) => {
    setCategory({
      ...category,
      additionalFeatures: category.additionalFeatures.filter(
        (t) => t.title !== title
      ),
    });
  };

  const createCategory = async () => {
    const response = await requestMethod.post(
      "category/createCategory",
      category
    );
    return response.data;
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

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
            <Typography variant="h3">Add New Category</Typography>
          </Grid>

          <Grid item mobile={12} sx={{ mt: 2 }}>
            <TextFieldComp
              label="Enter Category Name"
              name="title"
              value={category.title}
              // error={errors.gigTitle}
              // errmsg="Service Title is Required"
              onChange={(e) => {
                setCategory({
                  ...category,
                  title: e.target.value,
                });
              }}
            />
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
                  setCategory({
                    ...category,
                    features: [...category.features, feature],
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
            sx={{ mt: category.features.length === 0 ? 0 : 2 }}
          >
            {category.features.length !== 0 && (
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
                {category.features.map((item, i) => (
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

          <Grid container mobile={12} sx={{ mt: 2 }} alignItems="center">
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
                  setCategory({
                    ...category,
                    additionalFeatures: [
                      ...category.additionalFeatures,
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
            sx={{ mt: category.additionalFeatures.length === 0 ? 0 : 2 }}
          >
            {category.additionalFeatures.length !== 0 && (
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
                {category.additionalFeatures.map((item, i) => (
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
                createCategory().then((data) => {
                  console.log("Data", data);
                  toast.success("Category Created Successfully");
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

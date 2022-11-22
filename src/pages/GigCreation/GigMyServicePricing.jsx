import {
  Grid,
  Box,
  TextField,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Joi from "joi-browser";
import React from "react";
import Footer from "../../components/Footer";
import GigNavigationBar from "../../components/GigComponent/GigNavigationBar";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import Header from "../../components/Header";

import { numebers } from "../../utils/GigDropDownValues";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
import styled from "styled-components";
import colors from "../../utils/colors";
import { AttachMoneyOutlined } from "@mui/icons-material";
const TitleBox = ({ heading }) => {
  return (
    <Box
      height="53px"
      className="border-bottom"
      display={"flex"}
      alignItems="center"
      paddingLeft={{ xs: "10px", sm: "20px" }}
    >
      <h4>{heading}</h4>
    </Box>
  );
};
const GigDiscription = ({ value, onChange, styles }) => {
  return (
    <CustomTextArea
      fullWidth
      id="outlined-multiline-static"
      placeholder="Enter Description"
      value={value}
      onChange={onChange}
      style={{ ...styles, padding: "1rem 0.5rem" }}
    />
  );
};
const InputField = ({
  label,
  onChange,
  value,
  styles,
  type,
  placeholder,
  name,
}) => {
  return (
    <CustomInput
      type={type}
      fullWidth
      placeholder={placeholder}
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      style={{ ...styles, padding: "1rem 0.5rem" }}
    />
  );
};
const CheckBox = ({ onChange, checked, label, error }) => {
  return (
    <Checkbox
      disableRipple
      checked={checked}
      onChange={onChange}
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: "2rem",
        },
        color: colors.textGreen,
        "&.Mui-checked": {
          color: colors.textGreen,
        },
      }}
    />
  );
};

const DropDownComp = ({ list, label, value, onChange, error }) => {
  return (
    <FormControl fullWidth sx={{ height: "40px" }} size="small">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
        style={{ backgroundColor: error ? "#ffdadb" : "white" }}
      >
        {list.map((item) => (
          <MenuItem value={item.value}>{item.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default function GigMyServicePricing({
  Category,
  SubCategory,

  setBasicPlan,
  setStandardPlan,
  setPremiumPlan,

  basicPlan,
  standardPlan,
  premiumPlan,
  basicPlanError,
  standardPlanError,
  premiumPlanError,
}) {
  return (
    <>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          mobile={12}
          sx={{ py: 2 }}
        >
          <Typography variant="h4">My Service Pricing</Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>
            Enter All the details related to your gig pricing and the services.
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="border">
        <Grid
          item
          container
          mobile={3}
          className="border"
          sx={{ backgroundColor: "#F5F5F5" }}
        ></Grid>
        <Grid
          item
          container
          mobile={3}
          className="border"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            className="border-bottom"
            sx={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              justifyContent: "center",
              alignItems: " center",
              display: "flex",
            }}
          >
            <Typography variant="h5" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
              BASIC
            </Typography>
          </Box>
          <Box className="border-bottom" sx={{ width: "100%" }}>
            <Box className="border-bottom">
              <InputField
                placeholder="Enter Title"
                styles={{
                  backgroundColor: basicPlanError.title ? "#ffdadb" : "white",
                  mb: 1,
                  paddingInline: "",
                }}
                label="BasicPlanTitle"
                value={basicPlan.title}
                onChange={(e) => {
                  setBasicPlan({ ...basicPlan, title: e.target.value });
                  console.log("Basic Plan log");
                }}
              />
            </Box>

            <GigDiscription
              styles={{
                backgroundColor: basicPlanError.description
                  ? "#ffdadb"
                  : "white",
                mb: 1,
              }}
              value={basicPlan.description}
              error={basicPlanError.description}
              onChange={(e) => {
                setBasicPlan({ ...basicPlan, description: e.target.value });
                console.log("Basic Plan log");
              }}
            />
          </Box>

          <Box sx={{ width: "100%", mt: 1 }}>
            <InputField
              styles={{ width: "100%" }}
              placeholder="Delivery Days"
              type="number"
              error={basicPlanError.deliveryTime}
              value={basicPlan.deliveryTime}
              onChange={(e) => {
                setBasicPlan({
                  ...basicPlan,
                  deliveryTime: e.target.value,
                });
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          container
          mobile={3}
          className="border"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            className="border-bottom"
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: " center",
              backgroundColor: "#F5F5F5",
              display: "flex",
            }}
          >
            <Typography variant="h5" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
              STANDARD
            </Typography>
          </Box>
          <Box className="border-bottom" sx={{ width: "100%" }}>
            <Box className="border-bottom">
              <InputField
                placeholder="Enter Title"
                styles={{
                  backgroundColor: standardPlanError.title
                    ? "#ffdadb"
                    : "white",
                  mb: 1,
                  paddingInline: "",
                }}
                label="Package Title"
                value={standardPlan.title}
                onChange={(e) => {
                  setStandardPlan({ ...standardPlan, title: e.target.value });
                }}
              />
            </Box>

            <GigDiscription
              styles={{
                backgroundColor: standardPlanError.description
                  ? "#ffdadb"
                  : "white",
                mb: 1,
              }}
              value={standardPlan.description}
              error={standardPlanError.description}
              onChange={(e) => {
                setStandardPlan({
                  ...standardPlan,
                  description: e.target.value,
                });
              }}
            />
          </Box>

          <Box sx={{ width: "100%", mt: 1 }}>
            <InputField
              styles={{ width: "100%" }}
              placeholder="Delivery Days"
              type="number"
              error={standardPlanError.deliveryTime}
              value={standardPlan.deliveryTime}
              onChange={(e) => {
                setStandardPlan({
                  ...standardPlan,
                  deliveryTime: e.target.value,
                });
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          container
          mobile={3}
          className="border"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            className="border-bottom"
            sx={{
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#F5F5F5",
              alignItems: " center",
              display: "flex",
            }}
          >
            <Typography variant="h5" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
              PREMIUM
            </Typography>
          </Box>
          <Box className="border-bottom" sx={{ width: "100%" }}>
            <Box className="border-bottom">
              <InputField
                placeholder="Enter Title"
                styles={{
                  backgroundColor: premiumPlanError.title ? "#ffdadb" : "white",
                  mb: 1,
                  paddingInline: "",
                }}
                label="Package Title"
                value={premiumPlan.title}
                onChange={(e) => {
                  setPremiumPlan({ ...premiumPlan, title: e.target.value });
                }}
              />
            </Box>

            <GigDiscription
              styles={{
                backgroundColor: premiumPlanError.description
                  ? "#ffdadb"
                  : "white",
                mb: 1,
              }}
              value={premiumPlan.description}
              error={premiumPlanError.description}
              onChange={(e) => {
                setPremiumPlan({ ...premiumPlan, description: e.target.value });
              }}
            />
          </Box>

          <Box sx={{ width: "100%", mt: 1 }}>
            <InputField
              styles={{ width: "100%" }}
              placeholder="Delivery Days"
              type="number"
              error={premiumPlanError.deliveryTime}
              value={premiumPlan.deliveryTime}
              onChange={(e) => {
                setPremiumPlan({
                  ...premiumPlan,
                  deliveryTime: e.target.value,
                });
              }}
            />
          </Box>
        </Grid>

        {Category.features.map((feature) => {
          return (
            <>
              <Grid container mobile={12} sx={{ height: "50px" }}>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="flex-start"
                  mobile={3}
                  className="border"
                  sx={{ backgroundColor: "#F5F5F5" }}
                >
                  <Typography variant="h6" sx={{ pl: 1 }}>
                    {feature.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  mobile={3}
                  className="border border-bottom border-end"
                >
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setBasicPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  mobile={3}
                  className="border border-bottom border-end"
                >
                  {" "}
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  mobile={3}
                  className="border border-top border-bottom"
                >
                  {" "}
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          );
        })}

        {SubCategory.features.map((feature) => {
          return (
            <>
              <Grid
                container
                mobile={12}
                sx={{ height: "50px" }}
                // alignItems="center"
                // justifyContent="center"
              >
                <Grid
                  item
                  container
                  mobile={3}
                  className="border"
                  alignItems="center"
                  justifyContent="flex-start"
                  sx={{ backgroundColor: "#F5F5F5" }}
                >
                  <Typography variant="h6" sx={{ pl: 1 }}>
                    {feature.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  mobile={3}
                  className="border border-end border-bottom"
                >
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  mobile={3}
                  className="border border-end border-bottom"
                >
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  mobile={3}
                  className="border border-top border-bottom"
                >
                  {" "}
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          );
        })}

        <Grid container mobile={12} sx={{ height: "50px" }}>
          <Grid
            item
            container
            mobile={3}
            className="border"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ backgroundColor: "#F5F5F5" }}
          >
            <Typography variant="h6" sx={{ pl: 1 }}>
              Revisions
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            mobile={3}
            className="border border-end border-bottom"
          >
            <InputField
              styles={{ width: "100%" }}
              placeholder="Enter number of revisions"
              type="number"
              error={standardPlanError.deliveryTime}
              value={standardPlan.deliveryTime}
              onChange={(e) => {
                setStandardPlan({
                  ...standardPlan,
                  deliveryTime: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            mobile={3}
            className="border border-end border-bottom"
          >
            <InputField
              styles={{ width: "100%" }}
              placeholder="Enter number of revisions"
              type="number"
              error={standardPlanError.deliveryTime}
              value={standardPlan.deliveryTime}
              onChange={(e) => {
                setStandardPlan({
                  ...standardPlan,
                  deliveryTime: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            mobile={3}
            className="border border-top border-bottom"
          >
            <InputField
              styles={{ width: "100%" }}
              placeholder="Enter number of revisions"
              type="number"
              error={standardPlanError.deliveryTime}
              value={standardPlan.deliveryTime}
              onChange={(e) => {
                setStandardPlan({
                  ...standardPlan,
                  deliveryTime: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>

        <Grid container mobile={12} sx={{ height: "50px" }}>
          <Grid
            item
            container
            mobile={3}
            className="border"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ backgroundColor: "#F5F5F5" }}
          >
            <Typography variant="h6" sx={{ pl: 1 }}>
              Price
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            mobile={3}
            className="border border-end border-bottom"
          >
            <Grid item container direction="row" alignItems="center">
              <InputField
                styles={{ width: "90%" }}
                placeholder="Enter Price"
                type="number"
                error={standardPlanError.deliveryTime}
                value={standardPlan.deliveryTime}
                onChange={(e) => {
                  setStandardPlan({
                    ...standardPlan,
                    deliveryTime: e.target.value,
                  });
                }}
              />
              <AttachMoneyOutlined
                sx={{
                  color: colors.textGreen,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            mobile={3}
            className="border border-end border-bottom"
          >
            <Grid item container direction="row" alignItems="center">
              <InputField
                styles={{ width: "90%" }}
                placeholder="Enter Price"
                type="number"
                error={standardPlanError.deliveryTime}
                value={standardPlan.deliveryTime}
                onChange={(e) => {
                  setStandardPlan({
                    ...standardPlan,
                    deliveryTime: e.target.value,
                  });
                }}
              />
              <AttachMoneyOutlined
                sx={{
                  color: colors.textGreen,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            mobile={3}
            className="border border-top border-bottom"
          >
            <Grid item container direction="row" alignItems="center">
              <InputField
                styles={{ width: "90%" }}
                placeholder="Enter Price"
                type="number"
                error={standardPlanError.deliveryTime}
                value={standardPlan.deliveryTime}
                onChange={(e) => {
                  setStandardPlan({
                    ...standardPlan,
                    deliveryTime: e.target.value,
                  });
                }}
              />
              <AttachMoneyOutlined
                sx={{
                  color: colors.textGreen,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          container
          mobile={12}
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ my: 2 }}
        >
          <Typography variant="h4">Add extra services</Typography>
        </Grid>
        {Category.additionalFeatures.map((feature) => {
          return (
            <>
              <Grid
                container
                mobile={12}
                className="border"
                sx={{ height: "50px" }}
              >
                <Grid
                  item
                  container
                  mobile={9}
                  justifyContent="flex-start"
                  alignItems="center"
                  className="border-End"
                >
                  <CheckBox
                    label="Source File"
                    checked={basicPlan.sourceFile}
                    error={basicPlanError.sourceFile}
                    onChange={(e) => {
                      setBasicPlan({
                        ...basicPlan,
                        sourceFile: e.target.checked,
                      });
                    }}
                  />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      error={standardPlanError.deliveryTime}
                      value={standardPlan.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          );
        })}
        {SubCategory.additionalFeatures.map((feature) => {
          return (
            <>
              <Grid container mobile={12} className="border">
                <Grid item container mobile={3}>
                  {feature.title}
                </Grid>
                <Grid
                  item
                  container
                  mobile={9}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  {feature.quantityBased && (
                    <DropDownComp
                      list={numebers}
                      label="Select"
                      value={standardPlan.deliveryTime}
                      error={standardPlanError.deliveryTime}
                      onChange={(e) => {
                        setStandardPlan({
                          ...standardPlan,
                          deliveryTime: e.target.value,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      label="Source File"
                      checked={basicPlan.sourceFile}
                      error={basicPlanError.sourceFile}
                      onChange={(e) => {
                        setBasicPlan({
                          ...basicPlan,
                          sourceFile: e.target.checked,
                        });
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

const CustomTextArea = styled.textarea`
  height: 60px;
  outline: none;
  border: 0px;
`;

const CustomInput = styled.input`
  outline: none;
  border: 0px;
`;

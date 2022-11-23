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
import { useEffect, useState } from "react";
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
  id,
  name,
}) => {
  return (
    <CustomInput
      id={id}
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

  additionalFeatures,
  setAdditionalFeatures,
}) {
  useEffect(() => {
    const all = [...SubCategory.features, ...Category.features];
    const allAdditional = [
      ...SubCategory.additionalFeatures,
      ...Category.additionalFeatures,
    ];

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
      };
    });

    console.log("additional", newadditional);
    setAdditionalFeatures(newadditional);
    setBasicPlan({ ...basicPlan, features: [...newfeatures] });
    setStandardPlan({ ...standardPlan, features: [...newfeatures1] });
    setPremiumPlan({ ...premiumPlan, features: [...newfeatures2] });
  }, []);

  useEffect(() => {
    console.log("Basic", basicPlan);
    console.log("Premium", premiumPlan);
    console.log("Standard", standardPlan);
  }, [basicPlan, premiumPlan, standardPlan]);

  useEffect(() => {
    console.log("additionalFeatures", additionalFeatures);
  }, [additionalFeatures]);

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
                  backgroundColor: basicPlanError.name ? "#ffdadb" : "white",
                  mb: 1,
                  paddingInline: "",
                }}
                label="BasicPlanTitle"
                value={basicPlan.name}
                onChange={(e) => {
                  setBasicPlan({ ...basicPlan, name: e.target.value });
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

          <Box
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <InputField
              styles={{
                width: "100%",
                backgroundColor: basicPlanError.delivery ? "#ffdadb" : "white",
              }}
              placeholder="Delivery Days"
              type="number"
              value={basicPlan.delivery}
              onChange={(e) => {
                setBasicPlan({
                  ...basicPlan,
                  delivery: e.target.value,
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
                  backgroundColor: standardPlanError.name ? "#ffdadb" : "white",
                  mb: 1,
                  paddingInline: "",
                }}
                label="Package Title"
                value={standardPlan.name}
                onChange={(e) => {
                  setStandardPlan({ ...standardPlan, name: e.target.value });
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
              styles={{
                width: "100%",
                backgroundColor: standardPlanError.delivery
                  ? "#ffdadb"
                  : "white",
              }}
              placeholder="Delivery Days"
              type="number"
              value={standardPlan.delivery}
              onChange={(e) => {
                setStandardPlan({
                  ...standardPlan,
                  delivery: e.target.value,
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
                  backgroundColor: premiumPlanError.name ? "#ffdadb" : "white",
                  mb: 1,
                  paddingInline: "",
                }}
                label="Package Title"
                value={premiumPlan.name}
                onChange={(e) => {
                  setPremiumPlan({ ...premiumPlan, name: e.target.value });
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
              styles={{
                width: "100%",
                backgroundColor: premiumPlanError.delivery
                  ? "#ffdadb"
                  : "white",
              }}
              placeholder="Delivery Days"
              type="number"
              value={premiumPlan.delivery}
              onChange={(e) => {
                setPremiumPlan({
                  ...premiumPlan,
                  delivery: e.target.value,
                });
              }}
            />
          </Box>
        </Grid>
        {Category.features.map((feature, i) => {
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
                      name={feature.title}
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      onChange={(e) => {
                        const hold = [...basicPlan.features];
                        hold[i + SubCategory.features.length].quantity =
                          e.target.value;
                        hold[i + SubCategory.features.length].active = true;
                        setBasicPlan({
                          ...basicPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      onChange={(e) => {
                        const hold = [...basicPlan.features];
                        hold[i + SubCategory.features.length].active =
                          e.target.checked;
                        setBasicPlan({
                          ...basicPlan,
                          features: hold,
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
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      onChange={(e) => {
                        const hold = [...standardPlan.features];
                        hold[i + SubCategory.features.length].quantity =
                          e.target.value;
                        hold[i + SubCategory.features.length].active = true;
                        setStandardPlan({
                          ...standardPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      onChange={(e) => {
                        const hold = [...standardPlan.features];
                        hold[i + SubCategory.features.length].active =
                          e.target.checked;
                        setStandardPlan({
                          ...standardPlan,
                          features: hold,
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
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      onChange={(e) => {
                        const hold = [...premiumPlan.features];
                        hold[i + SubCategory.features.length].quantity =
                          e.target.value;
                        hold[i + SubCategory.features.length].active = true;
                        setPremiumPlan({
                          ...premiumPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      onChange={(e) => {
                        const hold = [...premiumPlan.features];
                        hold[i + SubCategory.features.length].active =
                          e.target.checked;
                        setPremiumPlan({
                          ...premiumPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          );
        })}
        {SubCategory.features.map((feature, i) => {
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
                      onChange={(e) => {
                        const hold = [...basicPlan.features];
                        hold[i].quantity = e.target.value;
                        hold[i].active = true;
                        setBasicPlan({
                          ...basicPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      onChange={(e) => {
                        const hold = [...basicPlan.features];
                        hold[i].active = e.target.checked;
                        setBasicPlan({
                          ...basicPlan,
                          features: hold,
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
                      onChange={(e) => {
                        const hold = [...standardPlan.features];
                        hold[i].quantity = e.target.value;
                        hold[i].active = true;
                        setStandardPlan({
                          ...standardPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      onChange={(e) => {
                        const hold = [...standardPlan.features];
                        hold[i].active = e.target.checked;
                        setStandardPlan({
                          ...standardPlan,
                          features: hold,
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
                  {feature.quantityBased && (
                    <InputField
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      onChange={(e) => {
                        const hold = [...premiumPlan.features];
                        hold[i].quantity = e.target.value;
                        hold[i].active = true;
                        setPremiumPlan({
                          ...premiumPlan,
                          features: hold,
                        });
                      }}
                    />
                  )}
                  {feature.quantityBased === false && (
                    <CheckBox
                      onChange={(e) => {
                        const hold = [...premiumPlan.features];
                        hold[i].active = e.target.checked;
                        setPremiumPlan({
                          ...premiumPlan,
                          features: hold,
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
                styles={{
                  width: "90%",
                  backgroundColor: basicPlanError.cost ? "#ffdadb" : "white",
                }}
                placeholder="Enter Price"
                type="number"
                value={basicPlan.cost}
                onChange={(e) => {
                  setBasicPlan({
                    ...basicPlan,
                    cost: e.target.value,
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
                styles={{
                  width: "90%",
                  backgroundColor: basicPlanError.cost ? "#ffdadb" : "white",
                }}
                placeholder="Enter Price"
                type="number"
                error={standardPlanError.cost}
                value={standardPlan.cost}
                onChange={(e) => {
                  setStandardPlan({
                    ...standardPlan,
                    cost: e.target.value,
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
                styles={{
                  width: "90%",
                  backgroundColor: basicPlanError.cost ? "#ffdadb" : "white",
                }}
                placeholder="Enter Price"
                type="number"
                error={premiumPlanError.cost}
                value={premiumPlan.cost}
                onChange={(e) => {
                  setPremiumPlan({
                    ...premiumPlan,
                    cost: e.target.value,
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
        {Category.additionalFeatures.map((feature, i) => {
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
                  direction="row"
                >
                  <CheckBox
                    onChange={(e) => {
                      const hold = [...additionalFeatures];
                      hold[i].active = e.target.checked;

                      setAdditionalFeatures(hold);
                      console.log("Additional features ", additionalFeatures);
                    }}
                  />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                  {feature.quantityBased && (
                    <InputField
                      styles={{ marginLeft: "10px" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      onChange={(e) => {
                        const hold = [...additionalFeatures];
                        hold[i].quantity = e.target.value;
                        setAdditionalFeatures(hold);
                      }}
                    />
                  )}
                  <InputField
                    styles={{ marginLeft: "30px" }}
                    placeholder={`Enter Price`}
                    type="number"
                    onChange={(e) => {
                      const hold = [...additionalFeatures];
                      hold[i].cost = e.target.value;
                      setAdditionalFeatures(hold);
                    }}
                  />
                </Grid>
              </Grid>
            </>
          );
        })}
        {SubCategory.additionalFeatures.map((feature, i) => {
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
                    onChange={(e) => {
                      const hold = [...additionalFeatures];
                      hold[i].active = e.target.checked;
                      setAdditionalFeatures(hold);
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
                      onChange={(e) => {
                        const hold = [...additionalFeatures];
                        hold[i].quantity = e.target.value;
                        hold[i].active = true;
                        setAdditionalFeatures(hold);
                      }}
                    />
                  )}
                  <InputField
                    styles={{ marginLeft: "30px" }}
                    placeholder={`Enter Price`}
                    type="number"
                    onChange={(e) => {
                      const hold = [...additionalFeatures];
                      hold[i + SubCategory.additionalFeatures.length].cost =
                        e.target.value;
                      setAdditionalFeatures(hold);
                    }}
                  />
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

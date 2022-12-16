import { Grid, Box, Typography, Checkbox } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import { AttachMoneyOutlined } from "@mui/icons-material";

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
      checked={checked}
      disableRipple
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
  // useEffect(() => {
  //   // console.log("Basic", basicPlan);
  //   // console.log("Premium", premiumPlan);
  //   // console.log("Standard", standardPlan);
  //   // console.log()
  // }, [basicPlan, premiumPlan, standardPlan]);

  // useEffect(() => {
  //   console.log("additionalFeatures", additionalFeatures);
  // }, [additionalFeatures]);

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
                  // console.log("Basic Plan log");
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
                // console.log("Basic Plan log");
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
              min="0"
              step="1"
              value={basicPlan.delivery}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);

                val = val >= 0 ? val : 0;
                setBasicPlan({
                  ...basicPlan,
                  delivery: val,
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
              min="0"
              step="1"
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);

                val = val >= 0 ? val : 0;

                setStandardPlan({
                  ...standardPlan,
                  delivery: val,
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
              min="0"
              step="1"
              value={premiumPlan.delivery}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);

                val = val >= 0 ? val : 0;

                setPremiumPlan({
                  ...premiumPlan,
                  delivery: val,
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
                      value={
                        basicPlan.features[i + SubCategory.features.length]
                          .quantity
                          ? basicPlan.features[i + SubCategory.features.length]
                              .quantity
                          : ""
                      }
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;
                        const hold = [...basicPlan.features];
                        hold[i + SubCategory.features.length].quantity = val;
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
                      checked={
                        basicPlan.features[i + SubCategory.features.length]
                          .active
                      }
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
                      value={
                        standardPlan.features[i + SubCategory.features.length]
                          .quantity
                          ? standardPlan.features[
                              i + SubCategory.features.length
                            ].quantity
                          : ""
                      }
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;

                        const hold = [...standardPlan.features];
                        hold[i + SubCategory.features.length].quantity = val;
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
                      checked={
                        standardPlan.features[i + SubCategory.features.length]
                          .active
                      }
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
                      value={
                        premiumPlan.features[i + SubCategory.features.length]
                          .quantity
                          ? premiumPlan.features[
                              i + SubCategory.features.length
                            ].quantity
                          : ""
                      }
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;

                        const hold = [...premiumPlan.features];
                        hold[i + SubCategory.features.length].quantity = val;
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
                      checked={
                        premiumPlan.features[i + SubCategory.features.length]
                          .active
                      }
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
                      value={
                        basicPlan.features[i].quantity === 0
                          ? ""
                          : basicPlan.features[i].quantity
                      }
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;

                        const hold = [...basicPlan.features];
                        hold[i].quantity = val;
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
                      checked={basicPlan.features[i].active}
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
                      value={
                        standardPlan.features[i].quantity
                          ? standardPlan.features[i].quantity
                          : ""
                      }
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;

                        const hold = [...standardPlan.features];
                        hold[i].quantity = val;
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
                      checked={standardPlan.features[i].active}
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
                      value={
                        premiumPlan.features[i].quantity
                          ? premiumPlan.features[i].quantity
                          : ""
                      }
                      styles={{ width: "100%" }}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;

                        const hold = [...premiumPlan.features];
                        hold[i].quantity = val;
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
                      checked={premiumPlan.features[i].active}
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
                min="0"
                step="1"
                value={basicPlan.cost}
                onChange={(e) => {
                  let val = parseInt(e.target.value, 10);

                  val = val >= 0 ? val : 0;

                  setBasicPlan({
                    ...basicPlan,
                    cost: val,
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
                min="0"
                step="1"
                error={standardPlanError.cost}
                value={standardPlan.cost}
                onChange={(e) => {
                  let val = parseInt(e.target.value, 10);

                  val = val >= 0 ? val : 0;

                  setStandardPlan({
                    ...standardPlan,
                    cost: val,
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
                min="0"
                step="1"
                error={premiumPlanError.cost}
                value={premiumPlan.cost}
                onChange={(e) => {
                  let val = parseInt(e.target.value, 10);

                  val = val >= 0 ? val : 0;

                  setPremiumPlan({
                    ...premiumPlan,
                    cost: val,
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
                alignItems="center"
                justifyContent="space-between"
                className="border"
                sx={{ height: "50px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CheckBox
                    checked={additionalFeatures[i].active}
                    onChange={(e) => {
                      //console.log("Addition feature", additionalFeatures);
                      const hold = [...additionalFeatures];
                      //console.log("Addition Hold", hold);
                      hold[i].active = e.target.checked;
                      setAdditionalFeatures(hold);
                      //console.log("Additional features ", additionalFeatures);
                    }}
                  />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {feature.quantityBased && (
                    <InputField
                      value={additionalFeatures[i].quantity}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;

                        const hold = [...additionalFeatures];
                        hold[i].quantity = val;
                        setAdditionalFeatures(hold);
                      }}
                    />
                  )}
                  <InputField
                    value={
                      additionalFeatures[i].cost
                        ? additionalFeatures[i].cost
                        : ""
                    }
                    placeholder={`Enter Price`}
                    type="number"
                    min="0"
                    step="1"
                    onChange={(e) => {
                      let val = parseInt(e.target.value, 10);

                      val = val >= 0 ? val : 0;
                      const hold = [...additionalFeatures];
                      hold[i].cost = val;
                      setAdditionalFeatures(hold);
                    }}
                  />
                  <AttachMoneyOutlined
                    sx={{
                      color: colors.textGreen,
                    }}
                  />
                </div>
              </Grid>
            </>
          );
        })}
        {SubCategory.additionalFeatures.map((feature, i) => {
          return (
            <>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                mobile={12}
                className="border"
                sx={{ height: "50px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CheckBox
                    checked={additionalFeatures[i].active}
                    onChange={(e) => {
                      const hold = [...additionalFeatures];
                      hold[i].active = e.target.checked;
                      setAdditionalFeatures(hold);
                    }}
                  />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {feature.quantityBased && (
                    <InputField
                      value={additionalFeatures[i].quantity}
                      placeholder={`Enter ${feature.title}`}
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);

                        val = val >= 0 ? val : 0;
                        const hold = [...additionalFeatures];
                        hold[i].quantity = val;
                        hold[i].active = true;
                        setAdditionalFeatures(hold);
                      }}
                    />
                  )}
                  <InputField
                    value={
                      additionalFeatures[i].cost
                        ? additionalFeatures[i].cost
                        : ""
                    }
                    placeholder={`Enter Price`}
                    type="number"
                    min="0"
                    step="1"
                    onChange={(e) => {
                      let val = parseInt(e.target.value, 10);

                      val = val >= 0 ? val : 0;
                      const hold = [...additionalFeatures];
                      hold[i].cost = val;
                      setAdditionalFeatures(hold);
                    }}
                  />
                  <AttachMoneyOutlined
                    sx={{
                      color: colors.textGreen,
                    }}
                  />
                </div>
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

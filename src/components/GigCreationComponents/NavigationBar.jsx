import { KeyboardBackspaceOutlined } from "@mui/icons-material";

import Joi from "joi-browser";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import colors from "../../utils/colors";

export default function NavigationBar({
  handleStep,
  handleBack,
  activeStep,
  setErrors,
  images,
  gigIntroduction,
  errors,
  setBasicPlanError,
  setStandardPlanError,
  setPremiumPlanError,
  basicPlan,
  standardPlan,
  premiumPlan,
  basicPlanError,
  standardPlanError,
  premiumPlanError,
}) {
  const PackageSchema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
    cost: Joi.number().required().label("Price"),
    delivery: Joi.number().required().label("Delivery"),
  };

  var Gigschema = {
    gigTitle: Joi.string().required().label("Gig Title"),
    gigCategory: Joi.required().label("Gig Category"),
    gigSubCategory: Joi.required().label("Gig Sub Category"),
    gigDescription: Joi.required().label("Gig Description"),
    tage: Joi.array().items(Joi.string()).min(3).label("Tages"),
  };

  const Mediaschema = {
    images: Joi.array().items().min(1).label("Images"),
  };

  const validateGig = () => {
    const result = Joi.validate(gigIntroduction, Gigschema, {
      abortEarly: false,
    });
    if (!result.error) {
      setErrors({});
      console.log("GIG VALIDATED ", activeStep);
      handleStep(activeStep + 1);
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

  const validateMedia = () => {
    const result = Joi.validate({ images }, Mediaschema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      console.log("MEDIA VALIDATED ", activeStep);
      handleStep(activeStep + 1);

      return null;
    }
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    setErrors(errors);
    console.log("media Errors:", errors);
    return errors;
  };

  const standardPlanValidation = () => {
    const result = Joi.validate(standardPlan, PackageSchema, {
      abortEarly: false,
    });
    if (!result.error) {
      setStandardPlanError({});
      return null;
    }
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    setStandardPlanError(error);
    return error;
  };

  const basicPlanValidation = () => {
    console.log("basicPlanValidation", basicPlan);
    const result = Joi.validate(basicPlan, PackageSchema, {
      abortEarly: false,
    });
    if (!result.error) {
      setBasicPlanError({});
      console.log("basicPlan", basicPlanError);
      return null;
    }
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    setBasicPlanError(error);
    console.log("basicPlan1", basicPlanError);
    return error;
  };

  const premiumPlanValidation = () => {
    const result = Joi.validate(premiumPlan, PackageSchema, {
      abortEarly: false,
    });
    if (!result.error) {
      setPremiumPlanError({});
      return null;
    }
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    setPremiumPlanError(error);
    return error;
  };

  const Packagevalidate = () => {
    const basicPlanError = basicPlanValidation();
    const standardPlanError = standardPlanValidation();
    const premiumPlanError = premiumPlanValidation();
    if (basicPlanError || standardPlanError || premiumPlanError) {
      return "error";
    }
    console.log("PACKAGE VALIDATED ", activeStep);
    handleStep(activeStep + 1);

    return null;
  };

  const handleClick = () => {
    switch (activeStep) {
      case 0:
        validateGig();
        break;
      case 1:
        validateMedia();
        break;
      case 2:
        Packagevalidate();

        break;
      case 3:
        handleStep(activeStep + 1);
        break;
    }
  };

  return (
    <>
      <Grid container direction="row" sx={{ marginTop: "15px" }}>
        <Grid item container mobile={12} direction="row">
          {" "}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              px: 2,
              py: 5,
              borderRadius: "15px",
              backgroundColor: colors.textGreen,
              color: colors.white,
              maxWidth: "100%",
              minWidth: "100%",
            }}
          >
            {" "}
            <Grid item container justifyContent="space-between" mobile={4}>
              <IconWrapper>
                <Tooltip title="Go back to Edit" placement="top">
                  <IconButton
                    sx={{ my: -5, color: colors.white }}
                    onClick={handleBack}
                  >
                    <KeyboardBackspaceOutlined
                      sx={{ fontSize: "2rem !important" }}
                    />
                  </IconButton>
                </Tooltip>
              </IconWrapper>
              <Typography variant="h4">Add/Edit Service</Typography>
            </Grid>
            <Grid item container justifyContent="flex-end" mobile={6}>
              <Typography variant="h5">
                {" "}
                Click "Save & continue" to add latest changes <br /> made by
                you.{" "}
              </Typography>
            </Grid>
            <Grid item container justifyContent="center" mobile={2}>
              <button
                type="button"
                class="btn"
                style={{
                  backgroundColor: colors.textGreen,
                  color: colors.white,
                  ".btn:hover": {
                    backgroundColor: colors.white,
                    color: colors.textGreen,
                  },
                  padding: "8px 5px 5px 8px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
                onClick={handleClick}
              >
                Save & Continue
              </button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
const IconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

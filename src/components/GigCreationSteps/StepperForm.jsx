import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import colors from "../../utils/colors";

const steps = [
  "Service Introduction",
  "Media/Attachments",
  "Service Pricings",
  "Questions",
];

export default function StepperForm({ activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <CustomStep key={label}>
            <CustomStepLabel>{label}</CustomStepLabel>
          </CustomStep>
        ))}
      </Stepper>
    </Box>
  );
}

const CustomStep = styled(Step)({
  "& .MuiStepLabel-root .Mui-completed": {
    color: colors.textGreen,
  },
  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
    color: colors.textGreen,
  },
  "& .MuiStepLabel-root .Mui-active": {
    color: colors.textGreen,
  },
  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
    color: colors.textGreen,
  },
  "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
    marginTop: "5px",
    fontSize: "1.25rem",
  },
  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
    fill: "white",
  },
});

const CustomStepLabel = styled(StepLabel)({
  "& .MuiStepIcon-text": {
    fontSize: "1rem",
  },
  "& .MuiStepIcon-root": {
    width: "2rem",
    height: "2rem",
  },
});

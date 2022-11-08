import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

const steps = [
  "Service Introduction",
  "Media/Attachments",
  "Service Pricings",
  "Questions",
];

export default function GigMuiHeader() {
  const [activeStepValue, setActiveStep] = React.useState(0);
  const location = useLocation();
  const [pathName, setPathName] = React.useState(location.pathname);
  React.useEffect(() => {
    setPathName(location.pathname);
    console.log("HAEDER pathname", `${location.pathname}`);
    if (pathName === "/gig/gigmediaattachment") {
      setActiveStep(1);
    } else if (pathName === "/gig/gigmyservicepricning") {
      setActiveStep(2);
    } else if (pathName === "/gig/gigquestionapage") {
      console.log("Hare");
      setActiveStep(3);
    }
  }, []);
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        // marginTop: "3vw",
      }}
    >
      <Grid item xs={12} sm={6}>
        <Box sx={{ width: "100%" }} className="mt-5 mb-5">
          <Box sx={{ width: "100" }}>
            <Stepper activeStep={activeStepValue} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/GigCreationComponents/NavigationBar";
import StepperForm from "../../components/GigCreationSteps/StepperForm";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import GigMediaAttachment from "../GigCreation/GigMediaAttachment";
import GigMyServicePlanning from "../GigCreation/GigMyServicePricing";
import GigQuestionAPage from "../GigCreation/GigQuestionAPage";
import GigServiceIntroduction from "../GigCreation/GigServiceIntroduction";

export default function CreateGig() {
  const [activeStep, setActiveStep] = useState(0);

  const [gigCategories, setGigCategories] = useState([]);
  const [gigSubCategories, setGigSubCategories] = useState([]);
  const [gigIntroduction, setGigIntroduction] = useState({
    gigTitle: "",
    gigCategory: null,
    gigSubCategory: null,
    gigDescription: "",
    language: "",
    tage: [],
    country: "",
    addres: "",
  });

  const handleActiveStep = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <GigServiceIntroduction
            gigCategories={gigCategories}
            setGigCategories={setGigCategories}
            gigSubCategories={gigSubCategories}
            setGigSubCategories={setGigSubCategories}
            gigIntroduction={gigIntroduction}
            setGigIntroduction={setGigIntroduction}
          />
        );
        break;
      case 1:
        return <GigMediaAttachment />;
        break;
      case 2:
        return (
          <GigMyServicePlanning
            Category={gigIntroduction.gigCategory}
            SubCategory={gigIntroduction.gigSubCategory}
          />
        );
        break;
      case 3:
        return <GigQuestionAPage />;
        break;
    }
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStep = (step) => () => {
    if (activeStep < 4) {
      setActiveStep(step);
    }
    console.log(activeStep);
  };

  return (
    <>
      <HeaderLoggedIn />
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: {
              laptop: 1024,
              tablet: 640,
              mobile: 0,
              desktop: 1280,
            },
          },
        })}
      >
        <Grid container mobile={12} sx={{ my: 5 }}>
          <Grid item mobile={2}></Grid>
          <Grid item mobile={8}>
            {" "}
            <StepperForm activeStep={activeStep} />
            <Grid container>
              <Grid item mobile={1}></Grid>
              <Grid item mobile={10}>
                {" "}
                <NavigationBar
                  activeStep={activeStep}
                  handleStep={handleStep}
                  handleBack={handleBack}
                />
                {handleActiveStep(activeStep)}
              </Grid>
              <Grid item mobile={1}></Grid>
            </Grid>
          </Grid>
          <Grid item mobile={2}></Grid>
        </Grid>
      </ThemeProvider>

      <Footer />
    </>
  );
}

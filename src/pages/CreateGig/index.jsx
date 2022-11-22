import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/GigCreationComponents/NavigationBar";
import StepperForm from "../../components/GigCreationSteps/StepperForm";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import GigMediaAttachment from "../GigCreation/GigMediaAttachment";
import GigMyServicePricing from "../GigCreation/GigMyServicePricing";
import GigQuestionAPage from "../GigCreation/GigQuestionAPage";
import GigServiceIntroduction from "../GigCreation/GigServiceIntroduction";

export default function CreateGig() {
  const [errors, setErrors] = useState({});

  const [images, setImages] = useState([]);
  const [basicPlanError, setBasicPlanError] = useState({});
  const [standardPlanError, setStandardPlanError] = useState({});
  const [premiumPlanError, setPremiumPlanError] = useState({});

  const [basicPlan, setBasicPlan] = useState({
    title: "",
    description: "",
    revisions: "",
    deliveryTime: "",
    price: "",
  });
  const [standardPlan, setStandardPlan] = useState({
    title: "",
    description: "",
    revision: "",
    deliveryTime: "",
    price: "",
  });
  const [premiumPlan, setPremiumPlan] = useState({
    title: "",
    description: "",
    revision: "",
    deliveryTime: "",
    price: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [gigCategories, setGigCategories] = useState([]);
  const [gigSubCategories, setGigSubCategories] = useState([]);

  const [gigIntroduction, setGigIntroduction] = useState({
    gigTitle: "",
    gigCategory: null,
    gigSubCategory: null,
    gigDescription: null,
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
            errors={errors}
          />
        );
        break;
      case 1:
        return (
          <GigMediaAttachment
            images={images}
            setImages={setImages}
            errors={errors}
          />
        );
        break;
      case 2:
        return (
          <GigMyServicePricing
            errors={errors}
            basicPlan={basicPlan}
            standardPlan={standardPlan}
            premiumPlan={premiumPlan}
            basicPlanError={basicPlanError}
            standardPlanError={standardPlanError}
            premiumPlanError={premiumPlanError}
            Category={gigIntroduction.gigCategory}
            SubCategory={gigIntroduction.gigSubCategory}
            setBasicPlan={setBasicPlan}
            setStandardPlan={setStandardPlan}
            setPremiumPlan={setPremiumPlan}
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

  const handleStep = (step) => {
    if (activeStep < 4) {
      setActiveStep(step);
    }
    console.log("I am in active step", activeStep);
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
                  images={images}
                  errors={errors}
                  gigIntroduction={gigIntroduction}
                  setErrors={setErrors}
                  activeStep={activeStep}
                  handleStep={handleStep}
                  handleBack={handleBack}
                  setBasicPlanError={setBasicPlanError}
                  setStandardPlanError={setStandardPlanError}
                  setPremiumPlanError={setPremiumPlanError}
                  basicPlan={basicPlan}
                  standardPlan={standardPlan}
                  premiumPlan={premiumPlan}
                  basicPlanError={basicPlanError}
                  standardPlanError={standardPlanError}
                  premiumPlanError={premiumPlanError}
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

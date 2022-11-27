import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/GigCreationComponents/NavigationBar";
import StepperForm from "../../components/GigCreationSteps/StepperForm";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import GigMediaAttachment from "./GigMediaAttachment";
import GigMyServicePricing from "./GigMyServicePricing";
import GigQuestionAPage from "./GigQuestionAPage";
import GigServiceIntroduction from "./GigServiceIntroduction";
import axios from "axios";
import { useRealmContext } from "../../db/RealmContext";
import GigLoading from "./GigLoading";
import styled from "styled-components";
const attachmentData = [
  {
    uri: "",
  },
  {
    uri: "",
  },
  {
    uri: "",
  },
  {
    uri: "",
  },
  {
    uri: "",
  },
];
export default function CreateGig() {
  const { user } = useRealmContext();
  const [errors, setErrors] = useState({});
  const [errorImages, setErrorsImages] = useState(false);
  const [errorQArray, setErrorQArray] = useState(false);
  const [images, setImages] = useState(attachmentData);
  const [additionalFeatures, setAdditionalFeatures] = useState([]);
  const [basicPlanError, setBasicPlanError] = useState({});
  const [standardPlanError, setStandardPlanError] = useState({});
  const [premiumPlanError, setPremiumPlanError] = useState({});
  const [questionArr, setQuestionArr] = useState([]);
  const [question, setQuestion] = useState({
    title: "",
    discription: "",
  });

  const [basicPlan, setBasicPlan] = useState({
    name: "",
    description: "",
    cost: "",
    delivery: "",
    features: [],
  });
  const [standardPlan, setStandardPlan] = useState({
    name: "",
    description: "",
    cost: "",
    delivery: "",
    features: [],
  });
  const [premiumPlan, setPremiumPlan] = useState({
    name: "",
    description: "",
    cost: "",
    delivery: "",
    features: [],
  });

  const [activeStep, setActiveStep] = useState(0);
  const [gigCategories, setGigCategories] = useState([]);
  const [gigSubCategories, setGigSubCategories] = useState([]);
  const [video, setVideo] = useState("");

  const handleBasicPlanFeaturesChange = (updatedFeatures) => {
    console.log("updatedFeaturesBasicPlan", updatedFeatures);
    setBasicPlan({ ...basicPlan, features: [...updatedFeatures] });
  };

  useEffect(() => {
    console.log("Basic", basicPlan);
    console.log("Premium", premiumPlan);
    console.log("Standard", standardPlan);
    console.log("Gig Introduction", gigIntroduction);
  }, [basicPlan, premiumPlan, standardPlan]);

  const [gigIntroduction, setGigIntroduction] = useState({
    gigTitle: "",
    gigCategory: null,
    gigSubCategory: null,
    gigDescription: null,
    tage: [],
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
            setBasicPlan={setBasicPlan}
            setStandardPlan={setStandardPlan}
            setPremiumPlan={setPremiumPlan}
            additionalFeatures={additionalFeatures}
            setAdditionalFeatures={setAdditionalFeatures}
            basicPlan={basicPlan}
            standardPlan={standardPlan}
            premiumPlan={premiumPlan}
          />
        );
        break;
      case 1:
        return (
          <GigMediaAttachment
            attachments={images}
            setAttachments={setImages}
            errors={errors}
            errorImages={errorImages}
            videoAttachment={video}
            setVideoAttachment={setVideo}
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
            additionalFeatures={additionalFeatures}
            setAdditionalFeatures={setAdditionalFeatures}
            handleBasicPlanFeaturesChange={handleBasicPlanFeaturesChange}
          />
        );
        break;
      case 3:
        return (
          <GigQuestionAPage
            question={question}
            questionArr={questionArr}
            setQuestion={setQuestion}
            setQuestionArr={setQuestionArr}
            errorQArray={errorQArray}
          />
        );
      case 4:
        {
          const imagesArray = images
            .map((image) => image.uri)
            .filter((uri) => uri !== "");
          console.log("Questions", questionArr);
          const gig = {
            title: gigIntroduction.gigTitle,
            category: gigIntroduction.gigSubCategory._id,
            ownerId: user._id,
            tags: gigIntroduction.tage,
            description: gigIntroduction.gigDescription,
            images: imagesArray,
            video: video.uri,
            packages: [
              {
                name: basicPlan.name,
                cost: basicPlan.cost,
                description: basicPlan.description,
                delivery: basicPlan.delivery,
                features: basicPlan.features,
              },
              {
                name: standardPlan.name,
                cost: standardPlan.cost,
                description: standardPlan.description,
                delivery: standardPlan.delivery,
                features: standardPlan.features,
              },
              {
                name: premiumPlan.name,
                cost: premiumPlan.cost,
                description: premiumPlan.description,
                delivery: premiumPlan.delivery,
                features: premiumPlan.features,
              },
            ],
            questions: questionArr,
            additionalFeatures: additionalFeatures,
          };

          return <GigLoading gig={gig} />;

          // axios
          //   .post("http://localhost:3003/api/product/createProduct", Gig)
          //   .then((response) => {
          //     console.log(response);
          //   })
          //   .catch((response) => {
          //     console.log(response);
          //   });
        }
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
    <Container>
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
          <Grid item laptop={2} tablet={1}></Grid>
          <Grid item laptop={8} tablet={10}>
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
                  setErrorsImages={setErrorsImages}
                  video={video}
                  questionArr={questionArr}
                  setQuestion={setQuestion}
                  setErrorQArray={setErrorQArray}
                />
                {handleActiveStep(activeStep)}
              </Grid>
              <Grid item mobile={1}></Grid>
            </Grid>
          </Grid>
          <Grid item laptop={2} tablet={1}></Grid>
        </Grid>
      </ThemeProvider>

      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

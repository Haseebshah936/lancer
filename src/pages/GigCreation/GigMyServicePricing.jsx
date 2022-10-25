import {
  Grid,
  Box,
  TextField,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Joi from "joi-browser";
import React from "react";
import Footer from "../../components/Footer";
import GigNavigationBar from "../../components/GigComponent/GigNavigationBar";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import Header from "../../components/Header";

import { numebers } from "../../utils/GigDropDownValues";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
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
const GigDiscription = ({ value, onChange, error }) => {
  return (
    <Box marginTop={"5px"} paddingLeft={"5px"} paddingRight={"5px"}>
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Add Description"
        style={{ backgroundColor: error ? "#ffdadb" : "white" }}
        multiline
        rows={6}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
const InputField = ({ label, onChange, value, error }) => {
  return (
    <Box
      height="60px"
      display={"flex"}
      alignItems="center"
      paddingLeft={"5px"}
      paddingRight={"5px"}
      marginTop={"5px"}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label={label}
        variant="outlined"
        onChange={onChange}
        value={value}
        style={{ backgroundColor: error ? "#ffdadb" : "white" }}
      />
    </Box>
  );
};
const SwitchButtonComp = ({ onChange, checked, label, error }) => {
  return (
    <Box
      className="border-bottom"
      display="flex"
      flexDirection="row"
      justifyContent={{ xs: "space-around", sm: "center" }}
      marginTop="12px"
      paddingTop={"5px"}
      style={{ backgroundColor: error ? "#ffdadb" : "white" }}
      width="100%"
    >
      <Box display={{ xs: "block", sm: "none" }} paddingTop="15px">
        <h5>{label}</h5>
      </Box>
      <Box>
        <Switch
          checked={checked}
          onChange={onChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
    </Box>
  );
};

const DropDownComp = ({ list, label, value, onChange, error }) => {
  return (
    <Box marginLeft="5px" marginRight="5px">
      <FormControl
        fullWidth
        sx={{ height: "40px" }}
        size="small"
        className="mt-3"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
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
    </Box>
  );
};

export default function GigMyServicePlanning() {
  const [basicPlan, setBasicPlan] = React.useState({
    title: "",
    description: "",
    sourceFile: true,
    initialConcepts: true,
    revision: "",
    deliveryTime: "",
    price: "",
  });
  const [standardPlan, setStandardPlan] = React.useState({
    title: "",
    description: "",
    sourceFile: true,
    initialConcepts: true,
    revision: "",
    deliveryTime: "",
    price: "",
  });
  const [premiumPlan, setPremiumPlan] = React.useState({
    title: "",
    description: "",
    sourceFile: true,
    initialConcepts: true,
    revision: "",
    deliveryTime: "",
    price: "",
  });
  const [basicPlanError, setBasicPlanError] = React.useState({});
  const [standardPlanError, setStandardPlanError] = React.useState({});
  const [premiumPlanError, setPremiumPlanError] = React.useState({});
  const Schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    sourceFile: Joi.boolean().required().label("Source File"),
    initialConcepts: Joi.number().required().label("Initial Concepts"),
    revision: Joi.number().required().label("Revision"),
    deliveryTime: Joi.number().required().label("Delivery Time"),
    price: Joi.number().required().label("Price"),
  };
  const basicPlanValidation = () => {
    console.log("basicPlanValidation", basicPlan);
    const result = Joi.validate(basicPlan, Schema, { abortEarly: false });
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
  const standardPlanValidation = () => {
    const result = Joi.validate(standardPlan, Schema, { abortEarly: false });
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
  const premiumPlanValidation = () => {
    const result = Joi.validate(premiumPlan, Schema, { abortEarly: false });
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
  const validate = () => {
    const basicPlanError = basicPlanValidation();
    const standardPlanError = standardPlanValidation();
    const premiumPlanError = premiumPlanValidation();
    if (basicPlanError || standardPlanError || premiumPlanError) {
      return "error";
    }
    return null;
  };

  React.useEffect(() => {
    console.log(basicPlan);
  }, [basicPlan]);
  React.useEffect(() => {
    console.log(standardPlan);
  }, [standardPlan]);
  React.useEffect(() => {
    console.log(premiumPlan);
  }, [premiumPlan]);
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>
      <Grid container display="flex" justifyContent="center">
        <Grid item xs={11}>
          <GigMuiHeader></GigMuiHeader>
        </Grid>
      </Grid>
      <GigNavigationBar
        title="Add/ Edit service"
        pathName="/gig/gigquestionapage"
        validate={validate}
      ></GigNavigationBar>
      {/* Service Introduction*/}
      <Grid container display="flex" justifyContent="center" className="mt-3">
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <h3 className="text-left">My Service Pricing</h3>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <p paddingLeft="10px">
            Enter All the details related to your gig pricing and the services.
          </p>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={11} md={7}>
          <Grid container display="flex" justifyContent={"center"}>
            <Grid
              item
              xs={12}
              sm={2.8}
              className="border"
              display={{ xs: "none", sm: "block" }}
            >
              <Box height="230px" className="border-bottom"></Box>
              <TitleBox heading="Source File"></TitleBox>
              <TitleBox heading="No. of Initial Concepts"></TitleBox>
              <TitleBox heading="Revisions"></TitleBox>
              <TitleBox heading="Delivery Time"></TitleBox>
              <TitleBox heading="Total"></TitleBox>
            </Grid>
            {/* Basic */}
            <Grid item xs={12} sm={2.8} className="border" height="495px">
              <Box height="221px" className="border-bottom">
                <Box className="border-bottom">
                  <h2 className="text-center mt-3">Baisc </h2>
                </Box>
                <InputField
                  label="Package Title"
                  value={basicPlan.title}
                  error={basicPlanError.title}
                  onChange={(e) => {
                    setBasicPlan({ ...basicPlan, title: e.target.value });
                  }}
                ></InputField>
                <GigDiscription
                  value={basicPlan.description}
                  error={basicPlanError.description}
                  onChange={(e) => {
                    setBasicPlan({ ...basicPlan, description: e.target.value });
                  }}
                ></GigDiscription>
                <SwitchButtonComp
                  label="Source File"
                  checked={basicPlan.sourceFile}
                  error={basicPlanError.sourceFile}
                  onChange={(e) => {
                    setBasicPlan({
                      ...basicPlan,
                      sourceFile: e.target.checked,
                    });
                  }}
                ></SwitchButtonComp>
                <DropDownComp
                  list={numebers}
                  label="Initial Concepts"
                  value={basicPlan.initialConcepts}
                  error={basicPlanError.initialConcepts}
                  onChange={(e) => {
                    setBasicPlan({
                      ...basicPlan,
                      initialConcepts: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <DropDownComp
                  list={numebers}
                  label="Revisions"
                  value={basicPlan.revision}
                  error={basicPlanError.revision}
                  onChange={(e) => {
                    setBasicPlan({ ...basicPlan, revision: e.target.value });
                  }}
                ></DropDownComp>
                <DropDownComp
                  list={numebers}
                  label="Delivery Days"
                  value={basicPlan.deliveryTime}
                  error={basicPlanError.deliveryTime}
                  onChange={(e) => {
                    setBasicPlan({
                      ...basicPlan,
                      deliveryTime: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <InputField
                  label="Total"
                  value={basicPlan.price}
                  error={basicPlanError.price}
                  onChange={(e) => {
                    setBasicPlan({ ...basicPlan, price: e.target.value });
                  }}
                ></InputField>
              </Box>
            </Grid>
            {/* Standard */}
            <Grid item xs={12} sm={2.8} className="border" height="495px">
              <Box height="221px" className="border-bottom">
                <Box className="border-bottom">
                  <h2 className="text-center mt-3">Standard </h2>
                </Box>
                <InputField
                  label="Package Title"
                  value={standardPlan.title}
                  error={standardPlanError.title}
                  onChange={(e) => {
                    setStandardPlan({ ...standardPlan, title: e.target.value });
                  }}
                ></InputField>
                <GigDiscription
                  value={standardPlan.description}
                  error={standardPlanError.description}
                  onChange={(e) => {
                    setStandardPlan({
                      ...standardPlan,
                      description: e.target.value,
                    });
                  }}
                ></GigDiscription>
                <SwitchButtonComp
                  label="Source File"
                  checked={standardPlan.sourceFile}
                  error={standardPlanError.sourceFile}
                  onChange={(e) => {
                    setStandardPlan({
                      ...standardPlan,
                      sourceFile: e.target.checked,
                    });
                  }}
                ></SwitchButtonComp>
                <DropDownComp
                  list={numebers}
                  label="Initial Concepts"
                  value={standardPlan.initialConcepts}
                  error={standardPlanError.initialConcepts}
                  onChange={(e) => {
                    setStandardPlan({
                      ...standardPlan,
                      initialConcepts: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <DropDownComp
                  list={numebers}
                  label="Revisions"
                  value={standardPlan.revision}
                  error={standardPlanError.revision}
                  onChange={(e) => {
                    setStandardPlan({
                      ...standardPlan,
                      revision: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <DropDownComp
                  list={numebers}
                  label="Delivery Days"
                  value={standardPlan.deliveryTime}
                  error={standardPlanError.deliveryTime}
                  onChange={(e) => {
                    setStandardPlan({
                      ...standardPlan,
                      deliveryTime: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <InputField
                  label="Total"
                  value={standardPlan.price}
                  error={standardPlanError.price}
                  onChange={(e) => {
                    setStandardPlan({ ...standardPlan, price: e.target.value });
                  }}
                ></InputField>
              </Box>
            </Grid>
            {/* Premium */}
            <Grid item xs={12} sm={2.8} className="border">
              <Box height="221px" className="border-bottom">
                <Box className="border-bottom">
                  <h2 className="text-center mt-3">Platinum</h2>
                </Box>

                <InputField
                  label="Package Title"
                  value={premiumPlan.title}
                  error={premiumPlanError.title}
                  onChange={(e) => {
                    setPremiumPlan({ ...premiumPlan, title: e.target.value });
                  }}
                ></InputField>
                <GigDiscription
                  value={premiumPlan.description}
                  error={premiumPlanError.description}
                  onChange={(e) => {
                    setPremiumPlan({
                      ...premiumPlan,
                      description: e.target.value,
                    });
                  }}
                ></GigDiscription>
                <SwitchButtonComp
                  label="Source File"
                  checked={premiumPlan.sourceFile}
                  error={premiumPlanError.sourceFile}
                  onChange={(e) => {
                    setPremiumPlan({
                      ...premiumPlan,
                      sourceFile: e.target.checked,
                    });
                  }}
                ></SwitchButtonComp>

                <DropDownComp
                  list={numebers}
                  label="Initial Concepts"
                  value={premiumPlan.initialConcepts}
                  error={premiumPlanError.initialConcepts}
                  onChange={(e) => {
                    setPremiumPlan({
                      ...premiumPlan,
                      initialConcepts: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <DropDownComp
                  list={numebers}
                  label="Revisions"
                  value={premiumPlan.revision}
                  error={premiumPlanError.revision}
                  onChange={(e) => {
                    setPremiumPlan({
                      ...premiumPlan,
                      revision: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <DropDownComp
                  list={numebers}
                  label="Delivery Days"
                  value={premiumPlan.deliveryTime}
                  error={premiumPlanError.deliveryTime}
                  onChange={(e) => {
                    setPremiumPlan({
                      ...premiumPlan,
                      deliveryTime: e.target.value,
                    });
                  }}
                ></DropDownComp>
                <InputField
                  label="Total"
                  value={premiumPlan.price}
                  error={premiumPlanError.price}
                  onChange={(e) => {
                    setPremiumPlan({ ...premiumPlan, price: e.target.value });
                  }}
                ></InputField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={0} marginTop={{ xs: "250px", sm: "1px" }}>
              {}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

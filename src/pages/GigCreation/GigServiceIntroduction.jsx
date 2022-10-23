import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

import {
  gigCategories,
  languageList,
  tagsList,
} from "../../utils/GigDropDownValues";
import { CountryNAME } from "../../utils/Countries";
import { Button, TextField } from "@mui/material";
import colors from "../../utils//colors";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import GigNavigationBar from "./../../components/GigComponent/GigNavigationBar";
import TextFieldComp from "./../../components/GigComponent/TextFieldComp";
import DropDownInputComp from "./../../components/GigComponent/DropDownInputComp";
import MultiLineInputComp from "./../../components/GigComponent/MultiLineInputComp";
import MultiSlectInputComp from "./../../components/GigComponent/MultiSlectInputComp";
import Header from "../../components/Header";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
import Footer from "../../components/Footer";

export default function GigServiceIntroduction() {
  const location = useLocation();
  const [pathName, setPathName] = React.useState(location.pathname);

  const [gigIntroduction, setGigIntroduction] = useState({
    gigTitle: "",
    gigCategory: "",
    gigDescription: "",
    language: "",
    tage: [],
    country: "",
    addres: "",
  });
  const [errors, setErrors] = useState({});
  var schema = {
    gigTitle: Joi.string().required().label("Gig Title"),
    gigCategory: Joi.string().required().label("Gig Category"),
    gigDescription: Joi.string().required().label("Gig Description"),
    language: Joi.string().required().label("Language"),
    tage: Joi.array().items(Joi.string()).required().label("Tage"),
    country: Joi.string().required().label("Country"),
    addres: Joi.string().required().label("Address"),
  };

  const validate = () => {
    const result = Joi.validate(gigIntroduction, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
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

  const [tagsArr, setTagArr] = useState([]);
  const [ctag, setCTag] = useState("");
  useEffect(() => {
    setPathName(location.pathname);
    console.log("pathname", `${location.pathname}`);
  }, [location.pathname]);
  useEffect(() => {
    const tagslist = tagsList;
    for (var dat in tagslist) {
      if (Object.keys(tagslist[dat])[0] === gigIntroduction.gigCategory) {
        const name = Object.keys(tagslist[dat])[0];
        setTagArr(tagslist[dat][name]);
      }
    }
    console.log(gigIntroduction);
  }, [gigIntroduction]);
  useEffect(() => {
    const name = Object.keys(tagsList[18])[0];
    setTagArr(tagsList[18][name]);
  }, []);
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
        pathName="/gig/gigmediaattachment"
        validate={validate}
      ></GigNavigationBar>
      {/* Service Introduction*/}
      <Grid container display="flex" justifyContent="center" paddingTop="10px">
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <h3 className="text-left">Service Introduction</h3>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item md={9}>
          <Grid container display="flex" justifyContent="center">
            <DropDownInputComp
              list={gigCategories}
              label="choose Category"
              name="gigCategory"
              value={gigIntroduction.gigCategory}
              error={errors.gigCategory}
              onChange={(e, value) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  gigCategory: value.label,
                });
              }}
            ></DropDownInputComp>
            <Grid xs={0} sm={2} md={1}></Grid>
            <TextFieldComp
              label="Enter Your Service Title"
              name="serviceTitle"
              value={gigIntroduction.gigTitle}
              error={errors.gigTitle}
              onChange={(e) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  gigTitle: e.target.value,
                });
              }}
            ></TextFieldComp>
            <Grid item xs={12}></Grid>
            <MultiLineInputComp
              label="Enter Discription"
              name="serviceDiscription"
              value={gigIntroduction.gigDescription}
              error={errors.gigDescription}
              onChange={(e) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  gigDescription: e.target.value,
                });
              }}
            ></MultiLineInputComp>
            <Grid item xs={12}></Grid>
            <MultiSlectInputComp
              list={tagsArr}
              name="Tags"
              label="Select Tags"
              value={gigIntroduction.tage}
              error={errors.tage}
              onChange={(e) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  tage: e.target.value,
                });
              }}
            ></MultiSlectInputComp>
            <Grid xs={0} sm={2.1} md={1.1}></Grid>
            <Grid
              xs={10}
              sm={2.5}
              marginTop="10px"
              display="flex"
              flexDirection="column"
            >
              <TextField
                value={ctag}
                onChange={(e) => {
                  setCTag(e.target.value);
                }}
                fullWidth
                id="outlined-basic"
                label="Enter Custom Tag"
                variant="outlined"
              />
              {errors.tage && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.tage}</p>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              sm={0.95}
              display="flex"
              justifyContent="ceter"
              alignItems="center"
              paddingLeft="10px"
              paddingTop="10px"
            >
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: colors.becomePartnerButtonGreen }}
                onClick={() => {
                  setGigIntroduction({
                    ...gigIntroduction,
                    tage: [...gigIntroduction.tage, ctag],
                  });
                  setCTag("");
                }}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid
              item
              xs={10}
              sm={9.2}
              md={8.1}
              lg={8.1}
              xl={8}
              paddingTop="10px"
            >
              {gigIntroduction.tage.map((tag) => (
                <Box
                  marginTop="10px"
                  style={{
                    // border: "1px solid ",
                    borderRadius: "2px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    paddingLeft: "10vw",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    {tag}
                  </Box>
                  <Box marginRight={{ xs: "10px", sm: "5vw" }}>
                    <button
                      className="btn"
                      style={{ backgroundColor: colors.saveAndContinueButton }}
                      onClick={() => {
                        setGigIntroduction({
                          ...gigIntroduction,
                          tage: gigIntroduction.tage.filter((t) => t !== tag),
                        });
                      }}
                    >
                      X
                    </button>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}></Grid>
            <DropDownInputComp
              list={languageList}
              name="language"
              label="Choose Language"
              error={errors.language}
              value={gigIntroduction.language}
              onChange={(e, value) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  language: value.label,
                });
              }}
            ></DropDownInputComp>
            <Grid xs={0} sm={2} md={1}></Grid>
            <DropDownInputComp
              list={CountryNAME}
              name="Countries"
              label="Select Country"
              value={gigIntroduction.country}
              error={errors.country}
              onChange={(e, value) => {
                setGigIntroduction({
                  ...gigIntroduction,
                  country: value.label,
                });
              }}
            ></DropDownInputComp>
            <Grid
              item
              xs={10}
              sm={9.2}
              md={8.1}
              lg={8.1}
              xl={8}
              my="10px"
              display="flex"
              flexDirection="column"
            >
              <TextField
                fullWidth
                width="100%"
                id="outlined-basic"
                label="Enter Your Address"
                value={gigIntroduction.addres}
                onChange={(e) => {
                  setGigIntroduction({
                    ...gigIntroduction,
                    addres: e.target.value,
                  });
                }}
                variant="outlined"
              />
              {errors.addres && (
                <div className="alert alert-danger">{errors.addres}</div>
              )}
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

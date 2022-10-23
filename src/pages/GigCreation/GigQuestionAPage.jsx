import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import Joi from "joi-browser";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import GigNavigationBar from "./../../components/GigComponent/GigNavigationBar";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
import editIcon from "../../utils/editIcon.png";
import deleteIcon from "../../utils/deleteIcon.png";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function GigQuestionAPage() {
  const [questionArr, setQuestionArr] = useState([]);
  const [question, setQuestion] = useState({
    title: "",
    discription: "",
  });
  const [errors, setErrors] = useState({});
  var schema = {
    title: Joi.string().required().label("Title is Required"),
    discription: Joi.string().required().label("Discription is Required"),
  };

  const validate = () => {
    const result = Joi.validate(question, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return null;
    } else {
      const errors = {};
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrors(errors);
      return errors;
    }
    console.log(errors);
  };

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
        pathName="/"
      ></GigNavigationBar>
      <Grid container display="flex" justifyContent="center" className="mt-3">
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <h3 className="text-left">Common FAQ's</h3>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <p paddingLeft="10px">
            Enter All the question thet you want a buyer to answer before they
            can place a order.
          </p>
        </Grid>
        <Grid item xs={12}></Grid>

        <Grid
          item
          xs={11}
          md={6}
          paddingLeft={{ xs: "5px", sm: "10px" }}
          style={{
            backgroundColor: "#F7F7F7",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item xs={11} className="ps-3 pe-3 pt-3 rounded">
              <h3 className="text-center">Custom Question</h3>
              <TextField
                fullWidth
                className="bg-white"
                id="outlined-basic"
                label="Enter Title here"
                variant="outlined"
                value={question.title}
                onChange={(e) => {
                  setQuestion({ ...question, title: e.target.value });
                }}
              />
              {errors.title && (
                <div className="alert alert-danger">{errors.title}</div>
              )}
            </Grid>
            <Grid item xs={11} className="ps-3 pe-3 pt-4 rounded">
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Enter Description here"
                className="bg-white"
                multiline
                rows={6}
                value={question.discription}
                onChange={(e) => {
                  setQuestion({ ...question, discription: e.target.value });
                }}
              />
              {errors.discription && (
                <div className="alert alert-danger">{errors.discription}</div>
              )}
            </Grid>
            <Grid item xs={11} className="ps-3 pe-3 pt-4 pb-4 rounded">
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: colors.becomePartnerButtonGreen }}
                onClick={() => {
                  const v = validate();
                  if (v) {
                    console.log("error is there");
                  } else {
                    console.log("Adding");
                    setQuestionArr([...questionArr, question]);
                    setQuestion({ title: "", discription: "" });
                  }
                }}
              >
                Add to List
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} md={8} paddingTop="7px">
          {questionArr.map((item, index) => (
            <Box
              key={index}
              className="pt-3 pb-3 mt-3 rounded"
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <Grid container>
                <Grid item xs={8} md={10} className="ps-5">
                  <h3>{item.title}</h3>
                </Grid>
                <Grid item xs={3} md={2} display="flex" justifyContent="center">
                  <Box
                    component="img"
                    className="me-3"
                    src={editIcon}
                    sx={{ width: "25px", height: "25px" }}
                    onClick={() => {
                      setQuestion(item);
                      let arr = questionArr;
                      arr.splice(index, 1);
                      setQuestionArr(arr);
                    }}
                  ></Box>
                  <Box
                    component="img"
                    src={deleteIcon}
                    sx={{ width: "25px", height: "25px" }}
                    onClick={() => {
                      setQuestionArr(
                        questionArr.filter((item, i) => i !== index)
                      );
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi-browser";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import GigNavigationBar from "./../../components/GigComponent/GigNavigationBar";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
import editIcon from "../../utils/editIcon.png";
import deleteIcon from "../../utils/deleteIcon.png";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { EditOutlined, RemoveCircleOutlineOutlined } from "@mui/icons-material";

export default function GigQuestionAPage({
  questionArr,
  setQuestionArr,
  question,
  setQuestion,
}) {
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
    <>
      <Grid container sx={{ py: 2 }}>
        <Grid
          item
          container
          alignContent="flex-start"
          justifyContent="flex-start"
          direction="column"
        >
          <Typography variant="h4">Common FAQ's</Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>
            {" "}
            Enter All the question thet you want a buyer to answer before they
            can place a order.
          </Typography>
        </Grid>

        <Grid item container sx={{ mt: 2 }}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: "#F7F7F7",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">Create A Question</Typography>
            <Grid item container sx={{ py: 1 }}>
              <TextField
                sx={{
                  mb: 2,
                  "& label.Mui-focused": {
                    color: colors.textGreen,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: colors.textGreen,
                    },
                  },
                }}
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
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: colors.textGreen,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: colors.textGreen,
                    },
                  },
                }}
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

              <Button
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
                style={{ backgroundColor: colors.textGreen }}
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
          </Paper>
        </Grid>

        <Grid item mobile={12} paddingTop="7px">
          {questionArr.map((item, index) => (
            <Box
              key={index}
              className="pt-3 pb-3 mt-3 rounded"
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2 }}
              >
                <Grid item mobile={10}>
                  <Typography variant="h5">{item.title}</Typography>
                </Grid>
                <Grid item container mobile={2} justifyContent="flex-end">
                  <IconButton>
                    <EditOutlined
                      sx={{ color: colors.textGreen, fontSize: "2rem" }}
                      onClick={() => {
                        setQuestion(item);
                        let arr = questionArr;
                        arr.splice(index, 1);
                        setQuestionArr(arr);
                      }}
                    />
                  </IconButton>

                  <IconButton>
                    <RemoveCircleOutlineOutlined
                      sx={{ color: colors.textGreen, fontSize: "2rem" }}
                      onClick={() => {
                        setQuestionArr(
                          questionArr.filter((item, i) => i !== index)
                        );
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

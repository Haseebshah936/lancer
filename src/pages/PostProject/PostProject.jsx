import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { Box, Button, Grid, TextField, Alert, Chip } from "@mui/material";
import TextFeildComp from "../../components/PostProject/TextFeildComp";
import DropDownInputComp from "../../components/PostProject/DropDownInputComp";
import { gigCategories } from "../../utils/GigDropDownValues";
import { biddingTypes } from "../../utils/dummyData";
import colors from "../../utils/colors";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { requestMethod } from "./../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import styled from "styled-components";

export default function PostProject() {
  const navigate = useNavigate();
  const { user } = useRealmContext();
  const [uploading, setUploading] = useState("false");
  const [gcategories, setgCategories] = useState([]);
  const [postProjectData, setPostProjectData] = useState({
    title: "",
    category: "",
    // pricingType: "",
    budget: "",
    days: "",
    experties: [],
    links: [],
    description: "",
    files: [],
  });
  // useEffect(() => {
  //   console.log(postProjectData);
  // }, [postProjectData]);
  const [expertiesVar, setExpertiesVar] = React.useState("");
  const [linkVar, setLinkVar] = React.useState("");
  const [error, setError] = React.useState({});
  const schema = {
    title: Joi.string().required().label("Title"),
    category: Joi.string().required().label("Category"),
    // pricingType: Joi.string().required().label("Pricing Type"),
    budget: Joi.number().min(10).required().label("Budget"),
    experties: Joi.array().items(Joi.string()).min(3).label("Experties"),
    description: Joi.string().min(50).required().label("Discription"),
    days: Joi.number().required().label("Days"),
  };
  const validate = () => {
    const result = Joi.validate(
      {
        title: postProjectData.title,
        category: postProjectData.category,
        // pricingType: postProjectData.pricingType,
        budget: postProjectData.budget,
        experties: postProjectData.experties,
        description: postProjectData.description,
        days: postProjectData.days,
      },
      schema,
      { abortEarly: false }
    );
    if (!result.error) {
      setError({});
      return null;
    }

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setError(errors);
    console.log(error);
    return errors;
  };
  const processFile = async (e) => {
    setUploading("true");
    const files = e.target.files;
    // upload_preset", "f8ci6zlz"
    // "cloud_name", "dhc9yqbjh"
    // uploading multile files on cloudinary and getting the urls function accepts an array of files from the input tag
    let promise = [];
    for (let i = 0; i < files.length; i++) {
      const name = files[i].name;
      // console.log(name);
      const type = files[i].type;
      // console.log("type: " + type);
      // const filetype = type.split("/")[0];
      // console.log(filetype);
      var filetype = "";
      if (
        type == "image/jpeg" ||
        type == "image/png" ||
        type == "image/jpg" ||
        type === "image/gif"
      ) {
        filetype = "image";
      } else if (
        type === "video/mp4" ||
        type === "video/avi" ||
        type === "video/mov" ||
        type === "video/mkv"
      ) {
        filetype = "video";
      } else if (type === "application/pdf") {
        filetype = "pdf";
      } else if (
        type === "application/msword" ||
        type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        filetype = "doc";
      } else if (
        type === "application/vnd.ms-excel" ||
        type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        filetype = "excel";
      } else if (
        type === "application/vnd.ms-powerpoint" ||
        type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        filetype = "ppt";
      } else if (
        type === "application/zip" ||
        type === "application/x-rar-compressed"
      ) {
        filetype = "zip";
      } else if (type === "text/plain") {
        filetype = "text";
      }
      //checking file size
      if (files[i].size < 10000000) {
        const data = new FormData();
        data.append("file", files[i]);
        data.append("upload_preset", "f8ci6zlz");
        data.append("cloud_name", "dhc9yqbjh");
        // data.append("resource_type", filetype);
        promise.push(
          await axios.post(
            "https://api.cloudinary.com/v1_1/dhc9yqbjh/auto/upload",
            data
          )
        );
      } else {
        alert("File size is too big");
      }
    }
    Promise.all(promise).then((res) => {
      // console.log(res);
      const urls = res.map((item) => item.data.url);
      // console.log(urls);
      setPostProjectData({
        ...postProjectData,
        files: [...postProjectData.files, ...urls],
      });
    });
    setUploading("false");
  };

  // React.useEffect(() => {
  //   console.log(postProjectData);
  // }, [postProjectData]);
  const getGigCategories = async () => {
    await requestMethod
      .get("category/categories")
      .then((res) => {
        // console.log("🚀 ~ file: PostProject.jsx:165 ~ .then ~ res", res.data);
        const newData = res.data.map((item) => {
          return {
            value: item._id,
            label: item.title,
          };
        });
        setgCategories(newData);
        console.log(
          "🚀 ~ file: PostProject.jsx:172 ~ newData ~ newData",
          newData
        );

        // setGigCategories(res.data);
      })
      .catch((err) => {
        console.log("err in catching gig categories");
      });
  };
  React.useEffect(() => {
    getGigCategories();
  }, []);
  const handelPostProject = async () => {
    // {
    //   "creatorId": "636d03f645f3326a91731116",
    //   "title": "Landing Page for my website",
    //   "category": "637b55c63e6d5d9b496d7e17",
    //   "description": "I want an eligent looking promotional page for my website.",
    //   "budget": 40,
    //   "pricingType": "fixed",
    //   "days": 7,
    //   "experties": ["Web development"],
    //   "files": []
    // }
    const pushData = {
      creatorId: user?._id,
      title: postProjectData.title,
      category: postProjectData.category,
      description: postProjectData.description,
      budget: postProjectData.budget,
      pricingType: "fixed",
      days: postProjectData.days,
      experties: postProjectData.experties,
      files: postProjectData.files,
    };
    console.log("🚀 ~ file: PostProject.jsx:187 ~ .then ~ pushData", pushData);

    requestMethod
      .post("project/", pushData)
      .then((res) => {
        console.log("🚀 ~ file: PostProject.jsx:187 ~ .then ~ res", res);
        navigate(-1);
      })
      .catch((err) => {
        console.log("🚀 ~ file: PostProject.jsx:189 ~ .catch ~ err", err);
      });
  };

  return (
    <div width="100vw">
      <Header></Header>
      {/* Title */}
      <Grid container display="flex" justifyContent="center">
        <Grid item xs={12} sm={11}>
          <TextFeildComp
            label={"Post Project *"}
            placeholder={"Enter Project Title"}
            value={postProjectData.title}
            error={error.title}
            onChange={(e) =>
              setPostProjectData({ ...postProjectData, title: e.target.value })
            }
          ></TextFeildComp>
          {/* Category Type */}
          <DropDownInputComp
            label={"Category Type *"}
            name={"Category Type"}
            placeholder={"Select Category"}
            // value={postProjectData.category}
            list={gcategories}
            error={error.category}
            onChange={(e, value) => {
              setPostProjectData({ ...postProjectData, category: value.value });
            }}
          ></DropDownInputComp>
          {/* Bidding Type */}
          {/* <DropDownInputComp
            label={"Pricing Type *"}
            name={"pricingType"}
            placeholder={"Select Pricing Type"}
            value={postProjectData.pricingType}
            list={biddingTypes}
            error={error.pricingType}
            onChange={(e, value) => {
              setPostProjectData({
                ...postProjectData,
                pricingType: value.label,
              });
            }}
          ></DropDownInputComp> */}
          {/* if bidding Type is Fixed Budget Price */}
          {/* {postProjectData.pricingType === "Fixed Budget Price" ? (
            <div>
              <TextFeildComp
                label={"Budget"}
                placeholder={"Enter Budget"}
                value={postProjectData.budget}
                onChange={(e) =>
                  setPostProjectData({
                    ...postProjectData,
                    budget: e.target.value,
                  })
                }
              ></TextFeildComp>
            </div>
          ) : (
            <div></div>
          )} */}
          {/* if bidding Type is FHourly Pricing */}
          {/* {postProjectData.pricingType !== "Hourly Pricing" ? ( */}
          <div>
            <TextFeildComp
              label={"Budget"}
              placeholder={"Enter Budget"}
              value={postProjectData.budget}
              onChange={(e) =>
                setPostProjectData({
                  ...postProjectData,
                  budget: e.target.value,
                })
              }
              error={error.budget}
            ></TextFeildComp>
          </div>

          {/* ) : (
            <div></div>
          )} */}
          {/* Adding No. of Days */}
          <TextFeildComp
            label={"No. of Days"}
            placeholder={"Enter No. of Days"}
            value={postProjectData.days}
            error={error.days}
            onChange={(e) =>
              setPostProjectData({ ...postProjectData, days: e.target.value })
            }
          ></TextFeildComp>
          {/* Experties */}
          <Grid container display="flex" justifyContent={"center"}>
            <Grid item xs={11.4}>
              <h4 style={{ fontWeight: "bold" }}>
                {"Desired Area of Experties *"}
              </h4>
            </Grid>
            <Grid item xs={11.4}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={11}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    fullWidth
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
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={"Enter Experties"}
                    value={expertiesVar}
                    onChange={(e) => setExpertiesVar(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={11.4}
                  md={1}
                  display="flex"
                  justifyContent={"center"}
                  my={{ xs: 1, md: 0 }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.textGreen,
                      ":hover": { backgroundColor: colors.textGreen },
                    }}
                    disabled={expertiesVar === ""}
                    onClick={() => {
                      setPostProjectData({
                        ...postProjectData,
                        experties: [...postProjectData.experties, expertiesVar],
                      });
                      setExpertiesVar("");
                    }}
                  >
                    <Box
                      paddingLeft={{ xs: "35px", md: "20px" }}
                      paddingRight={{ xs: "35px", md: "20px" }}
                    >
                      Add
                    </Box>
                  </Button>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  {error.experties && (
                    <div className="alert alert-danger">{error.experties}</div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Displaying Experties */}
          <Grid container display="flex" justifyContent={"center"} my={1}>
            <Grid item xs={11.4} display="flex" justifyContent={"center"}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {postProjectData.experties.map((experties) => (
                  <Chip
                    className="ms-3 my-3"
                    onClick={() => {
                      setPostProjectData({
                        ...postProjectData,
                        experties: postProjectData.experties.filter(
                          (exp) => exp !== experties
                        ),
                      });
                    }}
                    label={experties + " " + "X"}
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  ></Chip>
                ))}
              </div>
            </Grid>
          </Grid>
          {/* Uploading File */}
          <Grid container display="flex" justifyContent={"center"}>
            <Grid item xs={11.4}>
              <h4 style={{ fontWeight: "bold" }}>{"Add Document"}</h4>
            </Grid>

            <Grid item xs={11.4}>
              <div className="input-group">
                <div
                  style={{ width: "100vw" }}
                  className="d-flex justify-content-end border rounded"
                >
                  {/* <button
                    className="btn btn-outline-secondary p-3 ps-5 pe-5"
                    type="button"
                    style={{
                      backgroundColor: colors.becomePartnerGreen,
                      color: "white",
                    }}
                  ></button> */}
                  <input
                    type="file"
                    className="form-control pt-3 pb-3"
                    style={{}}
                    multiple={true}
                    onChange={(e) => {
                      processFile(e);
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={11.4}>
              <p style={{ fontWeight: "bold" }} className="pt-2">
                {"Size of the Document should be Below 10MB"}
              </p>
              {postProjectData.files.length > 0
                ? postProjectData.files.map((file, index) => (
                    <p
                      style={{ fontWeight: "bold", color: "#3498db" }}
                      className="pt-2"
                      onClick={() => {
                        setPostProjectData({
                          ...postProjectData,
                          files: postProjectData.files.filter(
                            (file, i) => i !== index
                          ),
                        });
                      }}
                    >
                      {file} X
                    </p>
                  ))
                : null}
            </Grid>
            <Grid item xs={11.4}>
              {uploading === "true" ? (
                <p
                  style={{ fontWeight: "bold", color: "red" }}
                  className="pt-2"
                >
                  Wait files are Uploading
                </p>
              ) : null}
            </Grid>
          </Grid>
          {/* Adding Links */}
          <Grid container display="flex" justifyContent={"center"}>
            <Grid item xs={11.4}>
              <h4 style={{ fontWeight: "bold" }}>
                {"Add Links (Optional) (e.g. Github, Behance, Dribble)"}
              </h4>
            </Grid>
            <Grid item xs={11.4}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={11}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    fullWidth
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
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={"Enter Link"}
                    value={linkVar}
                    onChange={(e) => setLinkVar(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={11.4}
                  md={1}
                  display="flex"
                  justifyContent={"center"}
                  my={{ xs: 1, md: 0 }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.textGreen,
                      ":hover": { backgroundColor: colors.textGreen },
                    }}
                    disabled={linkVar === ""}
                    onClick={() => {
                      setPostProjectData({
                        ...postProjectData,
                        links: [...postProjectData.links, linkVar],
                      });
                      setLinkVar("");
                    }}
                  >
                    <Box
                      paddingLeft={{ xs: "35px", md: "20px" }}
                      paddingRight={{ xs: "35px", md: "20px" }}
                    >
                      Add
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Displaying Links */}
          <Grid container display="flex" justifyContent={"center"} my={1}>
            {postProjectData.links?.map((slink) => (
              <Grid item xs={11.4} display="flex" justifyContent={"center"}>
                <Box
                  className="border rounded btn"
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems="center"
                  overflow={"hidden"}
                  width="100%"
                  my={1}
                  py={1}
                  onClick={() => {
                    setPostProjectData({
                      ...postProjectData,
                      links: postProjectData.links.filter(
                        (link) => link !== slink
                      ),
                    });
                  }}
                >
                  <div className="ms-4 pt-2" style={{ fontSize: "11px" }}>
                    <p>{slink}</p>
                  </div>
                  <div className="me-4 fw-bold">
                    <p className="bold pt-2">{"X"}</p>
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
          {/* Discription */}
          {/* Submit Button */}
          <Grid container display="flex" justifyContent={"center"}>
            <Grid item xs={11.4}>
              <h4 style={{ fontWeight: "bold" }}>
                {"Write Description of Projects *"}
              </h4>
            </Grid>
            <Grid item xs={11.4}>
              <TextField
                fullWidth
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
                id="outlined-multiline-static"
                multiline
                rows={6}
                placeholder={"Enter Discription"}
                value={postProjectData.description}
                onChange={(e) =>
                  setPostProjectData({
                    ...postProjectData,
                    description: e.target.value,
                  })
                }
              />
              {error.description && (
                <Alert severity="error">{error.description}</Alert>
              )}
            </Grid>
            <Grid
              item
              xs={11.4}
              my={1}
              display="flex"
              justifyContent={"flex-end"}
            >
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: colors.textGreen,
                  color: "white",
                }}
                onClick={() => {
                  const v = validate();
                  if (v) {
                    console.log("error");
                  } else {
                    // console.log("no error");
                    console.log(postProjectData);
                    handelPostProject();
                    // navigate(-1);
                  }
                }}
              >
                <Box
                  paddingLeft={{ xs: "35px", md: "20px" }}
                  paddingRight={{ xs: "35px", md: "20px" }}
                >
                  Submit
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Submit Button */}
      <Footer></Footer>
    </div>
  );
}

const FormInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

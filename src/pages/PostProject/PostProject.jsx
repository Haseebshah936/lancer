import React from "react";
import Joi, { errors } from "joi-browser";
import { Box, Button, Grid, TextField, Alert } from "@mui/material";
import TextFeildComp from "../../components/PostProject/TextFeildComp";
import DropDownInputComp from "../../components/PostProject/DropDownInputComp";
import { gigCategories } from "../../utils/GigDropDownValues";
import { biddingTypes } from "../../utils/dummyData";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PostProject() {
  const [postProjectData, setPostProjectData] = React.useState({
    title: "",
    category: "",
    pricingType: "",
    budget: "",
    experties: [],
    links: [],
    description: "",
  });
  const [expertiesVar, setExpertiesVar] = React.useState("");
  const [linkVar, setLinkVar] = React.useState("");
  const [error, setError] = React.useState({});
  const schema = {
    title: Joi.string().required().label("Title"),
    category: Joi.string().required().label("Category"),
    pricingType: Joi.string().required().label("Pricing Type"),
    budget: Joi.string().required().label("Budget"),
    experties: Joi.array().items(Joi.string()).min(3).label("Experties"),
    description: Joi.string().required().label("Discription"),
  };
  const validate = () => {
    const result = Joi.validate(postProjectData, schema, { abortEarly: false });
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

  React.useEffect(() => {
    console.log(postProjectData);
  }, [postProjectData]);
  return (
    <div width="100vw">
      <Header></Header>
      {/* Title */}
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
        value={postProjectData.category}
        list={gigCategories}
        error={error.category}
        onChange={(e, value) => {
          setPostProjectData({ ...postProjectData, category: value.label });
        }}
      ></DropDownInputComp>
      {/* Bidding Type */}
      <DropDownInputComp
        label={"Pricing Type *"}
        name={"pricingType"}
        placeholder={"Select Pricing Type"}
        value={postProjectData.pricingType}
        list={biddingTypes}
        error={error.pricingType}
        onChange={(e, value) => {
          setPostProjectData({ ...postProjectData, pricingType: value.label });
        }}
      ></DropDownInputComp>
      {/* if bidding Type is Fixed Budget Price */}
      {postProjectData.pricingType === "Fixed Budget Price" ? (
        <div>
          <TextFeildComp
            label={"Budget"}
            placeholder={"Enter Budget"}
            value={postProjectData.budget}
            onChange={(e) =>
              setPostProjectData({ ...postProjectData, budget: e.target.value })
            }
          ></TextFeildComp>
        </div>
      ) : (
        <div></div>
      )}
      {/* if bidding Type is FHourly Pricing */}
      {postProjectData.pricingType === "Hourly Pricing" ? (
        <div>
          <TextFeildComp
            label={"Budget"}
            placeholder={"Enter Budget"}
            value={postProjectData.budget}
            onChange={(e) =>
              setPostProjectData({ ...postProjectData, budget: e.target.value })
            }
          ></TextFeildComp>
        </div>
      ) : (
        <div></div>
      )}
      {/* Experties */}
      <Grid container display="flex" justifyContent={"center"}>
        <Grid item xs={11.4}>
          <h4 style={{ fontWeight: "bold" }}>
            {"Desired Area of Experties *"}
          </h4>
        </Grid>
        <Grid item xs={11.4}>
          <Grid container>
            <Grid item xs={12} md={11} display="flex" justifyContent="center">
              <TextField
                fullWidth
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
              <div
                className="ms-1 me-1 mt-1"
                style={{
                  backgroundColor: colors.becomePartnerGreen,
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "10px",
                  flexDirection: "row",
                  padding: "5px 10px 0px 10px",
                }}
                onClick={() => {
                  setPostProjectData({
                    ...postProjectData,
                    experties: postProjectData.experties.filter(
                      (exp) => exp !== experties
                    ),
                  });
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    maxWidth: "33ch",

                    overflow: "hidden",
                  }}
                >
                  {experties}
                </p>
                <p style={{ fontSize: "14px" }} className="ps-3">
                  {"X"}
                </p>
              </div>
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
              <button
                className="btn btn-outline-secondary p-3 ps-5 pe-5"
                type="button"
                style={{
                  backgroundColor: colors.becomePartnerGreen,
                  color: "white",
                }}
              >
                Button
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={11.4}>
          <p style={{ fontWeight: "bold" }} className="pt-2">
            {"Size of the Document should be Below 2MB"}
          </p>
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
            <Grid item xs={12} md={11} display="flex" justifyContent="center">
              <TextField
                fullWidth
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
                  links: postProjectData.links.filter((link) => link !== slink),
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
        <Grid item xs={11.4} my={1} display="flex" justifyContent={"flex-end"}>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: colors.becomePartnerGreen,
              color: "white",
            }}
            onClick={() => {
              const v = validate();
              if (v) {
                console.log("no error");
                console.log(postProjectData);
              } else {
                console.log("error");
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
      {/* Submit Button */}
      <Footer></Footer>
    </div>
  );
}

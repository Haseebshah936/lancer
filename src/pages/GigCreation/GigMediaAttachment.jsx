import React from "react";
import Joi from "joi-browser";
import ImageUploading from "react-images-uploading";
import { Box, Grid } from "@mui/material";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import GigNavigationBar from "./../../components/GigComponent/GigNavigationBar";

import { Button } from "@mui/material";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function GigMediaAttachment() {
  const [images, setImages] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const schema = {
    images: Joi.array().items().min(1).label("Images"),
  };
  const validate = () => {
    const result = Joi.validate({ images }, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    setErrors(errors);
    console.log("media Errors:", errors);
    return errors;
  };
  const maxNumber = 3;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
        title="Add/ edit Services"
        pathName="/gig/gigmyservicepricning"
        validate={validate}
      ></GigNavigationBar>
      <Grid container display="flex" justifyContent="center" paddingTop="10px">
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <h3 className="text-left">Media/ Attachments</h3>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={11} md={6} paddingLeft={{ xs: "5px", sm: "10px" }}>
          <p>
            Add 3 pictures atleast 1 that you want to show as your gig picture.
          </p>
          {errors.images && (
            <div className="alert alert-danger">
              {"Kindly select atleast 1 Images"}
            </div>
          )}
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid
          item
          xs={11}
          md={6}
          paddingLeft={{ xs: "5px", sm: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "png", "jpeg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              dragProps,
            }) => (
              // write your building UI
              <Grid container width="100%">
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={onImageUpload}
                    {...dragProps}
                    style={{ backgroundColor: colors.becomePartnerButtonGreen }}
                  >
                    Click or Drop here
                  </Button>
                </Grid>

                {imageList.map((image, index) => (
                  <Grid
                    item
                    xs={11}
                    sm={3.5}
                    display="flex"
                    justifyContent="center"
                    marginRight={"10px"}
                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    marginTop="10px"
                    marginBottom="10px"
                    borderRadius={"5px"}
                  >
                    <div key={index} style={{ overflow: "hidden" }}>
                      <Box
                        component="img"
                        sx={{
                          // height: 233,
                          // width: 350,
                          maxHeight: { xs: 200, md: 160 },
                          minHeight: { xs: 200, md: 160 },
                          minWidth: { xs: 200, md: 240 },
                          maxWidth: { xs: 200, md: 240 },
                        }}
                        src={image.data_url}
                        alt=""
                        width="200"
                      />
                      <div className="d-flex justify-content-center mt-3">
                        <Button
                          variant="contained"
                          onClick={() => onImageUpdate(index)}
                          className="me-3 mb-2"
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => onImageRemove(index)}
                          className="mb-2"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            )}
          </ImageUploading>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

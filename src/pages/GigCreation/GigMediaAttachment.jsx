import React from "react";
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
  const maxNumber = 3;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const validate = () => {
    return null;
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
            acceptType={["jpg"]}
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
                    sm={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <div key={index}>
                      <Box
                        component="img"
                        sx={{
                          height: 233,
                          width: 350,
                          maxHeight: { xs: 200, md: 167 },
                          maxWidth: { xs: 200, md: 250 },
                        }}
                        src={image.data_url}
                        alt=""
                        width="200"
                      />
                      <div className="d-flex justify-content-center mt-3">
                        <Button
                          variant="contained"
                          onClick={() => onImageUpdate(index)}
                          className="me-3"
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => onImageRemove(index)}
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

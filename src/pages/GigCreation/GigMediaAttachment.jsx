import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { Box, Grid, Typography } from "@mui/material";
import GigNavigationHaeder2 from "../../components/GigComponent/GigNavigationHaeder2";
import GigNavigationBar from "./../../components/GigComponent/GigNavigationBar";

import { Button } from "@mui/material";
import GigMuiHeader from "./../../components/GigComponent/GigMuiHeader";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styled from "styled-components";

export default function GigMediaAttachment({ setImages, images, errors }) {
  const maxNumber = 3;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          mobile={12}
          sx={{ pt: 2 }}
        >
          <Typography variant="h4">Media Attachments</Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>
            Add 3 pictures atleast 1 that you want to show as your gig picture.
          </Typography>
          {errors.images && (
            <div className="alert alert-danger">
              {"Kindly select atleast 1 Images"}
            </div>
          )}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          mobile={12}
          sx={{ pt: 2 }}
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
              <Grid item container direction="column">
                <Grid item mobile={12}>
                  <Button
                    variant="contained"
                    onClick={onImageUpload}
                    {...dragProps}
                    style={{ backgroundColor: colors.textGreen }}
                  >
                    Click or Drop here
                  </Button>
                </Grid>
                <Grid item container direction="row" mobile={12}>
                  {imageList.map((image, index) => (
                    <Grid
                      item
                      mobile={4}
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
                            maxHeight: "200px",
                            minHeight: "200px",
                            minWidth: "200px",
                            maxWidth: "200px",
                          }}
                          src={image.data_url}
                          alt=""
                          width="200px"
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
              </Grid>
            )}
          </ImageUploading>
        </Grid>
      </Grid>
    </>
  );
}

const AttachmentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-left: 1.5rem;
  box-shadow: 3px 2px 10px 1px rgba(209, 209, 209, 0.75);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const Attachment = styled(Box)`
  width: ${(props) => (props.type === "audio" ? "25rem" : "10rem")};
  min-width: 10rem;
  height: 10rem;
  min-height: 10rem;
  object-fit: cover;
  background-color: ${(props) =>
    props.type === "audio" ? colors.audioBox : colors.white};
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
`;

const Audio = styled.audio`
  height: 4rem;
  background-color: ${colors.audioBox};
  position: absolute;
  z-index: 1;
  width: 100%;
`;

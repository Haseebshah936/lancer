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
import MediaAttachment from "../../components/GigComponent/MediaAttachment";
import axios from "axios";
import { useState } from "react";

export default function GigMediaAttachment({ setImages, images, errors }) {
  const [attachments, setAttachments] = useState([]);

  const uploadAttachment = (file, index, controller) => {
    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setAttachments((prev) => {
            const arr = [...prev];
            arr[index].uploading = true;
            arr[index].progress = percent;
            return arr;
          });
        }
      },
      signal: controller.signal,
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "f8ci6zlz");
    formData.append("cloud_name", "dhc9yqbjh");
    formData.append(" return_delete_token", 1);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/dhc9yqbjh/auto/upload",
        formData,
        option
      )
      .then((res) => {
        console.log("Response", res);
        setAttachments((prev) => {
          const arr = [...prev];
          arr[index].uploading = false;
          if (arr[index].type === "video") {
            URL.revokeObjectURL(arr[index].data.videoURL);
            arr[index].data.videoURL = res.data.secure_url;
          } else if (arr[index].type === "audio") {
            URL.revokeObjectURL(arr[index].data.audioURL);
            arr[index].data.audioURL = res.data.secure_url;
          } else {
            URL.revokeObjectURL(arr[index].data.uri);
            arr[index].data.uri = res.data.secure_url;
          }
          return arr;
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") console.log(err);
        console.log("canceled");
      });
  };

  const removeAttachment = async (i) => {
    // if (attachments[i].uploading) {
    attachments[i].controller.abort();
    // } else {
    //   const url = attachments[i].data.uri;
    //   const uri = url.split("/");
    //   const publicId = uri[uri.length - 1].split(".")[0];
    //   console.log(publicId);
    //   const timestamp = new Date().getTime();
    //   const string = `public_id=${publicId}&timestamp=${timestamp} mPwSeRqhs5pkymxJ93fsLFJUObo`;
    //   const signature = await sha1(string);
    //   const formData = new FormData();
    //   console.log(signature);
    //   formData.append("file", url);
    //   formData.append("api_key", "118251153512448");
    //   formData.append("public_id", publicId);
    //   formData.append("timestamp", timestamp);
    //   formData.append("signature", signature);
    //   const res = await axios.post(
    //     "https://api.cloudinary.com/v1_1/dhc9yqbjh/auto/destroy",
    //     formData
    //   );
    //   console.log(res);
    //   // try {
    //   //   const resp = await cloudinary.v2.uploader.destroy(
    //   //     publicId,
    //   //     function (error, result) {
    //   //       console.log(result, error);
    //   //     }
    //   //   );
    //   //   console.log(resp);
    //   // } catch (err) {
    //   //   console.log("Something went wrong, please try again later.");
    //   // }
    // }
    console.log("remove attachment", attachments[i]);
    setAttachments((prev) => {
      const arr = [...prev];
      arr[i] = {
        ...arr[i],
        removed: true,
      };
      return arr;
    });
  };

  const maxNumber = 3;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setAttachments(imageList);
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
                  {attachments.map((image, index) => {
                    <Grid item mobile={4} sx={{ my: 2, mr: 1 }}>
                      <MediaAttachment
                        attachment={image}
                        i={index}
                        removeAttachment={removeAttachment}
                      />
                    </Grid>;
                  })}
                  {/* {imageList.map((image, index) => (
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
                  ))} */}
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

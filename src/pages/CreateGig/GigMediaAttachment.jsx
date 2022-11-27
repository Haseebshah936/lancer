import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import colors from "../../utils/colors";

import styled from "styled-components";
import { Cancel, InsertDriveFile, Upload } from "@mui/icons-material";
import axios from "axios";
const attachmentData = [
  {
    uri: "",
  },
  {
    uri: "",
  },
  {
    uri: "",
  },
  {
    uri: "",
  },
  {
    uri: "",
  },
];
export default function GigMediaAttachment({
  setAttachments,
  errorImages,
  attachments = attachmentData,
  videoAttachment = {
    uri: "",
  },
  setVideoAttachment,
  errors,
}) {
  const maxNumber = 3;
  const type = "img";
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const [attachments, setAttachments] = useState([
  //   {
  //     uri: "",
  //   },
  //   {
  //     uri: "",
  //   },
  //   {
  //     uri: "",
  //   },
  //   {
  //     uri: "",
  //   },
  //   {
  //     uri: "",
  //   },
  // ]);
  // const [videoAttachment, setVideoAttachment] = useState({
  //   uri: "",
  // });
  const filePickerRef = useRef(null);
  const videoPickerRef = useRef(null);

  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   // console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // };

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
          URL.revokeObjectURL(arr[index].uri);
          arr[index].uri = res.data.secure_url;
          return arr;
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") console.log(err);
        console.log("canceled");
      });
  };

  const handleImageSelection = (e) => {
    const controller = new AbortController();
    const size = e.target.files[0].size / (1024 * 1024);
    if (size > 10) {
      alert("Image size can not be more than 10MB");
      return;
    }
    const newAttachments = [...attachments];
    newAttachments[selectedIndex] = {
      uri: URL.createObjectURL(e.target.files[0]),
      controller,
      uploading: true,
      progress: 0,
    };
    setAttachments(newAttachments);
    uploadAttachment(e.target.files[0], selectedIndex, controller);
  };

  const removeAttachment = async (i) => {
    attachments[i]?.controller?.abort();
    setAttachments((prev) => {
      const arr = [...prev];
      arr[i] = {
        uri: "",
      };
      return arr;
    });
  };

  const uploadVideoAttachment = (file, controller) => {
    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setVideoAttachment((prev) => {
            return { ...prev, uploading: true, progress: percent };
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
        URL.revokeObjectURL(videoAttachment.uri);
        setVideoAttachment((prev) => {
          return {
            ...prev,
            uploading: false,
            uri: res.data.secure_url,
          };
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") console.log(err);
        console.log("canceled");
      });
  };

  const handleVideoSelection = (e) => {
    const controller = new AbortController();
    const size = e.target.files[0].size / (1024 * 1024);
    if (size > 100) {
      alert("Video size can not be more than 100MB");
      return;
    }
    setVideoAttachment({
      uri: URL.createObjectURL(e.target.files[0]),
      controller,
      uploading: true,
      progress: 0,
    });
    uploadVideoAttachment(e.target.files[0], controller);
  };

  const removeVideoAttachment = async (i) => {
    videoAttachment?.controller?.abort();
    console.log("remove attachment", attachments[i]);
    setVideoAttachment({
      uri: "",
      uploading: true,
      progress: 0,
    });
  };

  useEffect(() => {
    console.log("Video Attachment", videoAttachment);
  }, [videoAttachment]);
  useEffect(() => {
    console.log("Attachments", attachments);
  }, [attachments]);

  return (
    <Grid container>
      <Box
        component="input"
        onChange={handleImageSelection}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        id="file"
        accept="image/*"
      />
      <Box
        component="input"
        onChange={handleVideoSelection}
        ref={videoPickerRef}
        type="file"
        style={{ display: "none" }}
        id="file"
        accept="video/*"
      />
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        mobile={12}
        sx={{ pt: 2 }}
      >
        <Typography variant="h4">Image Attachments</Typography>
        <Typography variant="h5" sx={{ pt: 1, paddingTop: ".5rem" }}>
          Add atleast 1 picture to show on your product page.
        </Typography>
        <Typography
          variant="h6"
          sx={{ pt: 1, fontSize: "1rem", opacity: 0.6, paddingTop: ".5rem" }}
        >
          Image size can not be more than 10MB
        </Typography>
        {errorImages && (
          <div className="alert alert-danger">
            {"Kindly select atleast 1 Images"}
          </div>
        )}
      </Grid>
      <AttachmentsContainer>
        {attachments.map(
          (attachment, i) =>
            !attachment?.removed && (
              <AttachmentContainer
                key={i}
                style={{
                  background: colors.white,
                }}
              >
                <Attachment
                  component={
                    attachment.uri ? (type === "audio" ? "div" : type) : "div"
                  }
                  src={attachment.uri}
                  controls={type === "video"}
                  type={type}
                />
                <ProgressBar>
                  {attachment.uploading && (
                    <CircularProgress
                      value={attachment.progress}
                      style={{
                        color: colors.becomePartnerButtonGreen,
                        fontSize: ".5rem",
                      }}
                      size={28}
                      variant="determinate"
                    />
                  )}
                  <IconButton
                    onClick={() => {
                      if (attachment.uri) removeAttachment(i);
                      else {
                        filePickerRef.current.value = null;
                        filePickerRef.current.click();
                        setSelectedIndex(i);
                      }
                    }}
                    sx={{
                      position: "absolute",
                      zIndex: 100,
                      background: colors.lightGrey,
                    }}
                  >
                    {attachment.uri ? (
                      <Cancel
                        style={{
                          fontSize: "2rem",
                          color: colors.white,
                        }}
                      />
                    ) : (
                      <Upload
                        style={{
                          fontSize: "2rem",
                          color: colors.white,
                        }}
                      />
                    )}
                  </IconButton>
                </ProgressBar>
                {attachment.type === "file" && (
                  <InsertDriveFile
                    style={{
                      fontSize: "4rem",
                      opacity: 0.5,
                      position: "absolute",
                      zIndex: 1,
                    }}
                  />
                )}
                {type === "audio" && (
                  <Audio src={attachment.data.audioURL} controls />
                )}
              </AttachmentContainer>
            )
        )}
      </AttachmentsContainer>

      {/* Video Attachment */}
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        mobile={12}
        sx={{ pt: 2 }}
      >
        <Typography variant="h4">Video Attachment</Typography>
        <Typography variant="h5" sx={{ pt: 1, paddingTop: ".5rem" }}>
          You can add a video to show on your product page.
        </Typography>
        <Typography
          variant="h6"
          sx={{ pt: 1, fontSize: "1rem", opacity: 0.6, paddingTop: ".5rem" }}
        >
          Video size can not be more than 100MB
        </Typography>
      </Grid>
      <AttachmentsContainer>
        <AttachmentContainer
          style={{
            background: colors.white,
          }}
        >
          <Attachment
            component={videoAttachment.uri ? "video" : "div"}
            src={videoAttachment.uri}
            controls={"video"}
            type={type}
          />
          <ProgressBar>
            {videoAttachment.uploading && (
              <CircularProgress
                value={videoAttachment.progress}
                style={{
                  color: colors.becomePartnerButtonGreen,
                  fontSize: ".5rem",
                }}
                size={28}
                variant="determinate"
              />
            )}
            <IconButton
              onClick={() => {
                if (videoAttachment.uri) removeVideoAttachment();
                else {
                  videoPickerRef.current.value = null;
                  videoPickerRef.current.click();
                }
              }}
              sx={{
                position: "absolute",
                zIndex: 100,
                background: colors.lightGrey,
              }}
            >
              {videoAttachment.uri ? (
                <Cancel
                  style={{
                    fontSize: "2rem",
                    color: colors.white,
                  }}
                />
              ) : (
                <Upload
                  style={{
                    fontSize: "2rem",
                    color: colors.white,
                  }}
                />
              )}
            </IconButton>
          </ProgressBar>
        </AttachmentContainer>
      </AttachmentsContainer>
    </Grid>
  );
}

const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  width: 100%;
  padding-bottom: 1rem;
  scrollbar-width: 0.2rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.6rem;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray};
    border-radius: 10rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-resizer {
    display: none;
  }
`;

const AttachmentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: 0.8rem;
  margin-top: 1rem;
  box-shadow: 3px 2px 10px 1px rgba(209, 209, 209, 0.75);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border: 0px;
`;

const Attachment = styled(Box)`
  width: ${(props) => (props.type === "audio" ? "35rem" : "15rem")};
  min-width: 15rem;
  height: 15rem;
  min-height: 15rem;
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

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Grid,
  Button,
  Divider,
  Box,
  Avatar,
  Rating,
  TextField,
  Chip,
} from "@mui/material";
import axios from "axios";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import colors from "../../utils/colors";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingComp from "../LoadingComp/LoadingComp";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import Joi from "joi-browser";

export default function SendRquestedRequiremnetsTimeLine({
  userName,
  recquirementId,
  projectId,
  req,
  setP,
}) {
  const [requestVar, setRequestVar] = useState({
    userName,
    titleText: "Requested for the requirements",
    time: "",
    recquirementId,
    projectId,
  });
  console.log("req: " + req);

  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState([]);
  const [linkVar, setLinkVar] = useState("");
  const [links, setLinks] = useState([]);
  const [requirementDescription, setRequirementDescription] = useState("");
  const [errors, setErrors] = useState({});
  const Schema = {
    requirementDescription: Joi.string().required().label("Description"),
  };
  const validate = () => {
    const result = Joi.validate({ requirementDescription }, Schema, {
      abortEarly: false,
    });
    if (!result.error) {
      setErrors({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setErrors(errors);
    return errors;
  };

  const processFile = async (e) => {
    setUploading(true);
    try {
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
        console.log(urls);
        const tfiles = e.target.files;
        const tname = tfiles[0].name;
        setUrl([...url, { url: urls[0], fileName: tname }]);
      });
      setUploading(false);
    } catch (e) {
      setUploading(false);
      alert("File Type not supported. Kindly Zip it then share it.");
      console.log("FAILED");
    }
  };
  return (
    <TimelineItem sx={{ paddingLeft: 0 }} style={{ paddingLeft: 0 }}>
      <TimelineOppositeContent sx={{ flex: 0, margin: 0, padding: 0 }}>
        {/* 10:00 am */}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: colors.becomePartnerGreen,
          }}
        >
          <EventNoteIcon fontSize="large" />
        </TimelineDot>
        <TimelineConnector sx={{ bgcolor: colors.becomePartnerGreen }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Box className="d-flex to-row">
          <UserNameP>{requestVar?.userName}</UserNameP>
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{requestVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{requestVar?.time}</TimeP>
        </Box>
        <RequirementBox>
          <RequirementTitleBox>
            <RequirementP>
              <UserNameP>
                <ReviewP>Send Requirements</ReviewP>
              </UserNameP>
            </RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            <Grid container>
              <Grid container item xs={12}>
                <Box>
                  <Box>
                    Send the reuirements files to the freelancer to start the
                    order. You can send multiple files at once.if requiremnets
                    files are already send then click on Already sent button.
                  </Box>

                  <Box>
                    <Box className="d-flex flex-wrap">
                      {url?.map((u, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: "80px",
                            height: "80px",
                            margin: "6px",
                            borderRadius: "5px",
                            "&:hover": {
                              backgroundColor: "#FF8886",
                            },
                          }}
                          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                          display={"flex"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                          overflowWrap={"anywheres"}
                        >
                          <Box
                            onClick={() => {
                              console.log("clicked");
                              setUrl(url.filter((item) => item.url !== u.url));
                            }}
                          >
                            <FileNameP className="text-center">
                              {u.fileName.substring(0, 10)}
                            </FileNameP>
                            <FileNameP className="text-center">
                              {u.fileName.substring(10, 19)}...
                            </FileNameP>
                            <FileExtensionP className="text-center">
                              .{u.url.split(".")[u.url.split(".").length - 1]}
                            </FileExtensionP>
                          </Box>
                        </Box>
                      ))}
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          width: "80px",
                          height: "80px",
                          margin: "6px",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                        }}
                        boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                      >
                        {uploading ? (
                          <LoadingComp
                            onClick={() => {
                              setUploading(false);
                            }}
                          ></LoadingComp>
                        ) : (
                          <CloudUploadIcon
                            sx={{
                              color: colors.becomePartnerGreen,
                              fontSize: 25,
                            }}
                          />
                        )}
                        <input
                          type="file"
                          // className="form-control pt-3 pb-3"
                          // multiple={true}
                          hidden
                          onChange={(e) => {
                            processFile(e);
                          }}
                        ></input>
                      </Button>
                    </Box>
                    <Box marginTop={1}>
                      <GreenBorderTextField
                        id="outlined-multiline-static"
                        label="Add Text/ Urls"
                        multiline
                        value={requirementDescription}
                        onChange={(e) => {
                          setRequirementDescription(e.target.value);
                        }}
                        rows={4}
                        fullWidth
                        marginLeft={{ xs: 0, sm: 1 }}
                        marginRight={{ xs: 0, sm: 1 }}
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      flexDirection={"row"}
                      my={1}
                    >
                      <GreenBorderTextField
                        fullWidth
                        label="Link"
                        variant="outlined"
                        value={linkVar}
                        onChange={(e) => {
                          setLinkVar(e.target.value);
                        }}
                      />
                      <Box
                        marginLeft={"7px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: colors.becomePartnerGreen,
                            color: "white",
                            "&:hover": {
                              backgroundColor: colors.becomePartnerGreen,
                            },
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          }}
                          disabled={linkVar === ""}
                          onClick={() => {
                            setLinks([...links, linkVar]);
                            setLinkVar("");
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                    <Grid
                      container
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      {links?.map((l, index) => (
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Chip
                            label={l}
                            size="large"
                            sx={{
                              fontSize: "12px",
                              marginBottom: "3px",
                            }}
                            variant="outlined"
                            onDelete={() => {
                              const newLinks = links.filter((link) => {
                                return link !== l;
                              });
                              setLinks(newLinks);
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button
                      onClick={() => {
                        console.log({
                          url: url.map((u) => u.url),
                          links,
                          requirementDescription,
                          recquirementId,
                        });
                        const v = validate();
                        if (v) {
                          toast.error(
                            "Kindly Add any requiremnet text or file"
                          );
                          console.log("Discription is required eorror");
                        } else {
                          requestMethod
                            .put("project/provideRequirement/" + projectId, {
                              files: url.map((u) => u.url),
                              links,
                              details: requirementDescription,
                              requirementId: recquirementId,
                            })
                            .then((res) => {
                              console.log("res", res.data);
                              setP(res.data);
                              toast.success("Requirement Submitted");
                              setRequirementDescription("");
                              setLinks([]);
                              setUrl([]);
                              setLinkVar("");
                            });
                        }
                      }}
                      sx={{
                        backgroundColor: colors.becomePartnerButtonGreen,
                        color: "white",
                        "&:hover": {
                          backgroundColor: colors.becomePartnerButtonGreen,
                          color: "white",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </RequirementDescriptionBox>
        </RequirementBox>
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          mt={{ xs: 1, sm: 1 }}
        >
          <Grid item xs={12}>
            <Divider sx={{ backgroundColor: "#EFEFF0" }} />
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}

const UserNameP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  color: ${colors.becomePartnerGreen};
  margin-bottom: 0px;
  white-space: nowrap;
`;
const ReviewP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0px;
`;
const ReviewPNotBold = styled.p`
  font-size: 1.3rem;
  font-weight: 200;
  color: black;
  margin-bottom: 0px;
`;
const TitleTextP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: "#62646a";
`;
const TimeP = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  // font-weight: 600;
  color: "#9B9DA5";
`;
const RequirementBox = styled(Box)`
  border: 1px solid #efeff0;
  border-radius: 5px;
  padding-top: 0px;
`;
const RequirementTitleBox = styled(Box)`
  //   border: 1px solid #efeff0;
  background-color: #efeff0;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
  //   margin-left: 3px;
  //   margin-right: 3px;
`;

const RequirementP = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: "#9B9DA5";
  padding-left: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;
const RequirementDescriptionBox = styled(Box)`
  padding: 1.75rem;
  font-size: 1.35rem;
  font-weight: 600;
`;
const RequirementDescriptionP = styled.p`
  font-size: 1.35rem;
  font-weight: 400;
`;
const RequirementDescriptionLinksP = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0px;
  color: ${colors.becomePartnerGreen};
`;
const FilesOuterBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const FilesBox = styled(Box)`
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border: 1px solid #efeff0;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const RatingSubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 5px;
`;
const RatingWithText = styled(Grid)``;

const GreenBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  }
`;

const HaederP = styled.p`
  font-size: 1.45rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #696969;
`;
const FileNameP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #7f7f7f;
  margin-bottom: 0px;
`;
const FileExtensionP = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 5px;
  color: #7f7f7f;
`;

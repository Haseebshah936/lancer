import React, { useState, useEffect } from "react";
import { Box, Divider, Input, TextField, Grid, Chip } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Joi from "joi-browser";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import colors from "../../utils/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingComp from "../LoadingComp/LoadingComp";
import { toast } from "react-toastify";
import { requestMethod } from "../../requestMethod";

export default function DeliverOrderComp({
  deliverOrderPopValue,
  setDeliverOrderPopValue,
  p,
  setP,
}) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState([]);
  const [text, setText] = useState("");
  const [linkVar, setLinkVar] = useState("");
  const [links, setLinks] = useState([]);

  const [error, setError] = useState({});
  const schema = {
    text: Joi.string().min(20).required().label("Text"),
  };
  const validate = () => {
    const result = Joi.validate({ text }, schema, { abortEarly: false });
    if (!result.error) {
      setError({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setError(errors);
    return errors;
  };

  const handleClickOpen = () => {
    setDeliverOrderPopValue(true);
  };

  const handleClose = () => {
    setUrl([]);
    setDeliverOrderPopValue(false);
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
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={deliverOrderPopValue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box p={1}>
          <HaederP>Deliver the order</HaederP>
        </Box>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deliver your Order. Make your to upload all the files and URLs that
            are required for the delivery. If file type is not supported then
            convert it to a zip file and the upload.
          </DialogContentText>
        </DialogContent>
        <Box paddingLeft={"10px"} paddingRight={"10px"}>
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
                <LoadingComp></LoadingComp>
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
          <Box my={1}>
            <GreenBorderTextField
              id="outlined-multiline-static"
              label="Add Text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              multiline
              rows={4}
              fullWidth
              marginLeft={{ xs: 0, sm: 1 }}
              marginRight={{ xs: 0, sm: 1 }}
            />
          </Box>
          <Box my={1}>
            <Grid
              container
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={10.5}>
                <GreenBorderTextField
                  id="outlined-multiline-static"
                  label="Add Links"
                  fullWidth
                  value={linkVar}
                  onChange={(e) => {
                    setLinkVar(e.target.value);
                  }}
                  marginLeft={{ xs: 0, sm: 1 }}
                  marginRight={{ xs: 0, sm: 1 }}
                />
              </Grid>
              <Grid
                item
                xs={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Button
                  variant="contained"
                  disabled={linkVar === ""}
                  sx={{
                    backgroundColor: colors.becomePartnerGreen,
                    color: "white",
                    "&:hover": {
                      backgroundColor: colors.becomePartnerGreen,
                    },
                  }}
                  onClick={() => {
                    setLinks([...links, linkVar]);
                    setLinkVar("");
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Grid container className="d-flex justify-content-center">
              {links?.map((l, index) => (
                <Grid
                  item
                  xs={12}
                  className="d-flex justify-content-center"
                  my={0.5}
                >
                  <Chip
                    label={l}
                    variant={"outlined"}
                    onDelete={() => {
                      setLinks(links.filter((item) => item !== l));
                    }}
                    sx={{
                      marginStart: "10px",
                      marginEnd: "10px",
                      maxWidth: "60ch",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <DialogActions>
          <Button
            onClick={() => {
              console.log({
                details: text,
                links: links,
                files: url.map((u) => u.url),
              });
              const v = validate();
              if (v) {
                toast.error(error.text);
              } else {
                requestMethod
                  .put("project/deliver/" + p._id, {
                    details: text,
                    links: links,
                    files: url.map((u) => u.url),
                  })
                  .then((res) => {
                    setP(res.data);
                    toast.success("Delivered Successfully");
                    handleClose();
                  })
                  .catch((err) => {
                    toast.error("Something went wrong please try again");
                  });
              }
              // handleClose();
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
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

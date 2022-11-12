import React, { useEffect, useState, useRef } from "react";

import { Grid, TextField, Box, Button } from "@mui/material";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { mobile, tablet, miniTablet } from "../../responsive";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import ActivePageMarker from "./../../components/ActivePageMarker/ActivePageMarker";
import { CountryNAME } from "./../../utils/Countries";
import { currencies } from "./../../utils/currencies";
import defaultImage from "./../../utils/ProfilePicDemo.webp";
import colors from "./../../utils/colors";
export default function CompleteProfile() {
  const [profileVar, setProfileVar] = useState({
    name: "",
    profilePic: "",
    country: "",
    currency: "PKR",
  });
  const dropbox = useRef(null);
  const fileSelect = useRef(null);
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    console.log("handleFiles");
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/dhc9yqbjh/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);

        setImage(response.secure_url);
        console.log(response.secure_url);
      }
    };

    fd.append("upload_preset", "f8ci6zlz");
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  }

  function handleCancel() {
    setImage(null);
  }

  function handleSave() {
    console.log(image);
    alert(image);
  }

  useEffect(() => {
    function dragEnter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragOver(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      const dt = e.dataTransfer;
      const files = dt.files;

      handleFiles(files);
    }

    dropbox.current.addEventListener("dragenter", dragEnter, false);
    dropbox.current.addEventListener("dragover", dragOver, false);
    dropbox.current.addEventListener("drop", drop, false);

    return () => {
      dropbox.current.removeEventListener("dragenter", dragEnter);
      dropbox.current.removeEventListener("dragover", dragOver);
      dropbox.current.removeEventListener("drop", drop);
    };
  }, []);

  useEffect(() => {
    console.log(profileVar);
  }, [profileVar]);
  useEffect(() => {}, []);
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid conatiner>
        <Grid item xs={12}>
          <HeaderLoggedIn></HeaderLoggedIn>
        </Grid>
      </Grid>
      {/* Title */}
      <Grid container className="d-flex justify-content-center">
        <Grid item xs={11.5} md={7} className="d-flex justify-content-center">
          <HeaderDiv>
            <div className="ps-2 d-flex flex-row align-items-center">
              <ActivePageMarker></ActivePageMarker>
              <HeaderP className="pt-1">Complete Profile</HeaderP>
            </div>
          </HeaderDiv>
        </Grid>
      </Grid>
      {/* body */}
      <Grid container className="d-flex justify-content-center mt-3">
        <Grid item xs={11.5} md={7}>
          <Grid container className="d-flex justify-content-center">
            <Grid item xs={12} mx={1} my={{ xs: 0.5, md: 0 }}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Name"
                placeholder="Enter Your Name"
                variant="outlined"
                value={profileVar.name}
                onChange={(e) =>
                  setProfileVar({ ...profileVar, name: e.target.value })
                }
              />
            </Grid>
            <Grid container className="d-flex justify-content-between" my={1}>
              <Grid item xs={12} md={5} mx={1} my={{ xs: 0.5, md: 0 }}>
                <Box width="100%">
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profileVar.country}
                    label="Country"
                    onChange={(e) =>
                      setProfileVar({ ...profileVar, country: e.target.value })
                    }
                  >
                    {CountryNAME.map((country) => (
                      <MenuItem value={country.label}>{country.label}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} mx={1} md={5} my={{ xs: 0.5, md: 0 }}>
                <Box width="100%">
                  <InputLabel id="demo-simple-select-label">
                    Currency
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profileVar.currency}
                    label="Country"
                    onChange={(e) =>
                      setProfileVar({ ...profileVar, currency: e.target.value })
                    }
                  >
                    {currencies.map((currency) => (
                      <MenuItem value={currency.code}>{currency.code}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} mx={1} my={1} className="overflow-hidden">
                <div ref={dropbox}>
                  {image ? (
                    <DashedBox className="border rounded" width="100%">
                      <div>
                        <img
                          className="rounded"
                          src={image.replace("upload/", "upload/w_600/")}
                          style={{ height: 200, width: 200 }}
                        />
                        <div className="d-flex justify-centent-center align-items-center mt-2 ">
                          <Button
                            variant="contained"
                            onClick={handleCancel}
                            sx={{ backgroundColor: colors.becomePartnerGreen }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{ backgroundColor: colors.becomePartnerGreen }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </DashedBox>
                  ) : (
                    <div
                      className="bg-gray-200 border rounded d-flex justify-content-center align-items-center "
                      //   style={{ height: 400, width: 600 }}
                    >
                      <form className="d-flex justify-content-center align-items-center">
                        {progress === 0 ? (
                          <div className="text-gray-700 text-center mt-5">
                            <p style={{ fontSize: "1.4rem" }}>
                              Drag and Drop Profile Image here
                            </p>
                            <p style={{ fontSize: "1.4rem" }} className="my-2">
                              or
                            </p>
                            <Button
                              variant="contained"
                              onClick={handleImageUpload}
                              sx={{
                                backgroundColor: colors.becomePartnerGreen,
                              }}
                              className="mb-5"
                            >
                              Browse
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-700">{progress}%</span>
                        )}

                        <input
                          ref={fileSelect}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleFiles(e.target.files)}
                        />
                      </form>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const HeaderDiv = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f2f2f2;
  border-radius: 3px;
`;

const HeaderP = styled.p`
  font-size: 2rem;
  // font-weight: 500;
  ${mobile({
    fontSize: "2.5rem",
  })}
  ${tablet({
    fontSize: "2.5rem",
  })}
`;
const DashedBox = styled(Box)`
  background-image: repeating-linear-gradient(
      0deg,
      #998a8a,
      #998a8a 8.8px,
      transparent 10px,
      transparent 18.8px,
      #998a8a 20px
    ),
    repeating-linear-gradient(
      90deg,
      #998a8a,
      #998a8a 8.8px,
      transparent 10px,
      transparent 18.8px,
      #998a8a 20px
    ),
    repeating-linear-gradient(
      180deg,
      #998a8a,
      #998a8a 8.8px,
      transparent 10px,
      transparent 18.8px,
      #998a8a 20px
    ),
    repeating-linear-gradient(
      270deg,
      #998a8a,
      #998a8a 8.8px,
      transparent 10px,
      transparent 18.8px,
      #998a8a 20px
    );
  background-size: 3px calc(100% + 20px), calc(100% + 20px) 3px,
    3px calc(100% + 20px), calc(100% + 20px) 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  animation: borderAnimation 1s infinite linear;
`;

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
import { currencies, currenciesList } from "./../../utils/currencies";
import defaultImage from "./../../utils/ProfilePicDemo.webp";
import colors from "./../../utils/colors";
import Footer from "../../components/Footer";
import axios from "axios";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import { useNavigate } from "react-router-dom";
import UploadAttachments from "../../components/UploadAttachments";
import CustomFilledButton from "../../components/CustomFilledButton";
import { toast } from "react-toastify";
export default function CompleteProfile() {
  const { user, setUser, currentUser } = useRealmContext();
  const [profileVar, setProfileVar] = useState({
    name: "",
    country: "",
    currency: "PKR",
  });
  const [profilePic, setProfilePic] = useState({
    uri: "",
  });
  const navigate = useNavigate();
  const dropbox = useRef(null);
  const fileSelect = useRef(null);
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);

  const handelNext = () => {
    setProfileVar({
      ...profileVar,
      profilePic: profilePic.uri,
    });
    console.log({ ...profileVar, profilePic: profilePic.uri });
    console.log(user?._id);
    requestMethod
      .put(`user/updateProfile/${user._id}`, {
        ...profileVar,
        profilePic: profilePic.uri,
      })
      .then((response) => {
        console.log("success");
        console.log("response", response.data.profilePic);
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("error in complete profile");
        console.log(error);
      });
  };

  // async function handleImageUpload() {
  //   if (fileSelect) {
  //     fileSelect.current.click();
  //   }
  // }

  // function handleFiles(files) {
  //   console.log("handleFiles");
  //   console.log(files);
  //   for (let i = 0; i < files.length; i++) {
  //     console.log(files[i]);
  //     uploadFile(files[i]);
  //   }
  // }

  // function uploadFile(file) {
  //   const url = `https://api.cloudinary.com/v1_1/dhc9yqbjh/upload`;
  //   const xhr = new XMLHttpRequest();
  //   const fd = new FormData();
  //   xhr.open("POST", url, true);
  //   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  //   // Update progress (can be used to show progress indicator)
  //   xhr.upload.addEventListener("progress", (e) => {
  //     setProgress(Math.round((e.loaded * 100.0) / e.total));
  //     console.log(Math.round((e.loaded * 100.0) / e.total));
  //   });

  //   xhr.onreadystatechange = (e) => {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //       const response = JSON.parse(xhr.responseText);

  //       setImage(response.secure_url);
  //       console.log(response.secure_url);
  //     }
  //   };

  //   fd.append("upload_preset", "f8ci6zlz");
  //   fd.append("tags", "browser_upload");
  //   fd.append("file", file);
  //   xhr.send(fd);
  // }

  // function handleCancel() {
  //   setImage(null);
  // }

  // function handleSave() {
  //   console.log(image);
  //   alert(image);
  // }

  // useEffect(() => {
  //   function dragEnter(e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //   }

  //   function dragOver(e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //   }

  //   function drop(e) {
  //     e.stopPropagation();
  //     e.preventDefault();

  //     const dt = e.dataTransfer;
  //     const files = dt.files;

  //     handleFiles(files);
  //   }

  //   dropbox.current.addEventListener("dragenter", dragEnter, false);
  //   dropbox.current.addEventListener("dragover", dragOver, false);
  //   dropbox.current.addEventListener("drop", drop, false);

  //   return () => {
  //     // dropbox.current.removeEventListener("dragenter", dragEnter);
  //     // dropbox.current.removeEventListener("dragover", dragOver);
  //     // dropbox.current.removeEventListener("drop", drop);
  //   };
  // }, []);

  useEffect(() => {
    console.log(profileVar);
  }, [profileVar]);
  useEffect(() => {
    if (currentUser && user) {
      console.log("User", user);
      if (user.name !== "test1" && user.profilePic !== "") navigate("/");
    }
  }, [currentUser, user]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <HeaderLoggedIn />

      {/* Title */}
      <Grid container className="d-flex justify-content-center">
        <Grid
          item
          xs={11.5}
          md={7}
          className="d-flex justify-content-center mt-3"
        >
          <HeaderDiv>
            <div className="ps-2 d-flex flex-row align-items-center">
              <ActivePageMarker></ActivePageMarker>
              <HeaderP className="pt-1">Complete Profile</HeaderP>
            </div>
          </HeaderDiv>
        </Grid>
      </Grid>
      {/* body */}

      <Grid container className="d-flex justify-content-center mt-4">
        <Grid item xs={11.5} md={7}>
          <Grid container className="d-flex justify-content-center">
            <Grid item xs={12} mx={1} mt={2}>
              <p
                className="mt-2"
                style={{ fontSize: "1.8rem", fontWeight: "600" }}
              >
                Upload Picture
              </p>
            </Grid>
            <UploadAttachments
              attachment={profilePic}
              setAttachment={setProfilePic}
              type="img"
            />
            <Grid item xs={12} mx={1} my={{ xs: 2, md: 3 }} mb={{ xs: 1 }}>
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
            <Grid
              container
              className="d-flex justify-content-between mt-4"
              my={1}
            >
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
                      <MenuItem key={country.label} value={country.label}>
                        {country.label}
                      </MenuItem>
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
                    onChange={(e) => {
                      setProfileVar({
                        ...profileVar,
                        currency: e.target.value,
                      });
                      console.log(e.target.value);
                    }}
                  >
                    {currenciesList.map((currency) => (
                      <MenuItem key={currency.name} value={currency.name}>
                        {currency.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                mx={1}
                my={1}
                className="overflow-hidden d-flex justify-content-start"
              >
                {/* <div ref={dropbox}>
                  {image ? (
                    <Box
                      display={"flex"}
                      justifyContent={{ xs: "center", md: "flex-start" }}
                    >
                      <div>
                        <img
                          className="rounded overflow-hidden"
                          src={image.replace("upload/", "upload/w_600/")}
                          style={{
                            height: 200,
                            width: 200,
                            boxShadow:
                              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                          }}
                        />
                        <div className="d-flex justify-centent-center align-items-center mt-2">
                          <Button
                            variant="contained"
                            onClick={handleCancel}
                            sx={{
                              backgroundColor: colors.becomePartnerGreen,
                              width: "200px",
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    </Box>
                  ) : (
                    // <DashedBox
                    //   className="bg-gray-200 rounded d-flex justify-content-center align-items-center pt-5 pb-5"
                    //   //   style={{ height: 400, width: 600 }}
                    // >
                    //   <form className="d-flex justify-content-center align-items-center">
                    //     {progress === 0 ? (
                    //       <div className="text-gray-700 text-center mt-5">
                    //         <p style={{ fontSize: "1.5rem" }}>
                    //           Drag and Drop Profile Image here
                    //         </p>
                    //         <p style={{ fontSize: "1.5rem" }} className="my-2">
                    //           or
                    //         </p>
                    //         <Button
                    //           variant="contained"
                    //           onClick={handleImageUpload}
                    //           sx={{
                    //             backgroundColor: colors.becomePartnerGreen,
                    //           }}
                    //           className="mb-5"
                    //         >
                    //           Browse
                    //         </Button>
                    //       </div>
                    //     ) : (
                    //       <div
                    //         className="text-gray-700 text-center mt-5 "
                    //         style={{ minHeight: "20rem" }}
                    //       >
                    //         <p style={{ fontSize: "1.4rem" }}>
                    //           Drag and Drop Profile Image here
                    //         </p>
                    //         <p style={{ fontSize: "1.4rem" }} className="my-2">
                    //           or
                    //         </p>
                    //         <Button
                    //           variant="contained"
                    //           onClick={handleImageUpload}
                    //           sx={{
                    //             backgroundColor: colors.becomePartnerGreen,
                    //           }}
                    //           className="mb-5"
                    //         >
                    //           Browse
                    //         </Button>
                    //       </div>
                    //     )}

                    //     <input
                    //       ref={fileSelect}
                    //       type="file"
                    //       accept="image/*"
                    //       style={{ display: "none" }}
                    //       onChange={(e) => handleFiles(e.target.files)}
                    //     />
                    //   </form>
                    // </DashedBox>
                  )}
                </div> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Next Screen Button */}
      <Grid container>
        <Grid item xs={12} mb={4} className="d-flex justify-content-center">
          <CustomFilledButton
            type=""
            title={"Save and Continue"}
            onClick={() => {
              if (
                profileVar.name &&
                profileVar.country &&
                profileVar.currency &&
                !profilePic.uploading
              )
                handelNext();
              else
                toast.error(
                  "Please fill all the fields and upload your profile picture"
                );
            }}
            style={{ marginTop: "1.5rem" }}
          />
          {/* <Button
            variant="contained"
            sx={{ backgroundColor: colors.becomePartnerGreen, width: "200px" }}
            onClick={handelNext}
            className="mb-5"
            // disabled={profileVar.profilePic === ""}
          >
            Save&nbsp;and&nbsp;Continue
          </Button> */}
        </Grid>
      </Grid>
      <Footer></Footer>
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

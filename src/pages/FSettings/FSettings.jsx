import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import Joi from "joi";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
import UploadAttachments from "../../components/UploadAttachments";
import { CountryNAME } from "../../utils/Countries";
import { genderOptions } from "../../utils/GigDropDownValues";
import { humanLanguages } from "../../utils/GigDropDownValues";
import { currenciesList } from "../../utils/currencies";
import axios from "axios";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";

export default function FSettings() {
  const { user, setUser } = useRealmContext();
  const [updateFalg, setUpdateFlag] = useState(1);
  const [profilePic, setProfilePic] = useState({
    uri: user?.profilePic
      ? user?.profilePic
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const [valuesObj, setValuesObj] = useState({
    name: user?.name || "",
    profilePic: user?.profilePic || "",
    country: user?.country || "",
    currency: user?.currency || "",
    DOB: user?.DOB?.substring(0, 10) || "",
    gender: user?.gender || "Male",
    language: user?.seller?.languages[0] || "English",
  });
  const valueObjSchema = Joi.object({
    name: Joi.string().required(),
    profilePic: Joi.string().required(),
    country: Joi.string().required(),
    currency: Joi.string().required(),
    DOB: Joi.string().required(),
    gender: Joi.string().required(),
    language: Joi.string().required(),
  });
  const [errorsValuesObj, setErrorsValuesObj] = useState({});
  const valueObjValidate = () => {
    setUpdateFlag(updateFalg + 1);
    const result = valueObjSchema.validate(valuesObj, { abortEarly: false });
    if (!result.error) {
      setErrorsValuesObj({});
      return null;
    } else {
      const errors = {};
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrorsValuesObj(errors);
      return errors;
    }
  };
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    dribble: "",
    behance: "",
  });

  const [tagLineVar, setTagLineVar] = useState("");
  useEffect(() => {
    // console.log("valuesObj", valuesObj);
    // console.log("tagLineVar", tagLineVar);
  }, [valuesObj, tagLineVar]);
  useEffect(() => {
    // console.log("socialLinks", socialLinks);
  }, [socialLinks]);
  useEffect(() => {}, [user]);
  useEffect(() => {
    // console.log("user", user);

    setValuesObj({
      name: user?.name,
      profilePic: user?.profilePic,
      country: "",
      currency: "",
      DOB: "",
      gender: "",
      language: "",
    });
  }, []);
  useEffect(() => {
    setValuesObj({
      ...valuesObj,
      profilePic: profilePic.uri,
    });
    console.log("profilePic", profilePic.uri);
  }, [profilePic]);
  // useEffect(() => {
  //   setUser(user);
  // }, [user]);
  // useEffect(() => {
  //   if (user?.name) {
  //     setValuesObj({
  //       ...valuesObj,
  //       name: user?.name,
  //     });
  //   }
  //   if (user?.profilePic) {
  //     setValuesObj({
  //       ...valuesObj,
  //       profilePic: user?.profilePic,
  //     });
  //   }
  //   if (user?.country) {
  //     setValuesObj({
  //       ...valuesObj,
  //       country: user?.country,
  //     });
  //   }
  //   if (user?.currency) {
  //     setValuesObj({
  //       ...valuesObj,
  //       currency: user?.currency,
  //     });
  //   }
  //   if (user?.DOB) {
  //     setValuesObj({
  //       ...valuesObj,
  //       DOB: user?.DOB,
  //     });
  //   }
  // }, [updateFalg]);
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>

      <Container>
        <Box sx={{ flexGrow: 1, pt: 1, pb: 1 }}>
          <ThemeProvider
            theme={createTheme({
              breakpoints: {
                values: {
                  laptop: 1024,
                  tablet: 640,
                  mobile: 0,
                  desktop: 1280,
                  xs: 0,
                  sm: 600,
                  md: 900,
                  lg: 1200,
                  xl: 1536,
                },
              },
            })}
          >
            <Grid container spacing={2}>
              <Grid item mobile={12} laptop={4} tablet={5} desktop={3}>
                <FSideBar></FSideBar>
              </Grid>

              <Grid
                item
                mobile={12}
                tablet={7}
                laptop={8}
                desktop={9}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid item xs={12} my={{ xs: 1, md: 0 }}>
                  <Grid container display={"flex"} justifyContent={"center"}>
                    <Grid item xs={11.5}>
                      <TitleP className="text-left">Setting</TitleP>
                    </Grid>
                    {/* <Grid
                  item
                  xs={11.5}
                  display={"flex"}
                  justifyContent={{ xs: "center", sm: "right" }}
                  flexDirection="column"
                >
                  <Box
                    component="img"
                    className="rounded"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 200, md: 180 },
                      maxWidth: { xs: 200, md: 200 },
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    alt="Profile Pic"
                    src={
                      valuesObj.profilePic
                        ? valuesObj.profilePic
                        : user?.profilePic
                        ? user?.profilePic
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  ></Box>
                  <Box
                    style={{
                      maxWidth: { xs: 200, md: 200 },
                    }}
                  >
                    {errorsValuesObj.profilePic && (
                      <div className="alert alert-danger">
                        {errorsValuesObj.profilePic}
                      </div>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "200px",
                      marginTop: "10px",
                      backgroundColor: colors.becomePartnerGreen,
                    }}
                  >
                    Upload&nbsp;File
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const url = `https://api.cloudinary.com/v1_1/dhc9yqbjh/upload`;
                        const xhr = new XMLHttpRequest();
                        const fd = new FormData();
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader(
                          "X-Requested-With",
                          "XMLHttpRequest"
                        );

                        // Update progress (can be used to show progress indicator)
                        xhr.upload.addEventListener("progress", (e) => {
                          // setProgress(Math.round((e.loaded * 100.0) / e.total));
                          // console.log(Math.round((e.loaded * 100.0) / e.total));
                        });

                        xhr.onreadystatechange = (e) => {
                          if (xhr.readyState == 4 && xhr.status == 200) {
                            const response = JSON.parse(xhr.responseText);

                            // setImage(response.secure_url);
                            // console.log(response.secure_url);
                            setValuesObj({
                              ...valuesObj,
                              profilePic: response.secure_url,
                            });
                          }
                        };

                        fd.append("upload_preset", "f8ci6zlz");
                        fd.append("tags", "browser_upload");
                        fd.append("file", file);
                        xhr.send(fd);
                      }}
                    />
                  </Button>
                </Grid> */}
                    <Grid item xs={11.5}>
                      <UploadAttachments
                        attachment={profilePic}
                        setAttachment={setProfilePic}
                        type="img"
                      />
                    </Grid>
                    <Grid item xs={11.5} mt={1}>
                      <GreenBorderTextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        style={{ color: colors.becomePartnerGreen }}
                        value={valuesObj.name ? valuesObj.name : user?.name}
                        onChange={(e) => {
                          setValuesObj({
                            ...valuesObj,
                            name: e.target.value,
                          });
                        }}
                      />
                      {errorsValuesObj.name && (
                        <div className="alert alert-danger">
                          {errorsValuesObj.name}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={11.5} mt={2}>
                      <GreenBorderTextField
                        id="outlined-basic"
                        label="Tag Line"
                        variant="outlined"
                        fullWidth
                        style={{ color: colors.becomePartnerGreen }}
                        value={tagLineVar ? tagLineVar : user?.tagLine}
                        onChange={(e) => {
                          setTagLineVar(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={11.5} mt={2}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        value={
                          valuesObj.currency
                            ? { name: valuesObj.currency }
                            : { name: user?.currency }
                        }
                        options={currenciesList}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {
                          setValuesObj({
                            ...valuesObj,
                            currency: value.name,
                          });
                        }}
                        renderInput={(params) => (
                          <GreenBorderTextField
                            {...params}
                            label="Curriencies"
                          />
                        )}
                      />
                      {errorsValuesObj.currency && (
                        <div className="alert alert-danger">
                          {errorsValuesObj.currency}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={11.5} mt={2}>
                      <Grid
                        container
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Grid item xs={12} sm={5.8}>
                          <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            value={
                              valuesObj.gender
                                ? { label: valuesObj.gender }
                                : { label: user?.gender }
                            }
                            options={genderOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(e, value) => {
                              setValuesObj({
                                ...valuesObj,
                                gender: value.label,
                              });
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Gender" />
                            )}
                          />
                          {errorsValuesObj.gender && (
                            <div className="alert alert-danger">
                              {errorsValuesObj.gender}
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={{ xs: 1, sm: 0 }}>
                          <label>DOB</label>
                          <input
                            id="startDate"
                            className="form-control"
                            value={valuesObj.DOB ? valuesObj.DOB : user?.DOB}
                            type="date"
                            onChange={(e) => {
                              setValuesObj({
                                ...valuesObj,
                                DOB: e.target.value,
                              });
                              console.log("DOB", e.target.value);
                            }}
                            style={{ width: "100%", height: "36px" }}
                          />
                          {errorsValuesObj.DOB && (
                            <div className="alert alert-danger">
                              {errorsValuesObj.DOB}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11.5} mt={2}>
                      <Grid
                        container
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Grid item xs={12} sm={5.8}>
                          <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={humanLanguages}
                            value={
                              valuesObj.language
                                ? { name: valuesObj.language }
                                : { name: user?.language }
                            }
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => {
                              setValuesObj({
                                ...valuesObj,
                                language: value.name,
                              });
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Langauge" />
                            )}
                          />
                          {errorsValuesObj.language && (
                            <div className="alert alert-danger">
                              {errorsValuesObj.language}
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={{ xs: 1, sm: 0 }}>
                          <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={CountryNAME}
                            value={
                              valuesObj.country
                                ? { label: valuesObj.country }
                                : { label: user?.country }
                            }
                            getOptionLabel={(option) => option.label}
                            onChange={(e, value) => {
                              // console.log(value.label);
                              setValuesObj({
                                ...valuesObj,
                                country: value.label,
                              });
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Country" />
                            )}
                          />
                          {errorsValuesObj.country && (
                            <div className="alert alert-danger">
                              {errorsValuesObj.country}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={11.5}
                      mt={2}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: colors.becomePartnerGreen,
                          width: "120px",
                          height: "35px",
                        }}
                        onClick={() => {
                          setUpdateFlag(updateFalg + 1);
                          const errors = valueObjValidate();
                          if (errors) {
                            console.log(errors);
                          } else {
                            // console.log(valuesObj);
                            requestMethod
                              .put(`user/updateProfile/${user?._id}`, {
                                profilePic: valuesObj.profilePic,
                                name: valuesObj.name,
                                country: valuesObj.country,
                                currency: valuesObj.currency,
                                DOB: valuesObj.DOB,
                                gender: valuesObj.gender,
                              })
                              .then((res) => {
                                console.log("Profile Updated");
                                setUser(res.data);
                              });
                          }
                        }}
                      >
                        Update setting
                      </Button>
                    </Grid>
                    <Grid item xs={11.5} mt={2}>
                      <TitleP>Social Links</TitleP>
                      <Grid
                        container
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Grid item xs={12} sm={5.8} mt={1.3}>
                          <GreenBorderTextField
                            variant="outlined"
                            fullWidth
                            style={{ color: colors.becomePartnerGreen }}
                            label="Facebook"
                            value={valuesObj.facebook}
                            onChange={(e) => {
                              setSocialLinks({
                                ...socialLinks,
                                facebook: e.target.value,
                              });
                            }}
                          ></GreenBorderTextField>
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={1.3}>
                          <GreenBorderTextField
                            variant="outlined"
                            fullWidth
                            style={{ color: colors.becomePartnerGreen }}
                            label="Twitter"
                            value={valuesObj.twitter}
                            onChange={(e) => {
                              setSocialLinks({
                                ...socialLinks,
                                twitter: e.target.value,
                              });
                            }}
                          ></GreenBorderTextField>
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={1.3}>
                          <GreenBorderTextField
                            variant="outlined"
                            fullWidth
                            style={{ color: colors.becomePartnerGreen }}
                            label="Instagram"
                            value={valuesObj.instagram}
                            onChange={(e) => {
                              setSocialLinks({
                                ...socialLinks,
                                instagram: e.target.value,
                              });
                            }}
                          ></GreenBorderTextField>
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={1.3}>
                          <GreenBorderTextField
                            variant="outlined"
                            fullWidth
                            style={{ color: colors.becomePartnerGreen }}
                            label="LinkedIn"
                            value={valuesObj.linkedin}
                            onChange={(e) => {
                              setSocialLinks({
                                ...socialLinks,
                                linkedin: e.target.value,
                              });
                            }}
                          ></GreenBorderTextField>
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={1.3}>
                          <GreenBorderTextField
                            variant="outlined"
                            fullWidth
                            style={{ color: colors.becomePartnerGreen }}
                            label="Dribble"
                            value={valuesObj.dribble}
                            onChange={(e) => {
                              setSocialLinks({
                                ...socialLinks,
                                dribble: e.target.value,
                              });
                            }}
                          ></GreenBorderTextField>
                        </Grid>
                        <Grid item xs={12} sm={5.8} mt={1}>
                          <GreenBorderTextField
                            variant="outlined"
                            fullWidth
                            style={{ color: colors.becomePartnerGreen }}
                            label="Behance"
                            value={valuesObj.behance}
                            onChange={(e) => {
                              setSocialLinks({
                                ...socialLinks,
                                behance: e.target.value,
                              });
                            }}
                          ></GreenBorderTextField>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          mt={1.2}
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          <Button
                            variant="contained"
                            style={{
                              width: "160px",
                              backgroundColor: colors.becomePartnerGreen,
                            }}
                          >
                            Update Social Links
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

      <Footer></Footer>
    </div>
  );
}
const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;
const GreenBorderTextField = Styled(TextField)`
    & label.Mui-focused {
      color: ${colors.becomePartnerGreen};
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${colors.becomePartnerGreen};
      }
    }
  `;

const Container = Styled.div`
  margin-inline: 7%;
`;

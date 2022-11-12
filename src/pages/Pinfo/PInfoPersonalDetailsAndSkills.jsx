import React from "react";
import { useNavigate } from "react-router-dom";
import { mobile, tablet, miniTablet } from "../../responsive";
import ImageUploading from "react-images-uploading";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

import Head from "../../components/HeaderLoggedIn";
import ActivePageMarker from "../../components/ActivePageMarker/ActivePageMarker";
import profileImageTemplate from "../../utils/ProfilePicDemo.webp";
import bannerImageTemplate from "../../utils/bannerImage.webp";
import menu from "../../utils/menu.png";
import { CountryNAME } from "../../utils/Countries";
import colors from "../../utils/colors";
// import colors from "../../utils/colors";
// import { height, width } from "@mui/system";
import Footer from "./../../components/Footer/index";
import { Years } from "../../utils/Years";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import { useRealmContext } from "../../db/RealmContext";

export default function PInfoPersonalDetailsAndSkills() {
  const { user } = useRealmContext();
  const [gender, setGender] = React.useState("");
  const [mySkills, setMySkill] = React.useState([]);
  const [mySkillName, setMySkillName] = React.useState("");
  const [mySkillPercentage, setMySkillPercentage] = React.useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const handelContinue = () => {
    function extractValue(arr, prop) {
      // extract value from property
      let extractedValue = arr.map((item) => item[prop]);
      return extractedValue;
    }
    const extractedSkills = extractValue(mySkills, "name");
    const sData = {
      about: about,
      skills: extractedSkills,
      education: educationArr.map((item) => {
        return {
          degree: item.educationTitle,
          institute: item.instituteTitle,
          starting: item.startingDate,
          ending: item.endingDate,
        };
      }),
      achivements: achivementsArr.map((item) => {
        return {
          title: item.achivementTitle,
          description: item.description,
          starting: item.startingDate,
          ending: item.endingDate,
        };
      }),
    };
    console.log(sData);
    console.log(user);
    axios
      .put(`http://localhost:3003/api/user/makeSeller/${user._id}`, sData)
      .then((res) => {
        console.log(res);
        console.log("success seller created");
      })
      .catch((err) => {
        console.log("unable to make seller");
      });
  };

  const addMySkillHandeler = () => {
    let temp = [...mySkills];
    temp.push({ name: mySkillName, percentage: mySkillPercentage });
    setMySkill(temp);
    setMySkillName("");
    setMySkillPercentage("");
    console.log(temp);
  };
  const removeMySkillHandeler = (name) => {
    let temp = [...mySkills];
    temp = temp.filter((item) => item.name !== name);
    setMySkill(temp);
    console.log(name);
  };

  const navigate = useNavigate();

  const [jobExpArr, setJobExpArr] = React.useState([]);
  const [educationArr, setEducationArr] = React.useState([]);
  const [achivementsArr, setAchivementsArr] = React.useState([]);

  const [about, setAbout] = React.useState("");
  const [eduVar, setEduVar] = React.useState({
    instituteTitle: "",
    startingDate: "",
    endingDate: "",
    educationTitle: "",
  });
  const [jobExperienceVar, setJobExperienceVar] = React.useState({
    instituteTitle: "",
    startingDate: "",
    endingDate: "",
    jobTitle: "",
  });
  const [achivementVar, setAchivementVar] = React.useState({
    achivementTitle: "",
    startingDate: "",
    endingDate: "",
    description: "",
  });

  React.useEffect(() => {
    console.log("Ach vae", achivementVar);
  }, [achivementVar]);

  const [jobStartingDate, setJobStartingDate] = React.useState(null);
  const [jobEndingDate, setJobEndingDate] = React.useState(null);
  const [eduStartingDate, setEduStartingDate] = React.useState(null);
  const [eduEndingDate, setEduEndingDate] = React.useState(null);

  React.useEffect(() => {
    console.log(jobExperienceVar);
  }, [jobExperienceVar]);

  React.useEffect(() => {
    setJobExperienceVar({
      ...jobExperienceVar,
      startingDate: jobStartingDate?.label,
    });

    console.log(jobExperienceVar);
  }, [jobStartingDate]);
  React.useEffect(() => {
    setJobExperienceVar({
      ...jobExperienceVar,
      endingDate: jobEndingDate?.label,
    });

    console.log(jobExperienceVar);
  }, [jobEndingDate]);

  React.useEffect(() => {
    setEduVar({
      ...eduVar,
      endingDate: eduEndingDate?.label,
    });
    console.log(educationArr);
  }, [eduEndingDate]);
  React.useEffect(() => {
    setEduVar({
      ...eduVar,
      startingDate: eduStartingDate?.label,
    });
    console.log(educationArr);
  }, [eduStartingDate]);
  const removeJobExpHandeler = (title) => {
    setJobExpArr(jobExpArr.filter((item) => item.companyTitle !== title));
  };
  const removeEduExpHandeler = (title) => {
    console.log(title);
    setEducationArr(
      educationArr.filter((item) => item.educationTitle !== title)
    );
  };

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <Head />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          display="flex"
          justifyContent={"center"}
        >
          <MainDiv className="pt-3 rounded">
            {/* Header Start */}
            <div className=" pb-3 rounded">
              <Grid constainer display={"flex"} justifyContent={"center"}>
                <Grid item xs={12} sm={10.65}>
                  <div className="mt-2 border p-2 rounded d-block">
                    <HeaderDiv>
                      <div className="ps-2 d-flex flex-row align-items-center">
                        <ActivePageMarker></ActivePageMarker>
                        <HeaderP className="pt-1">About</HeaderP>
                      </div>
                    </HeaderDiv>
                  </div>
                </Grid>
              </Grid>
              {/* Header End */}
              {/* Personal Details Start */}
              <div className="d-flex justify-content-center">
                <>
                  <Grid container display={"flex"} justifyContent={"center"}>
                    <Grid item xs={10.5} mt={1}>
                      <div className="ms-2 me-2 mt-2">
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="About"
                          multiline
                          rows={10}
                          value={about}
                          onChange={(e) => {
                            setAbout(e.target.value);
                            console.log(about);
                          }}
                          // defaultValue="Description"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </>
              </div>

              {/* Enter Skills Box Starts */}
              <div className="mt-4">
                <div className="block"></div>
                <Grid container display={"flex"} justifyContent={"Center"}>
                  <Grid item xs={12} sm={10.65}>
                    <HeaderDiv>
                      <div className="ps-2 d-flex flex-row align-items-center">
                        <ActivePageMarker></ActivePageMarker>
                        <HeaderP className="pt-1">My Skills</HeaderP>
                      </div>
                    </HeaderDiv>
                  </Grid>
                  {/* Adding the SKills */}
                  <Grid item xs={12} sm={10.65}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md={5}
                        className="d-flex justify-content-center"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Add Your Skill"
                          variant="outlined"
                          className="mt-4 d-flex justify-content-center"
                          sx={{ width: 270 }}
                          value={mySkillName}
                          onChange={(e) => {
                            setMySkillName(e.target.value);
                            console.log(mySkillName);
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={5}
                        className="mt-4 d-flex justify-content-center"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Rate Your Skill (0% to 100%)"
                          variant="outlined"
                          sx={{ width: 270 }}
                          value={mySkillPercentage}
                          onChange={(e) => {
                            setMySkillPercentage(e.target.value);
                            console.log(mySkillPercentage);
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={2}
                        className="mt-4 d-flex justify-content-center"
                      >
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: colors.becomePartnerGreen }}
                          sx={{ width: 100, height: 35 }}
                          onClick={addMySkillHandeler}
                        >
                          add skill
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* SHOWING THE ADDED sKILLS */}
                  <Grid item xs={12} sm={10}>
                    <Grid container className="mt-4">
                      <Grid item xs={12}>
                        {mySkills.map((skill, index) => (
                          <SkillDiv className="border rounded ms-5 me-5 bm-5 mb-2 pt-3 pb-3 d-flex flex-row justify-content-between">
                            <div className="d-flex flex-row">
                              <img
                                src={menu}
                                alt=""
                                height="30px"
                                className="ms-5 me-5"
                              />
                              <h4 className="pt-2">
                                {skill.name}({skill.percentage}%)
                              </h4>
                            </div>
                            <div>
                              <Button
                                variant="contained"
                                size="small"
                                style={{
                                  backgroundColor: colors.becomePartnerGreen,
                                }}
                                className="me-5"
                                sx={{ height: 30 }}
                                onClick={() => {
                                  removeMySkillHandeler(skill.name);
                                }}
                              >
                                X
                              </Button>
                            </div>
                          </SkillDiv>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              {/* Enter Skills Box Ends here */}
            </div>
          </MainDiv>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
        >
          <Box
            width={{ sx: "100%", md: "70%" }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <p style={{ color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              expedita, cum, fugit quia sapiente repellendus labore, aspernatur
              in similique tempore illum su
            </p>
            {/* Header Start */}
            <div
              style={{ width: "100%", height: "1px", overflow: "hidden" }}
              className="d-flex justify-content-center "
            ></div>
            <Grid container display={"flex"} justifyContent={"center"}></Grid>

            {/* Header End */}
            <Box
              sx={{ width: "90%", marginLeft: "5vw" }}
              // style={{ height: "auto", backgroundColor: "black" }}
            >
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                display={"flex"}
                justifyContent={"space-around"}
              >
                <Grid item xs={11}>
                  <HeaderDiv>
                    <div className="ps-2 d-flex flex-row align-items-center">
                      <ActivePageMarker></ActivePageMarker>
                      <HeaderP className="pt-1">Add Your Experience</HeaderP>
                    </div>
                  </HeaderDiv>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <TextField
                    id="outlined-basic"
                    label="Company Title"
                    variant="outlined"
                    sx={{ width: 270 }}
                    className="mt-3"
                    value={jobExperienceVar.companyTitle}
                    onChange={(e) => {
                      setJobExperienceVar({
                        ...jobExperienceVar,
                        companyTitle: e.target.value,
                      });
                      console.log(jobExperienceVar.companyTitle);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Years}
                    sx={{ width: 270 }}
                    value={jobExperienceVar.startingDate}
                    onChange={(event, newvalue) => setJobStartingDate(newvalue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Starting Year"
                        className="mt-3"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Years}
                    sx={{ width: 270 }}
                    value={jobExperienceVar.endingDate}
                    onChange={(event, newvalue) => setJobEndingDate(newvalue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ending Year"
                        className="mt-3"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <TextField
                    id="outlined-basic"
                    label="Your Job Title"
                    variant="outlined"
                    sx={{ width: 270 }}
                    className="mt-3"
                    value={jobExperienceVar.jobTitle}
                    onChange={(e) => {
                      setJobExperienceVar({
                        ...jobExperienceVar,
                        jobTitle: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: colors.becomePartnerGreen }}
                    sx={{
                      height: 30,
                      width: { xs: "90%", sm: "25%", md: "25%", lg: "25%" },
                    }}
                    onClick={() => {
                      setJobExpArr([...jobExpArr, jobExperienceVar]);
                    }}
                  >
                    Add Experience
                  </Button>
                </Grid>
                <Grid item xs={12} sm={10} className="mt-2">
                  {jobExpArr.map((jb) => (
                    <div
                      style={{ width: "100%", height: "auto" }}
                      className="mt-3 pt-3 pb-3 ps-3 border rounded d-flex flex-row justify-content-between align-items-center"
                    >
                      <img src={menu} alt="" width={20} />
                      <h4 className="d-flex align-items-center">
                        {jobExperienceVar.companyTitle} ({" "}
                        {jobExperienceVar.startingDate} -{" "}
                        {jobExperienceVar.endingDate})
                      </h4>
                      <Button
                        variant="contained"
                        sx={{ height: 30, width: 10 }}
                        style={{
                          backgroundColor: colors.becomePartnerGreen,
                        }}
                        onClick={() => {
                          removeJobExpHandeler(jb.companyTitle);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>
            {/* Job Experience End */}
            {/* Education Start */}
            {/* Header Start */}
            <div
              style={{ width: "65%", height: "1px", overflow: "hidden" }}
              className="d-flex justify-content-center"
            ></div>

            {/* Header End */}
            <Box
              sx={{ width: "90%", marginLeft: "5vw" }}
              // style={{ height: "auto", backgroundColor: "black" }}
            >
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item xs={11} my={1}>
                  <HeaderDiv>
                    <div className="ps-2 d-flex flex-row align-items-center">
                      <ActivePageMarker></ActivePageMarker>
                      <HeaderP className="pt-1">Add Your Education</HeaderP>
                    </div>
                  </HeaderDiv>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <TextField
                    id="outlined-basic"
                    label="Institute Title"
                    variant="outlined"
                    sx={{ width: 270 }}
                    className="mt-3"
                    value={eduVar.instituteTitle}
                    onChange={(e) => {
                      setEduVar({
                        ...eduVar,
                        instituteTitle: e.target.value,
                      });
                      console.log(eduVar.instituteTitle);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Years}
                    sx={{ width: 270 }}
                    value={eduVar.startingDate}
                    onChange={(event, newvalue) => setEduStartingDate(newvalue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Starting Year"
                        className="mt-3"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Years}
                    sx={{ width: 270 }}
                    value={eduVar.endingDate}
                    onChange={(event, newvalue) => setEduEndingDate(newvalue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ending Year"
                        className="mt-3"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <TextField
                    id="outlined-basic"
                    label="Education Title"
                    variant="outlined"
                    sx={{ width: 270 }}
                    className="mt-3"
                    value={eduVar.educationTitle}
                    onChange={(e) => {
                      setEduVar({
                        ...eduVar,
                        educationTitle: e.target.value,
                      });
                      console.log(eduVar.educationTitle);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 30,
                      width: { xs: "90%", sm: "25%", md: "25%", lg: "25%" },
                    }}
                    style={{ backgroundColor: colors.becomePartnerGreen }}
                    onClick={() => {
                      setEducationArr([...educationArr, eduVar]);
                    }}
                  >
                    Add Education
                  </Button>
                </Grid>
                <Grid item xs={12} sm={10} className="mt-2 mb-3">
                  {educationArr.map((eduVar) => (
                    <div
                      style={{ width: "100%", height: "auto" }}
                      className="mt-3 pt-3 pb-3 ps-3 border rounded d-flex flex-row justify-content-between align-items-center"
                    >
                      <img src={menu} alt="" width={20} />
                      <h4 className="d-flex align-items-center">
                        {eduVar.educationTitle} ( {eduVar.startingDate} -{" "}
                        {eduVar.endingDate})
                      </h4>
                      <Button
                        variant="contained"
                        sx={{ height: 30, width: 10 }}
                        style={{
                          backgroundColor: colors.becomePartnerGreen,
                        }}
                        onClick={() => {
                          removeEduExpHandeler(eduVar.educationTitle);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>
            {/* Achivments Start */}
            <Box
              sx={{ width: "90%", marginLeft: "5vw" }}
              // style={{ height: "auto", backgroundColor: "black" }}
            >
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item xs={11}>
                  <HeaderDiv>
                    <div className="ps-2 d-flex flex-row align-items-center">
                      <ActivePageMarker></ActivePageMarker>
                      <HeaderP className="pt-1">Add Your Achivments</HeaderP>
                    </div>
                  </HeaderDiv>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="d-flex justify-content-center mt-2"
                >
                  <TextField
                    id="outlined-basic"
                    label="Achivement Title"
                    variant="outlined"
                    sx={{ width: { xs: 270, sm: "88%", md: "85%" } }}
                    className="mt-3"
                    value={achivementVar.achivementTitle}
                    onChange={(e) => {
                      setAchivementVar({
                        ...achivementVar,
                        achivementTitle: e.target.value,
                      });
                      console.log(achivementVar.achivementTitle);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="mt-3 mb-3 d-flex justify-content-center"
                >
                  <Box width={{ xs: 270, sm: "88%", md: "85%" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Discription"
                      placeholder="Enter discription"
                      multiline
                      fullWidth
                      rows={10}
                      value={achivementVar.achivementDiscription}
                      onChange={(e) => {
                        setAchivementVar({
                          ...achivementVar,
                          description: e.target.value,
                        });
                        console.log(achivementVar.achivementDiscription);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Years}
                    sx={{ width: 270 }}
                    value={achivementVar.startingDate}
                    onChange={(event, newvalue) =>
                      setAchivementVar({
                        ...achivementVar,
                        startingDate: newvalue.year,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Starting Year"
                        className="mt-3"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="d-flex justify-content-center mt-2"
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Years}
                    sx={{ width: 270 }}
                    value={achivementVar.endingDate}
                    onChange={(event, newvalue) =>
                      setAchivementVar({
                        ...achivementVar,
                        endingDate: newvalue.year,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ending Year"
                        className="mt-3"
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 30,
                      width: { xs: "90%", sm: "25%", md: "25%", lg: "25%" },
                    }}
                    style={{ backgroundColor: colors.becomePartnerGreen }}
                    onClick={() => {
                      setAchivementsArr([...achivementsArr, achivementVar]);
                    }}
                  >
                    Add Achivemnets
                  </Button>
                </Grid>

                <Grid item xs={12} sm={10} className="mt-2 mb-3">
                  {achivementsArr.map((ach) => (
                    <div
                      style={{ width: "100%", height: "auto" }}
                      className="mt-3 pt-3 pb-3 ps-3 border rounded d-flex flex-row justify-content-between align-items-center"
                    >
                      <img src={menu} alt="" width={20} />
                      <h4 className="d-flex align-items-center">
                        {ach.achivementTitle} ( {ach.startingDate} -{" "}
                        {ach.endingDate})
                      </h4>
                      <Button
                        variant="contained"
                        sx={{ height: 30, width: 10 }}
                        style={{
                          backgroundColor: colors.becomePartnerGreen,
                        }}
                        onClick={() => {
                          setAchivementsArr(
                            achivementsArr.filter(
                              (achivementsArr) =>
                                achivementsArr.achivementTitle !==
                                ach.achivementTitle
                            )
                          );
                        }}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>
            {/* Achivments End */}
            <Grid conatiner display={"flex"} justifyContent={"center"}>
              <Grid item xs={10}>
                <div>
                  <div className="border rounded pt-1 pb-1 mt-2 mb-5 ps-5 pe-5">
                    <Grid container>
                      <Grid item sm={12} md={10}>
                        <h4 className="text-center mt-3">
                          Update all the latest chages made by you. By clicking
                          on 'Save and Continue' button, you will be redirected
                          to the next page.
                        </h4>
                      </Grid>
                      <Grid
                        xs={12}
                        md={2}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div>
                          <Button
                            variant="contained"
                            sx={{ height: 30 }}
                            style={{
                              backgroundColor: colors.becomePartnerGreen,
                            }}
                            onClick={() => {
                              handelContinue();
                            }}
                          >
                            Save&nbsp;and&nbsp;Continue
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Footer></Footer>
        </Grid>
      </Grid>
    </div>
  );
}

const MainDiv = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    width: 60%;
  }
`;

const HeaderDiv = styled.div`
  height: 40px;
  background-color: #f2f2f2;
  border-radius: 3px;
`;
const BoxOuterDiv = styled.div`
  @media (min-width: 768px) {
    width: 90%;
  }
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

//Upload Photos Section
const UplaodButttonBox = styled.div`
  margin-left: 1vw;
  margin-right: 1vw;
  padding-top: 1vh;
  padding-left: 1vw;
  height: auto;
  width: 100%;
  border-style: dashed;
  border-radius: 6px;
  border-color: #f2f2f2;
  @media (min-width: 768px) {
    margin-left: 3.3vw;
    margin-right: 3.3vw;
  }
`;
const ProfileImageDiv = styled.div`
  width: 150px;
  height: 24vh;
  margin-bottom: 2vh;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  overflow: hidden;
  @media (min-width: 300px) {
    display: flex;
    // flex-direction: row;
  }
`;
const BannerImageDiv = styled.div`
  width: 95%;
  height: 24vh;
  margin-bottom: 2vh;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  overflow: hidden;
  @media (min-width: 300px) {
    display: flex;
    justify-content: center;
  }
`;

const CityNameDiv = styled.div`
  @media (max-width: 900px) {
    margin-top: 2vh;
  }
`;
const SkillDiv = styled.div`
  min-height: 40px;
`;

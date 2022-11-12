import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { mobile, tablet, miniTablet, miniPc, pc } from "../../responsive";
import ActivePageMarker from "../../components/ActivePageMarker/ActivePageMarker";
import { height } from "@mui/system";
import { Years } from "../../utils/Years";
import menu from "../../utils/menu.png";
import CustomTextInpputD from "../../components/CustomTextInpputD/CustomTextInpputD";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer";
import colors from "../../utils/colors";

export default function PInfoExperienceAndEducation() {
  const navigate = useNavigate();

  const [jobExpArr, setJobExpArr] = React.useState([]);
  const [educationArr, setEducationArr] = React.useState([]);
  const [eduVar, setEduVar] = React.useState({
    instituteTitle: "",
    startingDate: null,
    endingDate: null,
    educationTitle: "",
    educationDescription: "",
  });
  const [jobExperienceVar, setJobExperienceVar] = React.useState({
    instituteTitle: "",
    startingDate: "",
    endingDate: null,
    jobTitle: "",
    jobDiscription: "",
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

  const jobDiscriptionHandleChange = (e) => {
    setJobExperienceVar({
      ...jobExperienceVar,
      [e.target.name]: e.target.value,
    });
  };
  const eduDiscriptionHandleChange = (e) => {
    setEduVar({
      ...eduVar,
      [e.target.name]: e.target.value,
    });
    console.log(eduVar);
  };

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
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <HeaderLoggedIn></HeaderLoggedIn>
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
                <Grid item xs={12} className="mt-2">
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
                          backgroundColor: "#FF5852",
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
                <Grid item xs={11}>
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
                <Grid item xs={12} className="mt-2 mb-3">
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
                          backgroundColor: "#FF5852",
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
                      setEducationArr([...educationArr, eduVar]);
                    }}
                  >
                    Add Education
                  </Button>
                </Grid>

                <Grid item xs={12} className="mt-2 mb-3">
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
                          backgroundColor: "#FF5852",
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
                            onClick={() => navigate("/home")}
                          >
                            Save and Continue
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
      </Grid>
      <Footer></Footer>
    </div>
  );
}
const HeaderDiv = styled.div`
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
const BoxDiv = styled.div`
  ${mobile({ width: "90%" })}
  ${miniTablet({ width: "90%" })}
${tablet({ width: "90%" })}
`;

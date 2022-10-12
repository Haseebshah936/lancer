import React from "react";
import { useNavigate } from "react-router-dom";
import { mobile, tablet, miniTablet } from "../responsive";
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

import ActivePageMarker from "./../components/ActivePageMarker";
import profileImageTemplate from "../utils/ProfilePicDemo.webp";
import bannerImageTemplate from "../utils/bannerImage.webp";
import menu from "../utils/menu.png";
import { CountryNAME } from "../utils/Countries";
import { colors } from "../utils/colors";
import { height, width } from "@mui/system";

export default function PInfoPersonalDetailsAndSkills() {
  const navigate = useNavigate();
  const [gender, setGender] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [mySkills, setMySkill] = React.useState([]);
  const [mySkillName, setMySkillName] = React.useState("");
  const [mySkillPercentage, setMySkillPercentage] = React.useState("");

  const [bannerimages, setBannerimages] = React.useState([]);

  const maxNumber = 3;
  const MaxBanners = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const onBnnerChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setBannerimages(imageList);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
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

  return (
    <MainDiv className="p-3 rounded">
      {/* Header Start */}
      <div className="ps-2 pe-2 pb-3 rounded">
        <div className="mt-2 border p-2 rounded">
          <HeaderDiv>
            <div className="ps-2 d-flex flex-row align-items-center">
              <ActivePageMarker></ActivePageMarker>
              <HeaderP className="pt-1">Your Details</HeaderP>
            </div>
          </HeaderDiv>
        </div>
        {/* Header End */}
        {/* Personal Details Start */}
        <div className="d-flex justify-content-center">
          <BoxOuterDiv>
            <Grid container>
              <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={handleChange}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                  <TextField fullWidth label="First Name" id="fullWidth" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                  <TextField fullWidth label="Last Name" id="fullWidth" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                  <TextField
                    fullWidth
                    label="$ Your Service Hourly Rate"
                    id="fullWidth"
                  />
                </div>
              </Grid>
              <Grid item xs={12} mt={1}>
                <div className="ms-2 me-2 mt-2">
                  <TextField
                    fullWidth
                    label="Add Your Tagline Here"
                    id="fullWidth"
                  />
                </div>
              </Grid>
              <Grid item xs={12} mt={1}>
                <div className="ms-2 me-2 mt-2">
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={6}
                    // defaultValue="Description"
                  />
                </div>
              </Grid>
            </Grid>
          </BoxOuterDiv>
        </div>
        {/* Personal Details End */}

        {/* upload Profile Photos Box Starts */}
        <div className="mt-4 p-2">
          <div className="block"></div>
          <Grid container>
            <Grid item xs={12}>
              <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                  <ActivePageMarker></ActivePageMarker>
                  <HeaderP className="pt-1">Profile Photo</HeaderP>
                </div>
              </HeaderDiv>
            </Grid>
            <Grid item xs={12}>
              <p className="mt-2 ms-3">
                Select and uplaod three photos that you want to show as your
                profile picture.
              </p>
            </Grid>

            <Grid item xs={12}>
              <div className="d-flex flex-row">
                <UplaodButttonBox>
                  <div>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                      acceptType={["jpg"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div>
                          <Button
                            variant="contained"
                            size="large"
                            style={{
                              backgroundColor: "#00CC8D",
                              marginBottom: 10,
                            }}
                            onClick={onImageUpload}
                          >
                            Select File
                          </Button>
                          <Grid
                            container
                            className="d-flex justify-content-center"
                          >
                            {imageList.map((image, index) => (
                              <Grid item xm={12} sm={6} md={4}>
                                <div key={index}>
                                  <ProfileImageDiv>
                                    <img
                                      src={image.data_url}
                                      alt=""
                                      width="150"
                                    />
                                  </ProfileImageDiv>
                                  <div>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      style={{
                                        backgroundColor: "#00CC8D",
                                        marginBottom: 10,
                                      }}
                                      className="ms-2"
                                      onClick={() => onImageUpdate(index)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      style={{
                                        backgroundColor: "#00CC8D",
                                        marginBottom: 10,
                                      }}
                                      className="ms-md-4 ms-3"
                                      onClick={() => onImageRemove(index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                  {images?.length > 0 ? (
                    <div></div>
                  ) : (
                    <ProfileImageDiv>
                      <div>
                        <img src={profileImageTemplate} width="150px"></img>
                      </div>
                    </ProfileImageDiv>
                  )}
                </UplaodButttonBox>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* upload Profile Box Starts */}
        {/* upload Banner Photo Box Starts */}
        <div className="mt-4 p-2">
          <div className="block"></div>
          <Grid container>
            <Grid item xs={12}>
              <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                  <ActivePageMarker></ActivePageMarker>
                  <HeaderP className="pt-1">Banner Photo</HeaderP>
                </div>
              </HeaderDiv>
            </Grid>
            <Grid item xs={12}>
              <p className="mt-2 ms-3">
                Select and uplaod Banner photo that you want to show as your
                profile Banner.
              </p>
            </Grid>

            <Grid item xs={12}>
              <div className="d-flex flex-row">
                <UplaodButttonBox>
                  <div>
                    <ImageUploading
                      multiple
                      value={bannerimages}
                      onChange={onBnnerChange}
                      maxNumber={MaxBanners}
                      dataURLKey="data_url"
                      acceptType={["jpg"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                      }) => (
                        // write your building UI
                        <div>
                          <Button
                            variant="contained"
                            size="large"
                            style={{
                              backgroundColor: "#00CC8D",
                              marginBottom: 10,
                            }}
                            onClick={onImageUpload}
                          >
                            Select Banner Image
                          </Button>

                          <div>
                            {imageList.map((image, index) => (
                              <Grid item xm={12} sm={6} md={4}>
                                <div key={index}>
                                  <BannerImageDiv>
                                    <img src={image.data_url} alt="" />
                                  </BannerImageDiv>
                                  <div>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      style={{
                                        backgroundColor: "#00CC8D",
                                        marginBottom: 10,
                                      }}
                                      className="ms-2"
                                      onClick={() => onImageUpdate(index)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      style={{
                                        backgroundColor: "#00CC8D",
                                        marginBottom: 10,
                                      }}
                                      className="ms-md-4 ms-3"
                                      onClick={() => onImageRemove(index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </Grid>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                  {bannerimages?.length > 0 ? (
                    <div></div>
                  ) : (
                    <BannerImageDiv>
                      <div>
                        <img src={bannerImageTemplate}></img>
                      </div>
                    </BannerImageDiv>
                  )}
                </UplaodButttonBox>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* upload Banner Photo Box Starts */}

        {/* Select countries Box Starts */}
        <div className="mt-4 p-2">
          <div className="block"></div>
          <Grid container>
            <Grid item xs={12}>
              <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                  <ActivePageMarker></ActivePageMarker>
                  <HeaderP className="pt-1">Your Location</HeaderP>
                </div>
              </HeaderDiv>
            </Grid>

            <Grid item xs={12} className="pt-4 d-flex justify-content-center">
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className="d-flex justify-content-center"
                >
                  <CityNameDiv className="d-flex justify-content-center me-md-4 me-sm-4">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={CountryNAME}
                      sx={{ width: 270 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                    />
                  </CityNameDiv>
                </Grid>
                <Grid
                  item
                  xs={11}
                  md={6}
                  className="d-flex justify-content-center"
                >
                  <CityNameDiv className="d-flex justify-content-center ms-5">
                    <TextField
                      id="outlined-basic"
                      label="Enter City"
                      variant="outlined"
                      sx={{ width: 270 }}
                    />
                  </CityNameDiv>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {/* Select countries Box ends */}

        {/* Enter Skills Box Starts */}
        <div className="mt-4 p-2">
          <div className="block"></div>
          <Grid container>
            <Grid item xs={12}>
              <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                  <ActivePageMarker></ActivePageMarker>
                  <HeaderP className="pt-1">My Skills</HeaderP>
                </div>
              </HeaderDiv>
            </Grid>
            {/* Adding the SKills */}
            <Grid item xs={12}>
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
                    style={{ backgroundColor: "#FF5852" }}
                    sx={{ width: 100, height: 35 }}
                    onClick={addMySkillHandeler}
                  >
                    add skill
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* SHOWING THE ADDED sKILLS */}
            <Grid item xs={12}>
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
                          style={{ backgroundColor: "#FF5852" }}
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
      <div>
        <div className="border rounded pt-1 pb-1 mt-2 mb-5 ps-5 pe-5">
          <Grid container>
            <Grid item sm={12} md={10}>
              <h4 className="text-center mt-3">
                Update all the latest chages made by you. By clicking on 'Save
                and Continue' button, you will be redirected to the next page.
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
                  style={{ backgroundColor: "#FF5852" }}
                  onClick={() => navigate("/pinfo/experienceandeducation")}
                >
                  Save and Continue
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    width: 80%;
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
  width: 55vw;
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

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import styled from "styled-components";
import ActivePageMarker from "./../components/ActivePageMarker";

export default function PInfoPersonalDetailsAndSkills() {
  const [imageUploadProgress, setimageUploadProgress] = React.useState(10);
  const options = [
    { label: "Male", id: 1 },
    { label: "Female", id: 2 },
  ];
  React.useEffect(() => {
    const timer = setInterval(() => {
      setimageUploadProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="ms-5 border p-2 rounded ">
      <YourDetailsDiv>
        <div className="d-flex to-row">
          <ActivePageMarker></ActivePageMarker>
          <p className="fs-2">Your Details</p>
        </div>
      </YourDetailsDiv>
      <YourDetailsDiv>
        {/* Fisrt Row */}
        <div className="d-flex to-row">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Gender" />}
          />
          <div className="ms-5">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              sx={{ width: 300 }}
            />
          </div>
        </div>
        {/* Second Row */}
        <div className="d-flex to-row mt-3">
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            sx={{ width: 300 }}
          />
          <div className="ms-5">
            <TextField
              id="outlined-basic"
              label="Your Service Hourly Rate $"
              variant="outlined"
              sx={{ width: 300 }}
            />
          </div>
        </div>
        {/* Third Row */}
        <div className="mt-3">
          <TextField
            id="outlined-basic"
            label="Add Your Tagline Here"
            variant="outlined"
            sx={{ width: 630 }}
          />
        </div>
        {/* Fourth Row */}
        <div className="mt-4">
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            sx={{ width: 630 }}
            // defaultValue="Description"
          />
        </div>
      </YourDetailsDiv>

      {/* image upload Box */}
      {/* <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={imageUploadProgress} />
        </Box> */}
      {/* <ImageUploadBox></ImageUploadBox>s */}

      <CompanyDetailsBox>
        {/* Header */}
        <div className="mt-3 ms-3 d-flex to-row">
          <ActivePageMarker></ActivePageMarker>
          <p className="fs-2">Profile Photo</p>
        </div>
        <div className="ms-3">
          <p>Upload your images</p>
        </div>
      </CompanyDetailsBox>
    </div>
  );
}
const TitleBox = styled.div`
  width: 60vw;
  height: 40px;
  background-color: #fcfcfc;
  // display: flex;
  // // align-content: center;
  // // // justify-content: center;
`;
const YourDetailsDiv = styled.div`
  padding: 1rem;
`;
const ImageUploadBox = `
`;
const CompanyDetailsBox = styled.div`
  text-align: start;
`;

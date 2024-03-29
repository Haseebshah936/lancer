import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Divider, Box } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import colors from "../../utils/colors";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function DeliveredTheOrderTimeLine() {
  const [orderRequirementsVar, setOrderRequirementsVar] = useState({
    titleText: "Sent the Requirements",
    time: "Nov 5, 3:49 PM",
    textFromFreelancer: "Files are attached.",
    submissionFileLinks: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
  });

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
          <UserNameP>{orderRequirementsVar.userName}</UserNameP>
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{orderRequirementsVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{orderRequirementsVar?.time}</TimeP>
        </Box>
        <RequirementBox>
          <RequirementTitleBox>
            <RequirementP>Attachments</RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            From Freelancer
            <RequirementDescriptionP>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {orderRequirementsVar?.textFromFreelancer}
            </RequirementDescriptionP>
            <FilesOuterBox>
              {orderRequirementsVar?.submissionFileLinks.map((link, index) => {
                return <FilesBox key={index}></FilesBox>;
              })}
            </FilesOuterBox>
            {orderRequirementsVar?.submissionFileLinks.map((link, index) => {
              return (
                <RequirementDescriptionLinksP key={index}>
                  {link}
                </RequirementDescriptionLinksP>
              );
            })}
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
  color: ${colors.becomePartnerGreen};
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

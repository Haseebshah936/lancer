import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Divider, Box } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import colors from "../../utils/colors";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function RequirementsTimelineItem({
  userName,
  requirementDescription,
  requirementDescriptionLinks,
  time,
}) {
  const [orderRequirementsVar, setOrderRequirementsVar] = useState({
    userName,
    titleText: "Sent the Requirements",
    time,
    requirementDescription,
    requirementDescriptionLinks,
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
          <TimeP>{orderRequirementsVar.time}</TimeP>
        </Box>
        <RequirementBox
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowWrap: "word-break",
          }}
          maxWidth={{ xs: "100%", sm: "100%" }}
        >
          <RequirementTitleBox>
            <RequirementP>REQUIREMENTS</RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            Please contact before place an order and provide every necessary
            info required.
            <RequirementDescriptionP>
              <div style={{ display: "flex", wordBreak: "break-all" }}>
                {orderRequirementsVar?.requirementDescription}
              </div>
            </RequirementDescriptionP>
            {orderRequirementsVar?.requirementDescriptionLinks?.map(
              (link, index) => {
                return (
                  <RequirementDescriptionLinksP key={index}>
                    <div style={{ display: "flex", wordBreak: "break-all" }}>
                      {link}
                    </div>
                  </RequirementDescriptionLinksP>
                );
              }
            )}
            {orderRequirementsVar?.requirementDescriptionLinks?.length ===
              0 && (
              <RequirementDescriptionLinksP>
                {"No Links or files are provided."}
              </RequirementDescriptionLinksP>
            )}
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
  word-break: break-all;
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
  display: flex;
  overflow-wrap: break-word;
`;
const RequirementDescriptionLinksP = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0px;
  color: ${colors.becomePartnerGreen};
`;

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
import { requestMethod } from "../../requestMethod";
import { handleError } from "../../utils/helperFunctions";
import { toast } from "react-toastify";

export default function RequestForRequirements({ pID }) {
  const [orderRequirementsVar, setOrderRequirementsVar] = useState({
    userName: "Umer Abid",
    titleText: "Sent the Requirements",
    time: "Nov 5, 3:49 PM",
    requirementDescription:
      "All the requirements are sent to the seller. and here are some extra links for the seller to check out.",
    requirementDescriptionLinks: [
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
        <Box className="d-flex to-row"></Box>
        <RequirementBox>
          <RequirementTitleBox>
            <RequirementP> Request for Requirements</RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            <Box marginBottom={1}>
              If requirements are not met, request for the more requirements.
            </Box>
            <Box marginBottom={1}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.becomePartnerGreen,
                  color: "white",
                  "&:hover": {
                    backgroundColor: colors.becomePartnerGreen,
                  },
                }}
                onClick={() => {
                  console.log("Request for Requirements", pID);
                  requestMethod
                    .put("project/requestRequirement/" + pID)
                    .then((res) => {
                      console.log("Request for Requirements", res);
                      toast.success("Request for Requirements sent");
                    })
                    .catch((err) => {
                      // handleError(err);
                      toast.success(
                        "Request for Requirements sent, wait for the seller to response"
                      );
                    });
                }}
              >
                Request for Requirements
              </Button>
            </Box>
          </RequirementDescriptionBox>
        </RequirementBox>
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          mt={{ xs: 1, sm: 1 }}
        >
          <Grid item xs={12}></Grid>
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

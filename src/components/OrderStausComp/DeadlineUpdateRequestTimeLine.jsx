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

export default function DeadlineUpdateRequestTimeLine() {
  const [orderTimeChangedVar, setOrderRequirementsVar] = useState({
    userName: "Umer Abid",
    titleText: "Requested for Deadline Update",
    time: "Nov 5, 3:49 PM",
    timeChangedFrom: "Nov 5, 3:49 PM",
    timeChangedTo: "Nov 5, 3:49 PM",
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
          <UserNameP>{orderTimeChangedVar.userName}</UserNameP>
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{orderTimeChangedVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{orderTimeChangedVar.time}</TimeP>
        </Box>
        <RequirementBox>
          <RequirementTitleBox>
            <RequirementP>New requested Deadline from</RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            <Grid container>
              <Grid item xs={4}>
                <TimeChangedP>
                  {orderTimeChangedVar.timeChangedFrom}
                </TimeChangedP>
              </Grid>
              <Grid item xs={4}>
                <TimeChangedPBold>
                  {orderTimeChangedVar.timeChangedTo}
                </TimeChangedPBold>
              </Grid>
            </Grid>
          </RequirementDescriptionBox>
        </RequirementBox>

        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          mt={{ xs: 1, sm: 1 }}
        >
          <Grid container item xs={12} marginBottom={1}>
            <Grid item xs={9}></Grid>
            <Grid
              item
              xs={12}
              sm={3}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.becomePartnerButtonGreen,
                  color: "white",

                  fontSize: "1.2rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: colors.becomePartnerButtonGreen,
                  },
                }}
              >
                Accept
              </Button>
              <Box marginLeft={{ xs: 0, sm: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.becomePartnerButtonGreen,
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: colors.becomePartnerButtonGreen,
                    },
                  }}
                >
                  Reject
                </Button>
              </Box>
            </Grid>
          </Grid>
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
const TimeChangedP = styled.p`
  font-size: 1.35rem;
  font-weight: 400;
`;
const TimeChangedPBold = styled.p`
  font-size: 1.35rem;
  font-weight: 600;
`;

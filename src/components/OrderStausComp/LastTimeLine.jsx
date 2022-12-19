import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Divider, Box } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import colors from "../../utils/colors";
import WorkIcon from "@mui/icons-material/Work";

export default function LastTimeLine() {
  const [palcedOrderVar, setPlacedOrderVar] = useState({
    // userName: "Umer Abid",
    titleText: "ORDER PROGRESS SO FAR",
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
          <WorkIcon fontSize="large" />
        </TimelineDot>
        {/* <TimelineConnector sx={{ bgcolor: colors.becomePartnerGreen }} /> */}
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Box
          className="d-flex to-row border rounded p-2 align-items-center pt-3 pb-1"
          style={{ backgroundColor: "#efeff0" }}
        >
          {/* <UserNameP>{palcedOrderVar.userName}</UserNameP> */}
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{palcedOrderVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
        </Box>
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
  color: "#62646A";
`;
const TimeP = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  // font-weight: 600;
  color: "#9B9DA5";
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Grid,
  Button,
  Divider,
  Box,
  Avatar,
  Rating,
  TextField,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import colors from "../../utils/colors";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function ClientGotReviewTimeLine() {
  const [reviewVar, setReviewVar] = useState({
    userName: "Umer Abid",
    freelancerImageUrl:
      "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    titleText: "Freelancer gave you rating & review",
    time: "Nov 5, 3:49 PM",
    textFromFreelancer:
      "it was a great experience working with you.it was a great experience working with you.",
    rating: 4,
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
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{reviewVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <UserNameP>{reviewVar?.userName}</UserNameP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{reviewVar?.time}</TimeP>
        </Box>
        <RequirementBox>
          <RequirementTitleBox>
            <RequirementP>
              <UserNameP>
                {/* {reviewVar.userName} */}
                <ReviewP>&nbsp;Your Review</ReviewP>
              </UserNameP>
            </RequirementP>
          </RequirementTitleBox>
          <ReviewBox>
            <Grid container>
              <Grid item xs={3} sm={1}>
                <Avatar src={reviewVar?.freelancerImageUrl} alt={"image"} />
              </Grid>
              <Grid
                container
                item
                xs={8}
                dispaly={"flex"}
                flexDirection={"row"}
                sm={11}
              >
                <Grid item xs={2} sm={0.4}>
                  Me&nbsp;&nbsp;
                </Grid>
                <Grid item xs={10}>
                  <Rating name="read-only" value={reviewVar.rating} readOnly />
                </Grid>
                <Grid item xs={2} sm={0.4}></Grid>
                <Grid item xs={10}>
                  <ReviewPNotBold>
                    {reviewVar.textFromFreelancer}
                  </ReviewPNotBold>
                </Grid>
              </Grid>
            </Grid>
          </ReviewBox>
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
  display: flex;
  flex-direction: row;
  color: ${colors.becomePartnerGreen};
  margin-bottom: 0px;
  white-space: nowrap;
`;
const ReviewP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0px;
`;
const ReviewPNotBold = styled.p`
  font-size: 1.3rem;
  font-weight: 200;
  color: black;
  margin-bottom: 0px;
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
const ReviewBox = styled(Box)`
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
const RatingSubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 5px;
`;
const RatingWithText = styled(Grid)``;

const GreenBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  }
`;

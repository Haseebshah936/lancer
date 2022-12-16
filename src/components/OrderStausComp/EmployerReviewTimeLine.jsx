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

export default function EmployerReviewTimeLine() {
  const [reviewVar, setReviewVar] = useState({
    userName: "Umer Abid",
    titleText: "gave you a review",
    time: "Nov 5, 3:49 PM",
    textFromEmployer: "it was a great experience working with you.",

    overAllRating: 4,
    communicationRating: 4,
    expertiseRating: 4,
    professionalismRating: 4,
    paymentRating: 4,
  });

  return (
    <TimelineItem sx={{ paddingLeft: 0 }} style={{ paddingLeft: 0 }}>
      <TimelineOppositeContent sx={{ flex: 0, margin: 0, padding: 0 }}>
        {/* 10:00 am */}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary">
          <EventNoteIcon fontSize="large" />
        </TimelineDot>
        <TimelineConnector sx={{ bgcolor: colors.becomePartnerGreen }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Box className="d-flex to-row">
          <UserNameP>{reviewVar?.userName}</UserNameP>
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{reviewVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{reviewVar?.time}</TimeP>
        </Box>
        <RequirementBox>
          <RequirementTitleBox>
            <RequirementP>
              <UserNameP>
                {reviewVar.userName}
                <ReviewP>'s&nbsp;Review</ReviewP>
              </UserNameP>
            </RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            <Grid container>
              <Grid container item xs={12}>
                <Grid item xs={0.65} display={{ xs: "none", sm: "block" }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                    sx={{ width: 40, height: 40 }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <RequirementP>
                    <UserNameP>
                      {reviewVar.userName}
                      <ReviewP>'s&nbsp;Message&nbsp;&nbsp;</ReviewP>
                      <Rating
                        name="read-only"
                        value={reviewVar.overAllRating}
                      />
                    </UserNameP>
                  </RequirementP>
                  <ReviewPNotBold>
                    &nbsp;&nbsp;&nbsp;
                    {reviewVar.textFromEmployer}
                  </ReviewPNotBold>
                </Grid>
                {/* Rating Grid */}
                <Grid container item xs={12} mt={2}>
                  <RatingWithText
                    container
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"space-evenly"}
                  >
                    <Grid item xs={5} sm={4}>
                      <RatingSubTitle>
                        Communication with the Seller
                      </RatingSubTitle>
                    </Grid>
                    <Grid item xs={5} sm={4}>
                      <Rating
                        name="read-only"
                        value={reviewVar.communicationRating}
                        readOnly
                        size="large"
                      />
                    </Grid>
                  </RatingWithText>
                  <RatingWithText
                    container
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"space-evenly"}
                  >
                    <Grid item xs={5} sm={4}>
                      <RatingSubTitle>Seller's Expertise</RatingSubTitle>
                    </Grid>
                    <Grid item xs={5} sm={4}>
                      <Rating
                        name="read-only"
                        value={reviewVar.expertiseRating}
                        readOnly
                        size="large"
                      />
                    </Grid>
                  </RatingWithText>
                  <RatingWithText
                    container
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"space-evenly"}
                  >
                    <Grid item xs={5} sm={4}>
                      <RatingSubTitle>Professsionalism</RatingSubTitle>
                    </Grid>
                    <Grid item xs={5} sm={4}>
                      <Rating
                        name="read-only"
                        value={reviewVar.professionalismRating}
                        readOnly
                        size="large"
                      />
                    </Grid>
                  </RatingWithText>
                </Grid>
                {/* Rating to the employer */}
                <Grid
                  container
                  item
                  xs={12}
                  mt={2}
                  disply={"flex"}
                  justifyContent={"center"}
                >
                  <Grid item xs={11} sm={10}>
                    <GreenBorderTextField
                      id="outlined-multiline-static"
                      fullWidth
                      label="Write a Review for the employer"
                      multiline
                      rows={6}
                    />
                  </Grid>
                </Grid>
                {/* Submit Button */}
                <Grid
                  container
                  item
                  xs={11}
                  // sm={10}
                  disply={"flex"}
                  justifyContent={"flex-end"}
                >
                  <Grid item xs={2} mt={1}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: colors.becomePartnerGreen,
                        "&:hover": {
                          backgroundColor: colors.becomePartnerGreen,
                          color: "white",
                        },
                        color: "white",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
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

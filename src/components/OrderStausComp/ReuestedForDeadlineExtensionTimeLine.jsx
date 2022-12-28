import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Divider, Box, Button } from "@mui/material";

import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import colors from "../../utils/colors";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";

export default function ReuestedForDeadlineExtensionTimeLine({
  Icon,
  data,
  setP,
  proj,
}) {
  const { user } = useRealmContext();
  const [deadlineExtenVar, setDeadlineExtenVar] = useState({
    // userName: "Umer Abid",
    titleText: data.titleText,
    time: data.time,
    reason: data.reason,
    p: data.p,
    state: data.state,
    id: data.id,
  });

  useEffect(() => {
    console.log("deadlineExtenVar", deadlineExtenVar);
  }, [deadlineExtenVar]);

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
          <Icon fontSize="large" />
        </TimelineDot>
        <TimelineConnector sx={{ bgcolor: colors.becomePartnerGreen }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Box className="d-flex to-row">
          {/* <UserNameP>{palcedOrderVar.userName}</UserNameP> */}
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{deadlineExtenVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{deadlineExtenVar.time}</TimeP>
        </Box>
        <Box
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          borderRadius="5px"
          sx={{
            padding: "10px",
          }}
        >
          <TitleTextP>Reason: {deadlineExtenVar.reason}</TitleTextP>
          <Box display={"flex"} justifyContent={"flex-end"}>
            {user?._id !== deadlineExtenVar?.p?.creatorId?._id ? (
              <div>
                {deadlineExtenVar.state === "pending" ? (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.becomePartnerGreen,
                      color: "white",
                      "&:hover": {
                        backgroundColor: colors.becomePartnerGreen,
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      toast.success(
                        "Empolyer has not yet accepted your request for deadline extension"
                      );
                    }}
                  >
                    Extension request sent
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.becomePartnerGreen,
                      color: "white",
                      "&:hover": {
                        backgroundColor: colors.becomePartnerGreen,
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      toast.success(
                        "Empolyer has accepted your request for deadline extension"
                      );
                    }}
                  >
                    Extension request Accepted
                  </Button>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            {user?._id === deadlineExtenVar.p?.creatorId?._id ? (
              deadlineExtenVar.state === "pending" ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.becomePartnerGreen,
                    color: "white",
                    "&:hover": {
                      backgroundColor: colors.becomePartnerGreen,
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    requestMethod
                      .put(
                        "project/acceptExtension/" + deadlineExtenVar?.p?._id,
                        { extensionId: deadlineExtenVar?.id }
                      )
                      .then((res) => {
                        console.log("res for haseeb", res.data);
                        setP(res.data);
                        setDeadlineExtenVar({
                          ...deadlineExtenVar,
                          state: "accepted",
                        });
                        toast.success("Deadline Extended");
                      })
                      .catch((err) => {
                        toast.error("Something went wrong");
                        console.log(err);
                      });
                  }}
                >
                  Accept Deadline Extension
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.becomePartnerGreen,
                    color: "white",
                    "&:hover": {
                      backgroundColor: colors.becomePartnerGreen,
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    toast.success("Deadline Already Extended");
                  }}
                >
                  You Extended Deadline
                </Button>
              )
            ) : null}
          </Box>
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

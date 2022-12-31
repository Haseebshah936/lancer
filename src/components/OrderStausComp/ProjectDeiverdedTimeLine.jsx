import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Divider, Box, TextField } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Joi from "joi-browser";
import colors from "../../utils/colors";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ProjectDeiverdedTimeLine({
  userName,
  requirementDescription,
  requirementDescriptionLinks,
  time,
  state,
  deliveryId,
  p,
  setP,
}) {
  const [projectDVar, setProjectDVar] = useState({
    userName,
    titleText: "delivered the project",
    time,
    requirementDescription,
    requirementDescriptionLinks,
    state,
  });
  const [dstate, setDState] = React.useState(false);
  const [reason, setRReason] = useState("");
  const handleClickOpen = () => {
    setDState(true);
  };

  const handleClose = () => {
    setDState(false);
  };

  const { user } = useRealmContext();
  console.log("state", projectDVar.state);
  const [errors, setErrors] = useState({});
  const Schema = {
    reason: Joi.string().required().min(10).label("Reason"),
  };
  const validate = () => {
    const result = Joi.validate({ reason }, Schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    setErrors(errors);
    return errors;
  };
  console.log("state", projectDVar.state);
  useEffect(() => {
    if (projectDVar.state === "completed") {
      requestMethod.get("project/" + p._id).then((res) => {
        setP(res.data);
        console.log("res.data", res.data);
      });
    }
  }, [projectDVar.state]);

  return (
    <TimelineItem sx={{ paddingLeft: 0 }} style={{ paddingLeft: 0 }}>
      <Dialog
        open={dstate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Ask for a revisions"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Send the reason for the revision to the freelance and wait for their
            response to your request. In the meantime, you can also send a
            message to the freelancer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container display={"flex"} justifyContent={"center"} mb={1}>
            <Grid item xs={11}>
              <GreenBorderTextField
                lable={"Reason for revision"}
                fullWidth
                value={reason}
                multiline
                rows={4}
                onChange={(e) => {
                  setRReason(e.target.value);
                }}
              ></GreenBorderTextField>
            </Grid>
          </Grid>
          <Button
            variant={"contained"}
            sx={{
              backgroundColor: colors.becomePartnerGreen,
              color: colors.white,
              "&:hover": {
                backgroundColor: colors.becomePartnerGreen,
                color: colors.white,
              },
            }}
            onClick={() => {
              const data = {
                deliveryId,
                reason: reason,
              };
              // project/revision/63920a9e0ca1d898b2ff7d05
              const v = validate();
              if (v) {
                toast.error(v.reason);
              } else {
                requestMethod
                  .put("project/revision/" + p._id, data)
                  .then((res) => {
                    // setP(res.data);
                    setProjectDVar({
                      ...projectDVar,
                      state: "rejected",
                    });
                    console.log("res in d", res.data);
                    toast.success("Revision request sent successfully");
                    handleClose();
                  })
                  .catch((err) => {
                    // console.log("err", err);
                    toast.error("Something went wrong please try again later");
                  });
              }
              console.log("data", data);
              // handleClose();
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <TimelineOppositeContent sx={{ flex: 0, margin: 0, padding: 0 }}>
        {/* 10:00 am */}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: colors.becomePartnerGreen,
          }}
        >
          <MarkunreadMailboxIcon fontSize="large" />
        </TimelineDot>
        <TimelineConnector sx={{ bgcolor: colors.becomePartnerGreen }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Box className="d-flex to-row">
          <UserNameP>{projectDVar.userName}</UserNameP>
          <p>&nbsp;&nbsp;</p>
          <TitleTextP>{projectDVar.titleText}</TitleTextP>
          <p>&nbsp;&nbsp;</p>
          <TimeP>{projectDVar.time}</TimeP>
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
            <RequirementP>Delivered files & links</RequirementP>
          </RequirementTitleBox>
          <RequirementDescriptionBox>
            These files and links are delivered by the freelancer.
            <RequirementDescriptionP>
              <div style={{ display: "flex", wordBreak: "break-all" }}>
                {projectDVar?.requirementDescription}
              </div>
            </RequirementDescriptionP>
            {projectDVar?.requirementDescriptionLinks?.map((link, index) => {
              return (
                <RequirementDescriptionLinksP key={index}>
                  <div style={{ display: "flex", wordBreak: "break-all" }}>
                    {link}
                  </div>
                </RequirementDescriptionLinksP>
              );
            })}
            {projectDVar?.requirementDescriptionLinks?.length === 0 && (
              <RequirementDescriptionLinksP>
                {"No Links or files are provided."}
              </RequirementDescriptionLinksP>
            )}
          </RequirementDescriptionBox>
        </RequirementBox>
        <Grid container>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            {user?._id === p?.creatorId?._id &&
            projectDVar.state === "pending" ? (
              <div style={{ marginTop: "5px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.becomePartnerGreen,
                    color: "white",
                    "&:hover": {
                      backgroundColor: colors.becomePartnerGreen,
                      color: "white",
                    },
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    setDState(true);
                  }}
                >
                  Ask for revision
                </Button>
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
                      .put("project/complete/" + p._id)
                      .then((res) => {
                        setProjectDVar({
                          ...projectDVar,
                          state: "completed",
                        });
                        toast.success("Project completed successfully");
                      })
                      .catch((err) => {
                        toast.error(
                          "Something went wrong please try again later"
                        );
                      });
                  }}
                >
                  Accept
                </Button>
              </div>
            ) : (
              <div style={{ marginTop: "5px" }}>
                {projectDVar.state === "pending" ? (
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
                    onClick={() => {}}
                  >
                    Project Submitted
                  </Button>
                ) : (
                  <div>
                    {projectDVar.state === "rejected" ? (
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
                          let text = "";
                          if (user._id === p.creatorId._id) {
                            text =
                              "Revision Request is already sent to the freelancer";
                          } else {
                            text = "Revision is requested by the client";
                          }
                          toast.success(text);
                        }}
                      >
                        Revision Requested
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
                          toast.success("Project is accepted coongratulations");
                        }}
                      >
                        Project Accepted
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </Grid>
        </Grid>
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
const GreenBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  }
  // green border on hover
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.becomePartnerGreen};
  }
`;

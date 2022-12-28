import {
  Add,
  ArrowBack,
  Call,
  Circle,
  Event,
  FiberManualRecord,
  Videocam,
} from "@mui/icons-material";
import {
  ButtonBase,
  IconButton,
  Modal,
  StepButton,
  Tooltip,
  Typography,
} from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Avatar } from "react-chat-elements";
import styled from "styled-components";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import { miniTablet, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";
import { useGoogleLogin } from "@react-oauth/google";
import displayTime from "../../utils/DateAndTime/displayTime";
import { handleError } from "../../utils/helperFunctions";
import CreateMeeting from "../CreateMeeting";
import GroupsModal from "../GroupsModal";
import dayjs from "dayjs";
import convertMiliSec from "../../utils/DateAndTime/TimeLeft";
import { timeFormat } from "../../utils/DateAndTime/TimeFormat";

function MessageHeader({
  onBackClick = () => {},
  uri = "https://avatars.githubusercontent.com/u/80540635?v=4",
  name = "Haseeb",
  status = true,
  isGroup = false,
  userId = "",
  onClickCall = () => {},
  onClickVideoCall = () => {},
  temp = true,
  toggleDrawer = () => {},
  onMeetingClick = () => {},
}) {
  const today = new Date().getTime();
  const dateToday = new Date(today).getDate();
  const monthToday = new Date(today).getMonth();
  const yearToday = new Date(today).getFullYear();
  const { activeChatroomStatus } = useCustomContext();
  const [toggle, setToggle] = useState(false);
  const [toggleMetting, setToggleMeeting] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = dayjs(new Date());
  const [details, setDetials] = useState({
    date: date.format("YYYY-MM-DD"),
    time: timeFormat(date.hour(), date.minute()),
    description: "",
  });

  const handleToggleMeeting = () => {
    setToggleMeeting(true);
  };

  const handleToggle = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  const handleAddToGroup = (chatroom) => {
    console.log(chatroom);
    requestMethod
      .put(`chatroom/addParticipant/${chatroom}`, {
        userId,
      })
      .then((res) => {
        console.log("Response", res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  };

  const googleAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        const response = await requestMethod.post("meeting", {
          code,
          ...details,
        });
        console.log("Link ", response.data);
        handleMeetingCreation(details.description, response.data);
      } catch (error) {
        handleError(error);
      }
    },
    redirect_uri: "http://localhost:3000/home",
  });

  const handleMeetingCreation = (details, link) => {
    const msg = {
      userId: 1,
      userName: "Haseeb",
      type: "meetingItem",
      data: {
        uri: link,
      },
      text: details || "Meeting Created",
    };
    setToggleMeeting(false);
    onMeetingClick(msg);
  };

  const isMatchToday = (date) => {
    const roundDate = new Date(date).getDate();
    const roundMonth = new Date(date).getMonth();
    const roundYear = new Date(date).getFullYear();
    if (
      roundDate === dateToday &&
      roundMonth === monthToday &&
      roundYear === yearToday
    )
      return true;
  };
  const handleTimeDisplay = () => {
    return isMatchToday(activeChatroomStatus?.isOnline)
      ? displayTime(
          new Date(activeChatroomStatus?.isOnline)
            .toLocaleTimeString()
            .slice(0, 5)
        )
      : new Date(activeChatroomStatus?.isOnline).toDateString();
  };

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButtonCustom onClick={onBackClick}>
          <ArrowBack fontSize="medium" />
        </IconButtonCustom>
        <Avatar src={uri} alt="avatar" size="small" type="circle" />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <ButtonBase
            sx={{
              ml: 1.5,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            LinkComponent={"h5"}
            onClick={toggleDrawer}
          >
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              {name}
            </Typography>
          </ButtonBase>
          {!isGroup && !temp && (
            <Typography
              ml={1.5}
              variant="h6"
              sx={{
                cursor: "pointer",
                display: "flex",
                fontSize: "1rem",
              }}
            >
              {activeChatroomStatus?.status ? (
                <>
                  <FiberManualRecord
                    sx={{
                      color: activeChatroomStatus?.status
                        ? colors.lightGreen
                        : colors.lightGrey,
                      alignSelf: "center",
                    }}
                  />
                  online
                </>
              ) : (
                "Last Seen at " + handleTimeDisplay()
              )}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!isGroup ? (
          <>
            <IconButton onClick={onClickVideoCall}>
              <Videocam fontSize="large" />
            </IconButton>
            <IconButton onClick={onClickCall}>
              <Call fontSize="large" />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleToggleMeeting}>
            <Event fontSize="large" />
          </IconButton>
        )}
        {!isGroup && (
          <Tooltip title="Add to group">
            <IconButton
              onClick={handleToggle}
              color="inherit"
              ari-label="add to shopping cart"
            >
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Modal
        open={toggle}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GroupsModal
          toggleClose={handleClose}
          handleAddToGroup={handleAddToGroup}
        />
      </Modal>
      <Modal
        open={toggleMetting}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateMeeting
          loading={loading}
          toggleClose={() => setToggleMeeting(false)}
          meetingDetails={details}
          setMeetingDetails={(details) => setDetials(details)}
          onSubmit={(details) => {
            setDetials(details);
            googleAuth();
          }}
        />
      </Modal>
    </Container>
  );
}

export default MessageHeader;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 2rem;
  align-items: center;
  padding-bottom: 1rem;
  min-width: auto;
  border-bottom: 1px solid ${colors.lightGrey};
  img.rce-avatar {
    object-fit: cover;
  }
  ${mobile({ paddingInline: ".5rem" })}
`;

const IconButtonCustom = styled(IconButton)`
  margin-right: 1.5rem !important;
  display: none;
  ${miniTablet({ display: "flex", marginRight: "1rem !important" })}
  ${mobile({ display: "flex", marginRight: ".0rem !important" })}
`;

import {
  Add,
  ArrowBack,
  Call,
  Event,
  FiberManualRecord,
  Videocam,
} from "@mui/icons-material";
import { ButtonBase, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { useState } from "react";
import { Avatar } from "react-chat-elements";
import styled from "styled-components";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import { miniTablet, mobile } from "../../responsive";
import colors from "../../utils/colors";
import { useGoogleLogin } from "@react-oauth/google";
import displayTime from "../../utils/DateAndTime/displayTime";
import { handleError } from "../../utils/helperFunctions";
import CreateMeeting from "../CreateMeeting";
import GroupsModal from "../GroupsModal";
import dayjs from "dayjs";
import { timeFormat } from "../../utils/DateAndTime/TimeFormat";
import CustomModal from "../CustomModal";
import { useRealmContext } from "../../db/RealmContext";
import { servers } from "../../utils/VIdeoCall/servers";
import useWebRTC from "../../Hooks/WebRTC/useWebRTC";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customerSupport } from "../../assets";

function MessageHeader({
  onBackClick = () => {},
  uri = "https://avatars.githubusercontent.com/u/80540635?v=4",
  name = "Haseeb",
  status = true,
  isGroup = false,
  userId = "",
  temp = true,
  toggleDrawer = () => {},
  onMeetingClick = () => {},
  id = "",
}) {
  const today = new Date().getTime();
  const { user } = useRealmContext();
  const dateToday = new Date(today).getDate();
  const monthToday = new Date(today).getMonth();
  const yearToday = new Date(today).getFullYear();
  const { activeChatroom, activeChatroomStatus, setCall } = useCustomContext();
  const [toggle, setToggle] = useState(false);
  const [toggleMetting, setToggleMeeting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleStartConnection } = useWebRTC();
  const date = dayjs(new Date());
  const navigate = useNavigate();

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

  const createCall = async (type) => {
    try {
      const pc = new RTCPeerConnection(servers);

      const res = await requestMethod.post("call", {
        chatroomId: id,
        callerId: user._id,
        receiverId: userId,
        offer: null,
        type,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleVideoCall = () => {
    handleStartConnection("video", id, user._id, userId)
      .then(() => {
        navigate("/meeting");
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const handleAudioCall = () => {
    handleStartConnection("audio", id, user._id, userId).catch((e) => {
      handleError(e);
    });
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
        <Avatar
          src={activeChatroom?.isCustomerSupport ? customerSupport : uri}
          alt="avatar"
          size="small"
          type="circle"
        />
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
            onClick={() => {
              if (!activeChatroom?.isCustomerSupport) toggleDrawer();
            }}
          >
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              {activeChatroom?.isCustomerSupport ? "Customer Support" : name}
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
            <IconButton onClick={handleVideoCall}>
              <Videocam fontSize="large" />
            </IconButton>
            {/* <IconButton onClick={handleAudioCall}>
              <Call fontSize="large" />
            </IconButton> */}
          </>
        ) : (
          <IconButton
            disabled={activeChatroom?.isCustomerSupport}
            onClick={handleToggleMeeting}
          >
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
      <CustomModal isVisible={toggle}>
        <GroupsModal
          toggleClose={handleClose}
          handleAddToGroup={handleAddToGroup}
        />
      </CustomModal>
      <CustomModal isVisible={toggleMetting}>
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
      </CustomModal>
    </Container>
  );
}

export default memo(MessageHeader);
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

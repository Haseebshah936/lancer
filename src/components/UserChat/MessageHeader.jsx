import {
  ArrowBack,
  Call,
  Circle,
  FiberManualRecord,
  Videocam,
} from "@mui/icons-material";
import { ButtonBase, IconButton, StepButton, Typography } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { Avatar } from "react-chat-elements";
import styled from "styled-components";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { miniTablet, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";
import displayTime from "../../utils/DateAndTime/displayTime";

function MessageHeader({
  onBackClick = () => {},
  uri = "https://avatars.githubusercontent.com/u/80540635?v=4",
  name = "Haseeb",
  status = true,
  isGroup = false,
  onClickCall = () => {},
  onClickVideoCall = () => {},
  temp = true,
}) {
  const today = new Date().getTime();
  const dateToday = new Date(today).getDate();
  const monthToday = new Date(today).getMonth();
  const yearToday = new Date(today).getFullYear();
  const { activeChatroomStatus } = useCustomContext();
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
        <IconButton onClick={onClickVideoCall}>
          <Videocam fontSize="large" />
        </IconButton>
        <IconButton onClick={onClickCall}>
          <Call fontSize="large" />
        </IconButton>
      </Box>
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

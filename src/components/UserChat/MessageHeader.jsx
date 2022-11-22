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
import { Avatar } from "react-chat-elements";
import styled from "styled-components";
import { miniTablet, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";

function MessageHeader({
  onBackClick = () => {},
  uri = "https://avatars.githubusercontent.com/u/80540635?v=4",
  name = "Haseeb",
  status = true,
  isGroup = false,
  onClickCall = () => {},
  onClickVideoCall = () => {},
}) {
  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButtonCustom onClick={onBackClick}>
          <ArrowBack sx={{ fontSize: "2rem" }} />
        </IconButtonCustom>
        <Avatar src={uri} alt="avatar" size="large" type="circle" />
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
          {!isGroup && (
            <Typography
              ml={1.5}
              variant="h6"
              sx={{ cursor: "pointer", display: "flex" }}
            >
              <FiberManualRecord
                sx={{
                  color: status ? colors.lightGreen : colors.lightGrey,
                  alignSelf: "center",
                }}
              />
              online
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={onClickVideoCall}>
          <Videocam sx={{ fontSize: "2rem" }} />
        </IconButton>
        <IconButton onClick={onClickCall}>
          <Call sx={{ fontSize: "2rem" }} />
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
  ${mobile({ paddingInline: "1rem" })}
`;

const IconButtonCustom = styled(IconButton)`
  margin-right: 1.5rem !important;
  display: none;
  ${miniTablet({ display: "flex", marginRight: "1rem" })}
`;

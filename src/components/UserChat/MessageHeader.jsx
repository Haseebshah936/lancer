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
import { miniTablet, tablet } from "../../responsive";
import colors from "../../utils/colors";

function MessageHeader(props) {
  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButtonCustom>
          <ArrowBack sx={{ width: "2rem", height: "2rem" }} />
        </IconButtonCustom>
        <Avatar
          src="https://avatars.githubusercontent.com/u/80540635?v=4"
          alt="avatar"
          size="large"
          type="circle"
        />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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
              Haseeb
            </Typography>
          </ButtonBase>
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            <FiberManualRecord sx={{ color: colors.lightGreen }} />
            online
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <Videocam sx={{ width: "2rem", height: "2rem" }} />
        </IconButton>
        <IconButton>
          <Call sx={{ width: "2rem", height: "2rem" }} />
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
  margin-bottom: 2rem;
  min-width: auto;
  border-bottom: 1px solid ${colors.lightGrey};
`;

const IconButtonCustom = styled(IconButton)`
  margin-right: 1.5rem !important;
  display: none;
  ${miniTablet({ display: "flex", marginRight: "1rem" })}
`;

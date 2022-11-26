import { Cancel, InsertDriveFile } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

export default function MediaAttachment({ attachment, i, removeAttachment }) {
  return (
    <>
      <AttachmentContainer
        key={i}
        style={{
          background: colors.white,
        }}
      >
        <Attachment
          component={attachment.type === "photo" ? "img" : attachment.type}
          src={attachment.uri}
          controls={attachment.type === "video"}
          type={attachment.type}
        />
        <ProgressBar>
          {attachment.uploading && (
            <CircularProgress
              value={attachment.progress}
              style={{
                color: colors.becomePartnerButtonGreen,
                fontSize: ".5rem",
              }}
              size={28}
              variant="determinate"
            />
          )}
          <IconButton
            onClick={() => {
              removeAttachment(i);
            }}
            sx={{
              position: "absolute",
              zIndex: 100,
              background: colors.lightGrey,
            }}
          >
            <Cancel
              style={{
                fontSize: "2rem",
                color: colors.white,
              }}
            />
          </IconButton>
        </ProgressBar>
        {attachment.type === "file" && (
          <InsertDriveFile
            style={{
              fontSize: "4rem",
              opacity: 0.5,
              position: "absolute",
              zIndex: 1,
            }}
          />
        )}
      </AttachmentContainer>
    </>
  );
}

const AttachmentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-left: 1.5rem;
  box-shadow: 3px 2px 10px 1px rgba(209, 209, 209, 0.75);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const Attachment = styled(Box)`
  width: ${(props) => (props.type === "audio" ? "25rem" : "10rem")};
  min-width: 10rem;
  height: 10rem;
  min-height: 10rem;
  object-fit: cover;
  background-color: ${(props) =>
    props.type === "audio" ? colors.audioBox : colors.white};
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
`;
const Audio = styled.audio`
  height: 4rem;
  background-color: ${colors.audioBox};
  position: absolute;
  z-index: 1;
  width: 100%;
`;

import { Cancel, Upload } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

function UploadAttachments({ attachment, setAttachment, type }) {
  const ref = useRef();

  const handleSelection = (e) => {
    const controller = new AbortController();
    const size = e.target.files[0].size / (1024 * 1024);
    if (size > (type === "video" ? 100 : 10)) {
      alert(type + " size can not be more than " + type === "video" ? 100 : 10);
      return;
    }
    setAttachment({
      uri: URL.createObjectURL(e.target.files[0]),
      controller,
      uploading: true,
      progress: 0,
    });
    uploadAttachment(e.target.files[0], controller);
  };

  const uploadAttachment = (file, controller) => {
    // console.log("CAlled");
    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setAttachment((prev) => {
            return { ...prev, uploading: true, progress: percent };
          });
        }
      },
      signal: controller.signal,
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "f8ci6zlz");
    formData.append("cloud_name", "dhc9yqbjh");
    formData.append(" return_delete_token", 1);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/dhc9yqbjh/auto/upload",
        formData,
        option
      )
      .then((res) => {
        // console.log("Response", res);
        URL.revokeObjectURL(attachment.uri);
        setAttachment((prev) => {
          return {
            ...prev,
            uploading: false,
            uri: res.data.secure_url,
          };
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") console.log(err);
        // console.log("canceled");
      });
  };

  const removeAttachment = async (i) => {
    attachment?.controller?.abort();
    setAttachment({
      uri: "",
    });
  };

  useEffect(() => {
    // console.log("attachment", attachment);
  }, [attachment]);
  return (
    <>
      <Box
        component="input"
        onChange={handleSelection}
        ref={ref}
        type="file"
        style={{ display: "none" }}
        id="file"
        accept={
          type === "img"
            ? "image/*"
            : type === "video"
            ? "video/*"
            : type === "audio"
            ? "audio/*"
            : type === "doc"
            ? "application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "image/* video/* audio/* application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      />
      <AttachmentsContainer>
        <AttachmentContainer
          style={{
            background: colors.white,
          }}
        >
          <Attachment
            component={attachment.uri && type !== "file" ? type : "div"}
            src={attachment.uri}
            controls={type === "video"}
            type={type}
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
                if (attachment.uri) removeAttachment();
                else {
                  ref.current.value = null;
                  ref.current.click();
                }
              }}
              sx={{
                position: "absolute",
                zUploadAttachment: 100,
                background: colors.lightGrey,
              }}
            >
              {attachment.uri ? (
                <Cancel
                  style={{
                    fontSize: "2rem",
                    color: colors.white,
                  }}
                />
              ) : (
                <Upload
                  style={{
                    fontSize: "2rem",
                    color: colors.white,
                  }}
                />
              )}
            </IconButton>
          </ProgressBar>
        </AttachmentContainer>
      </AttachmentsContainer>
    </>
  );
}

export default UploadAttachments;

const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  width: 100%;
  padding-bottom: 1rem;
  scrollbar-width: 0.2rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.6rem;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray};
    border-radius: 10rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-resizer {
    display: none;
  }
`;

const AttachmentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: 0.8rem;
  margin-top: 1rem;
  box-shadow: 3px 2px 10px 1px rgba(209, 209, 209, 0.75);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border: 0px;
`;

const Attachment = styled(Box)`
  width: ${(props) => (props.type === "audio" ? "35rem" : "15rem")};
  min-width: 15rem;
  height: 15rem;
  min-height: 15rem;
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

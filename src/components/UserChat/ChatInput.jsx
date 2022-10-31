import {
  AttachFile,
  AudioFile,
  Cancel,
  InsertDriveFile,
  Mic,
  Send,
} from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import colors from "../../utils/colors";
import { Avatar, Input } from "react-chat-elements";
import styled from "styled-components";
import useLongPress from "../../Hooks/useLongPress";
import { miniMobile } from "../../responsive";
import AudioRecorder from "./AudioRecorder";
import { Box } from "@mui/system";
import axios from "axios";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [audioRecording, setAudioRecording] = useState(true);
  const [clear, setClear] = useState(false);
  const inputRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const filePickerRef = useRef(null);

  // !NOTE Must add the following
  // Array of timeout listners

  const startRecording = () => {
    console.log("recording started");
  };

  const stopRecording = () => {
    console.log("recording stopped");
  };

  const onLongPress = (state) => {
    if (message) {
      setAudioRecording(false);
      return;
    }
    if (state) {
      setAudioRecording(state);
      startRecording();
      return;
    }
  };

  const sendTextMessage = (attachments) => {
    if (attachments.length > 0) {
      attachments.forEach((attachment, i) => {
        if (
          i === attachments.length - 1 &&
          attachment.type !== "file" &&
          message
        ) {
          attachment = { ...attachment, text: message };
          inputRef.current.value = "";
          setMessage("");
        }
        const { uploading, progress, ...rest } = attachment;
        onSend(rest);
      });
      setAttachments([]);
    }
    if (
      !message ||
      (message &&
        attachments.length &&
        attachments[attachments.length - 1]?.type !== "file")
    ) {
      return;
    }
    const msg = {
      userId: 1,
      userName: "Haseeb",
      type: "text",
      text: message,
    };
    inputRef.current.value = "";
    onSend(msg);
    setMessage("");
    setAudioRecording(true);
    setAttachments([]);
  };

  const uploadAttachment = (file, index, controller) => {
    // setTimeout(() => {
    //   console.log("uploaded attachment ", index);
    //   setAttachments((prev) => {
    //     const arr = [...prev];
    //     arr[index].uploading = false;
    //     return arr;
    //   });
    // }, 10000);

    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setAttachments((prev) => {
            const arr = [...prev];
            arr[index].uploading = true;
            arr[index].progress = percent;
            return arr;
          });
        }
      },
      signal: controller.signal,
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "f8ci6zlz");
    formData.append("cloud_name", "dhc9yqbjh");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dhc9yqbjh/auto/upload",
        formData,
        option
      )
      .then((res) => {
        console.log(res);
        setAttachments((prev) => {
          const arr = [...prev];
          arr[index].uploading = false;
          if (arr[index].type === "video")
            arr[index].data.videoURL = res.data.secure_url;
          else if (arr[index].type === "audio")
            arr[index].data.audioURL = res.data.secure_url;
          else arr[index].data.uri = res.data.secure_url;
          return arr;
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") console.log(err);
        console.log("canceled");
      });
  };

  const handleFileSelection = (e) => {
    const split = e.target.files[0].name.split(".");
    const extension = split[split.length - 1];
    const controller = new AbortController();
    const size = e.target.files[0].size / (1024 * 1024);
    let msg = {};
    if (extension === "mp4" || extension === "mov" || extension === "webm") {
      if (size > 100) {
        alert("Video size can not be more than 100MB");
        return;
      }
      msg = {
        userId: 1,
        userName: "Haseeb",
        type: "video",
        uploading: true,
        data: {
          videoURL: URL.createObjectURL(e.target.files[0]),
          status: {
            download: true,
          },
        },
        progress: 0,
        controller,
      };
    } else if (
      extension === "mp3" ||
      extension === "wav" ||
      extension === "ogg"
    ) {
      if (size > 10) {
        alert("Audio size can not be more than 10MB");
        return;
      }
      msg = {
        userId: 1,
        userName: "Haseeb",
        type: "audio",
        uploading: true,
        data: {
          audioURL: URL.createObjectURL(e.target.files[0]),
          status: {
            download: true,
          },
        },
        progress: 0,
        controller,
      };
    } else if (
      extension === "jpg" ||
      extension === "png" ||
      extension === "jpeg" ||
      extension === "gif"
    ) {
      if (size > 10) {
        alert("Image size can not be more than 10MB");
        return;
      }
      msg = {
        userId: 1,
        userName: "Haseeb",
        type: "photo",
        uploading: true,
        data: {
          uri: URL.createObjectURL(e.target.files[0]),
        },
        progress: 0,
        controller,
      };
    } else {
      if (size > 10) {
        alert("File size can not be more than 10MB");
        return;
      }
      msg = {
        userId: 1,
        userName: "Haseeb",
        type: "file",
        text: e.target.files[0].name,
        uploading: true,
        data: {
          uri: URL.createObjectURL(e.target.files[0]),
          status: {
            click: false,
            loading: 0,
          },
        },
        progress: 0,
        controller,
      };
    }
    console.log("Attachment", msg, attachments.indexOf(msg));
    if (attachments.indexOf(msg) === -1) {
      setAttachments([...attachments, msg]);
      uploadAttachment(e.target.files[0], attachments.length, controller);
    }
  };

  const removeAttachment = (i) => {
    attachments[i].controller.abort();
    setAttachments((prev) => {
      const arr = [...prev];
      arr[i] = {
        ...arr[i],
        removed: true,
      };
      return arr;
    });
  };

  const sendAudio = () => {};

  const onClickSend = () => {
    if (audioRecording) {
      setAudioRecording(false);
      stopRecording();
      return;
    }
    const allow = attachments.filter(
      (attachment) => attachment?.removed === undefined
    );
    sendTextMessage(allow);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPress = useLongPress(onLongPress, onClickSend, defaultOptions);

  useEffect(() => {
    console.log("attachments", attachments);
    if (attachments.length) {
      setAudioRecording(false);
      return;
    }
    setAudioRecording(true);
  }, [attachments]);

  // useLayoutEffect(() => {
  //   if (inputRef && inputRef.current) {
  //     console.log(inputRef.current.value);
  //     inputRef.current.click();
  //   }
  // }, [count]);

  // useLayoutEffect(() => {
  //   if (!message) {
  //   }
  // }, [message]);

  return (
    <>
      <Box
        component="input"
        onChange={handleFileSelection}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        id="file"
        itemID="file"
      />
      <Container>
        <AttachmentsContainer>
          {attachments.map(
            (attachment, i) =>
              !attachment?.removed && (
                <AttachmentContainer
                  key={i}
                  style={{
                    background:
                      attachment.type === "file" ? colors.white : colors.white,
                  }}
                >
                  <Attachment
                    component={
                      attachment.type === "photo"
                        ? "img"
                        : attachment.type === "audio"
                        ? "div"
                        : attachment.type
                    }
                    src={
                      attachment.type === "photo" || attachment.type === "file"
                        ? attachment.data.uri
                        : attachment.data.videoURL
                        ? attachment.data.videoURL
                        : attachment.data.audioURL
                    }
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
                  {attachment.type === "audio" && (
                    <Audio src={attachment.data.audioURL} controls />
                  )}
                </AttachmentContainer>
              )
          )}
        </AttachmentsContainer>
        <TextInputContainer>
          <Avatar
            src="https://avatars.githubusercontent.com/u/80540635?v=4"
            alt="avatar"
            size="large"
            type="circle"
            className="avatar"
          />
          <Input
            multiline={true}
            placeholder="Type Here..."
            onChange={(e) => {
              setAudioRecording(false);
              setMessage(e.target.value);
            }}
            referance={inputRef}
            defaultValue={message}
            clear={clear}
            onSubmit={sendTextMessage}
            inputStyle={{
              flex: 1,
              background: "transparent",
              flexGrow: 1,
            }}
          />
          <IconButton
            sx={{
              width: "4.5rem",
              height: "4.5rem",
            }}
            onClick={() => {
              // setCount(count + 1);
              filePickerRef.current.value = null;
              filePickerRef.current.click();
            }}
          >
            <AttachFile sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton
            sx={{
              background: colors.black,
              width: "4.5rem",
              height: "4.5rem",
              ":hover": {
                background: colors.black,
                opacity: 0.8,
              },
              marginLeft: "1rem",
            }}
            {...longPress}
          >
            {!audioRecording ? (
              <Send sx={{ color: colors.white, fontSize: "2rem" }} />
            ) : (
              <Mic sx={{ color: colors.white, fontSize: "2rem" }} />
            )}
          </IconButton>
        </TextInputContainer>
      </Container>
    </>
  );
}

export default ChatInput;

const Container = styled.div`
  box-shadow: 0px 2px 10px 1px rgba(209, 209, 209, 0.75);
  -webkit-box-shadow: 0px 2px 10px 1px rgba(209, 209, 209, 0.75);
  -moz-box-shadow: 0px 2px 10px 1px rgba(209, 209, 209, 0.75);
`;

const TextInputContainer = styled.div`
  display: flex;
  background-color: #78787819;
  padding: 0.8rem 0.8rem;
  margin: 0rem 1rem 1rem;
  border-radius: 3rem;
  align-items: flex-end;
  .rce-container-input {
    min-width: auto;
    flex: 1;
    background: transparent;
    align-self: center;
  }
  ${miniMobile({
    ".avatar": {
      display: "none",
    },
  })}
`;

const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
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

import { AttachFile, Mic, Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import colors from "../../utils/colors";
import { Avatar, Input } from "react-chat-elements";
import styled from "styled-components";
import useLongPress from "../../Hooks/useLongPress";
import { miniMobile } from "../../responsive";
import AudioRecorder from "./AudioRecorder";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [audioRecording, setAudioRecording] = useState(true);
  const [clear, setClear] = useState(false);
  const inputRef = useRef(null);

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
    console.log("longpress is triggered");
  };

  const sendTextMessage = () => {
    if (!message) return;
    const msg = {
      userId: 1,
      userName: "Haseeb",
      type: "text",
      text: message,
    };
    inputRef.current.value = "";
    onSend(msg);
    setMessage("");
  };

  const sendAudio = () => {};

  const onClick = () => {
    if (audioRecording) {
      setAudioRecording(false);
      stopRecording();
      return;
    }
    sendTextMessage();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPress = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <Container>
      <AudioRecorder />
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
  margin: 1rem;
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

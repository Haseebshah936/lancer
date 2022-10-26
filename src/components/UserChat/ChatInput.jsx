import { AttachFile, Mic, Send } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import colors from "../../utils/colors";
import { Input } from "react-chat-elements";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import useLongPress from "../../Hooks/useLongPress";

function ChatInput(props) {
  const [message, setMessage] = useState("");
  const [audioRecording, setAudioRecording] = useState(false);
  const onLongPress = () => {
    console.log("longpress is triggered");
  };

  const onClick = () => {
    console.log("click is triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPress = useLongPress(setAudioRecording, onClick, defaultOptions);

  return (
    <Container>
      <TextInputContainer>
        <Avatar
          src="https://avatars.githubusercontent.com/u/80540635?v=4"
          alt="avatar"
          size="xlarge"
          type="circle"
        />
        <Input
          multiline={true}
          placeholder="Type Here..."
          onChange={(e) => setMessage(e.target.value)}
          inputStyle={{ flex: 1, background: "transparent", flexGrow: 1 }}
        />
        <IconButton
          sx={{
            width: "4.5rem",
            height: "4.5rem",
          }}
        >
          <AttachFile width={"2.5rem"} height={"2.5rem"} />
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
            <Send width={"3rem"} height={"3rem"} sx={{ color: colors.white }} />
          ) : (
            <Mic width={"3rem"} height={"3rem"} sx={{ color: colors.white }} />
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
  padding: 1rem 1rem;
  margin: 1rem;
  border-radius: 3rem;
  align-items: flex-end;
  .rce-container-input {
    min-width: auto;
    flex: 1;
    background: transparent;
  }
`;

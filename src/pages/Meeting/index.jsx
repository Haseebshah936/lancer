import {
  Call,
  CallEnd,
  Mic,
  MicOff,
  ScreenShare,
  Videocam,
  VideocamOff,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../../Hooks/useCustomContext";
import useWebRTC from "../../Hooks/WebRTC/useWebRTC";
import { miniMobile, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";

function Meeting(props) {
  const { state, dispatch } = useCustomContext();
  const {
    handleHangUp,
    handleJoinConnection,
    toggleAudio,
    toggleScreenShare,
    toggleCamera,
  } = useWebRTC();
  const videoRef = useRef(null); // Incoming Video
  const cameraRef = useRef(null); // Outgoing Video
  const audioRef = useRef(null); // Incoming Audio
  const navigate = useNavigate();

  useEffect(() => {
    if (state.localStream) {
      if (state.cameraSharing || state.screenSharing)
        cameraRef.current.srcObject = state.localStream;
      else cameraRef.current.srcObject = null;
    }
  }, [state.localStream, state.cameraSharing, state.screenSharing]);

  useEffect(() => {
    if (state.remoteStream) {
      videoRef.current.srcObject = state.remoteStream;
    }
  }, [state.remoteStream]);

  useEffect(() => {
    if (state.remoteAudioStream) {
      audioRef.current.srcObject = state.remoteAudioStream;
    }
  }, [state.remoteAudioStream]);

  useEffect(() => {
    console.log(state);
    if (state.localStream === null && state.remoteStream === null) {
      // *If there is no local stream and remote stream, then it will return
      if (cameraRef.current) cameraRef.current.srcObject = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    if(state.offer  && state.answer){
      // navigate(-1);
    }
    // console.log(state.localStream.getTracks());
    // cameraRef.current.srcObject = state.localStream; // *Setting the local stream to the camera ref
    // videoRef.current.srcObject = state.remoteStream; // *Setting the remote stream to the video ref
  }, [state.offer, state.answer, state.localStream, state.remoteStream]);


  useEffect(() => {
    console.log(state.connectionState);
    if (state.connectionState === "failed") {
      clearInterval(state.interval);
      handleHangUp();
    }
    else if(state.connectionState === "connected"){
      clearInterval(state.interval);
    }
    // else if (state.connectionState === "disconnected") {
    //   clearInterval(state.interval);
    //   handleHangUp();
    // }
  }, [state.connectionState])


  // useMemo(() => {
  //   console.log(state.connectionState);
  //   if(state.connectionState === "disconnected" ){
  //     handleHangUp();
  //   }
  // }, [state.connectionState])

  return (
    <Container>
      <audio src="" ref={audioRef} autoPlay />
      <VideoContainer>

      <Video src="" ref={videoRef} autoPlay />
      {state.connectionState !== "connected" &&
          <ConnectionStateText>
              {
                state.connectionState === "failed" ? "Disconnected": "Connecting..."
              }
          </ConnectionStateText>
        }
      </VideoContainer>
      
      
      <Camera src="" ref={cameraRef} autoPlay muted />
      <ButtonContainer>
        {!state.isInitiator && (
          <Button onClick={handleJoinConnection}>
            <Call
              sx={{
                color: "green",
                fontSize: "2.5rem !important",
              }}
              fontSize="large"
            />
          </Button>
        )}
        <Button onClick={toggleCamera}>
          {state.cameraSharing ? (
            <Videocam
              sx={{
                color: "tomato",
                fontSize: "2.5rem !important",
              }}
              fontSize="large"
            />
          ) : (
            <VideocamOff
              sx={{
                color: "tomato",
                fontSize: "2.5rem !important",
              }}
              fontSize="large"
            />
          )}
        </Button>
        <Button onClick={toggleScreenShare}>
          <ScreenShare
            sx={{
              color: "blue",
              fontSize: "2.5rem !important",
            }}
            fontSize="large"
          />
        </Button>
        <Button onClick={toggleAudio}>
          {!state.muted ? (
            <Mic
              sx={{
                fontSize: "2.5rem !important",
              }}
              fontSize="large"
            />
          ) : (
            <MicOff
              sx={{
                fontSize: "2.5rem !important",
              }}
              fontSize="large"
            />
          )}
        </Button>
        <Button
          onClick={() => {
            handleHangUp();
            navigate(-1);
          }}
        >
          <CallEnd
            sx={{
              color: "red",
              fontSize: "2.5rem !important",
            }}
            fontSize="large"
          />
        </Button>
      </ButtonContainer>
       
    </Container>
  );
}

export default Meeting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  position: relative;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: calc(100vh - 10rem);
  width: 100%;
  flex-direction: column;
`

const Video = styled.video`
  flex: 1;
  object-fit: cover;
  transform: rotateY(180deg);
`;

const Camera = styled.video`
  height: 15rem;
  width: 20rem;
  object-fit: cover;
  right: 0;
  bottom: 10rem;
  position: absolute;
  ${tablet({ height: "10rem", width: "15rem" })}
  transform: rotateY(180deg);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  column-gap: 2.5rem;
  position: absolute;
  bottom: 3rem;
  align-self: center;

  ${mobile({ columnGap: "1.5rem" })}
  ${miniMobile({ columnGap: "1rem" })}
`;

const Button = styled(IconButton)`
  background-color: white !important;
  &:hover {
    background-color: white !important;
  }
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

const ConnectionStateText = styled.p`
  position: absolute;
  font-size: 3rem;
  color: ${colors.white};
  z-index: 1000;
`
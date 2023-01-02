import {
    Call,
    CallEnd,
    Cancel,
    ContentCopy,
    Mic,
    ScreenShare,
    Send,
    Videocam,
  } from "@mui/icons-material";
  import { IconButton } from "@mui/material";
  import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
  } from "react";
  import { toast, ToastContainer } from "react-toastify";
  import styled from "styled-components";
  import { initialState, reducer } from "./Reducer";
  
  const servers = {
    iceServers: [
      {
        urls: "stun:stun.services.mozilla.com",
        username: "louis@mozilla.com",
        credential: "webrtcdemo",
      },
      {
        urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
      },
    ],
  };
  
  function App(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [message, setMessage] = useState("");
    const [screenShare, setScreenShare] = useState(false);
    const videoRef = useRef(null);
    const cameraRef = useRef(null);
    const dataChannel = useRef(null);
    const audioRef = useRef(null);
    let sender = null;
  
    const constraints = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 24000,
        sampleSize: 24,
      },
      video: true,
    };
    
    const handleStartStream = async (pc) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoTracks = stream.getVideoTracks();
        const audioTracks = stream.getAudioTracks();
        audioTracks[0].contentHint = "speech";
        audioTracks[0].onended = () => {
          console.log("Audio ended");
        };
  
        stream.onremovetrack = () => {
          console.log("Stream ended");
        };
  
        stream.getTracks().forEach((track) => {
          sender = pc.addTrack(track, stream);
        });
  
        dispatch({
          type: "SET_LOCAL_STREAM",
          payload: stream,
        });
      } catch (error) {
        if (error.name === "ConstraintNotSatisfiedError") {
          console.error(
            `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
          );
        } else if (error.name === "PermissionDeniedError") {
          console.error(
            "Permissions have not been granted to use your camera and " +
              "microphone, you need to allow the page access to your devices in " +
              "order for the demo to work."
          );
        } else {
          console.error(`getUserMedia error: ${error.name}`, error);
        }
      }
    };
  
    const sendSingle = useCallback(
      (signal) => {
        dataChannel.current.send(JSON.stringify(signal));
      },
      [state.dataChannel]
    );
  
    const messageChange = async (e, pc, dc) => {
      const msg = await JSON.parse(e.data);
      if (msg.type === "offer") {
        try {
          const offer = msg;
          await pc.setRemoteDescription(offer);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          sendSingle(pc.localDescription);
        } catch (error) {
          console.log(error);
        }
      } else if (msg.type === "answer") {
        try {
          await pc.setRemoteDescription(msg);
        } catch (error) {
          console.log(error);
        }
      } else
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            sender: "other",
            text: msg.text,
          },
        });
    };
  
    const handleMessageChange = useCallback(
      (e, pc, dc) => {
        messageChange(e, pc, dc);
      },
      [state.dataChannel]
    );
  
    const handleNegotiation = (e, pc) => {
      console.log("negotiation needed", e);
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          console.log("offer", pc.localDescription);
          sendSingle(pc.localDescription);
        })
        .catch((err) => {
          /* handle error */
          console.log(err);
        });
    };
  
    const handleOnTrack = (e) => {
      if (e.streams && e.streams[0]) {
        console.log("Streams", Object.values(e.streams[0].getTracks()));
        const audioTrack = e.streams[0].getAudioTracks()[0];
        const videoTrack = e.streams[0].getVideoTracks()[0];
        const inboundAudioStream = new MediaStream();
        inboundAudioStream.addTrack(audioTrack);
        const inboundVideoStream = new MediaStream();
        inboundVideoStream.addTrack(videoTrack);
        dispatch({
          type: "SET_REMOTE_STREAM",
          payload: inboundVideoStream,
        });
        audioRef.current.srcObject = inboundAudioStream;
      } else {
        let inboundStream = new MediaStream();
        inboundStream.addTrack(e.track);
        dispatch({
          type: "SET_REMOTE_STREAM",
          payload: inboundStream,
        });
      }
      // if (e.streams.length > 1) {
      //   console.log("Multiple streams", e.streams[1].getTracks());
      //   dispatch({
      //     type: "SET_REMOTE_STREAM",
      //     payload: e.streams[1],
      //   });
      // }
    };
  
    const handleStartConnection = async () => {
      const pc = new RTCPeerConnection(servers);
      await handleStartStream(pc);
      pc.onconnectionstatechange = (e) => {
        switch (pc.connectionState) {
          case "new":
          case "checking":
            console.log("Connecting…");
            break;
          case "connected":
            console.log("Online");
            break;
          case "disconnected":
            handleHangUp(pc);
            console.log("Disconnecting…");
            break;
          case "closed":
            console.log("Offline");
            break;
          case "failed":
            console.log("Error");
            break;
          default:
            console.log("Unknown");
            break;
        }
      };
      const dc = pc.createDataChannel("channel");
      dc.onmessage = (e) => handleMessageChange(e, pc, dc);
      dc.onopen = (e) => {
        // console.log("data channel opened");
        toast.success("Data channel opened");
      };
      dc.onclose = (e) => {
        // console.log("data channel closed");
      };
      dataChannel.current = dc;
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("candidate", e.candidate);
        }
        dispatch({
          type: "START_CONNECTION",
          payload: {
            peerConnection: pc,
            dataChannel: dc,
            offer: JSON.stringify(pc.localDescription),
            isInitiator: true,
          },
        });
      };
      pc.ontrack = (e) => handleOnTrack(e);
      pc.onnegotiationneeded = (e) => handleNegotiation(e, pc);
  
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
    };
  
    const handleJoinConnection = async () => {
      if (!state.peerConnection) {
        const pc = new RTCPeerConnection(servers);
        await handleStartStream(pc);
        pc.onconnectionstatechange = (e) => {
          switch (pc.connectionState) {
            case "new":
            case "checking":
              console.log("Connecting…");
              break;
            case "connected":
              console.log("Online");
              break;
            case "disconnected":
              handleHangUp(pc);
              console.log("Disconnecting…");
              break;
            case "closed":
              console.log("Offline");
              break;
            case "failed":
              console.log("Error");
              break;
            default:
              console.log("Unknown");
              break;
          }
        };
        pc.ondatachannel = (e) => {
          pc.dc = e.channel;
          pc.dc.onmessage = (e) => handleMessageChange(e, pc, pc.dc);
          pc.dc.onopen = (e) => {
            // console.log("data channel opened");
            toast.success("Data channel opened");
          };
          pc.dc.onclose = (e) => {
            // console.log("data channel closed");
          };
          dataChannel.current = pc.dc;
          dispatch({
            type: "SET_DATA_CHANNEL",
            payload: pc.dc,
          });
        };
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            console.log("candidate", e.candidate);
          }
        };
        pc.ontrack = (e) => handleOnTrack(e);
  
        pc.onnegotiationneeded = (e) => handleNegotiation(e, pc);
  
        const offer = JSON.parse(state.answer);
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        dispatch({
          type: "JOIN_CONNECTION",
          payload: {
            peerConnection: pc,
            offer: JSON.stringify(pc.localDescription),
            isInitiator: false,
          },
        });
      } else {
        const pc = state.peerConnection;
        await pc.setRemoteDescription(JSON.parse(state.answer));
        dispatch({
          type: "SET_IS_STARTED",
          payload: true,
        });
      }
    };
  
    const handleSendMessage = () => {
      state.dataChannel.send(
        JSON.stringify({
          type: "message",
          text: message,
        })
      );
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          sender: "own",
          text: message,
        },
      });
      setMessage("");
    };
  
    const handleHangUp = (pc) => {
      if (!pc) pc?.close();
      else state.peerConnection?.close();
      cameraRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      dispatch({
        type: "RESET",
      });
    };
  
    const toggleAudio = () => {
      console.log("toggle audio", state.muted);
      let audioTracks = state.localStream.getAudioTracks();
      audioTracks[0].enabled = !audioTracks[0].enabled;
      dispatch({
        type: "SET_MUTED",
        payload: !state.muted,
      });
    };
  
    const toggleCamera = async () => {
      let videoTracks = state.localStream.getVideoTracks();
      if (screenShare) {
        toast.error("Please stop screen share first");
        return;
      }
      if (videoTracks.length > 0) {
        removeVideoTrack();
      } else {
        addVideoTrack();
      }
      dispatch({
        type: "SET_LOCAL_STREAM",
        payload: state.localStream,
      });
      // videoTracks[0].enabled = !videoTracks[0].enabled;
    };
  
    const addVideoTrack = async () => {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        removeVideoTrack();
      } catch (error) {
        console.log("error", error);
        return null;
      }
      // state.localStream.addTrack(stream.getVideoTracks()[0]);
      // cameraRef.current.srcObject = stream;
      const audioTrack = stream.getAudioTracks()[0];
      if (state.muted) audioTrack.enabled = false;
      audioTrack.contentHint = "speech";
      stream.getTracks().forEach((track) => {
        state.peerConnection?.addTrack(track, stream);
      });
      dispatch({
        type: "SET_LOCAL_STREAM",
        payload: stream,
      });
      return stream;
    };
  
    const addScreenVideoTrack = async () => {
      let stream;
      let stream2;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        stream2 = await navigator.mediaDevices.getUserMedia({
          audio: constraints.audio,
          video: false,
        });
        removeVideoTrack();
      } catch (error) {
        console.log("error", error);
        return null;
      }
      state.localStream.addTrack(stream.getVideoTracks()[0]);
      // const audioTrack = stream2.getAudioTracks()[0];
      // if (state.muted) audioTrack.enabled = false;
      // stream.addTrack(stream2.getAudioTracks()[0]);
      stream.getTracks().forEach((track) => {
        state.peerConnection?.addTrack(track);
      });
      // console.log("stream", stream.getTracks());
      // cameraRef.current.srcObject = stream;
      // dispatch({
      //   type: "SET_LOCAL_STREAM",
      //   payload: stream,
      // });
      return stream;
    };
  
    const removeVideoTrack = () => {
      let videoTracks = state.localStream.getVideoTracks();
      if (videoTracks.length === 0) return;
      videoTracks[0].stop();
      state.localStream.removeTrack(videoTracks[0]);
    };
  
    const toggleScreenShare = async () => {
      if (!screenShare) {
        const stream = await addScreenVideoTrack();
        if (!stream) return;
        stream.getVideoTracks()[0].onended = () => {
          removeVideoTrack();
          addVideoTrack();
          setScreenShare(false);
        };
        setScreenShare(true);
      } else {
        removeVideoTrack();
        addVideoTrack();
        setScreenShare(false);
      }
      dispatch({
        type: "SET_LOCAL_STREAM",
        payload: state.localStream,
      });
      // addScreenVideoTrack();
    };
  
    useEffect(() => {
      if (state.localStream === null && state.remoteStream === null) {
        cameraRef.current.srcObject = null;
        videoRef.current.srcObject = null;
        return;
      }
      console.log(state.localStream.getTracks());
      cameraRef.current.srcObject = state.localStream;
      videoRef.current.srcObject = state.remoteStream;
    }, [state]);
  
    // useEffect(() => {
    //   if (state.dataChannel) {
  
    //   }
    // }, [state.dataChannel]);
  
    useLayoutEffect(() => {
      if (videoRef.current) {
        const video = videoRef.current.getBoundingClientRect();
        videoRef.current.style.height = `${video.width * 0.6}px`;
        videoRef.current.style.maxHeight = `${video.width * 0.6}px`;
        window.addEventListener("resize", () => {
          if (!videoRef.current) return;
          const video = videoRef.current.getBoundingClientRect();
          videoRef.current.style.height = `${video.width * 0.6}px`;
          videoRef.current.style.maxHeight = `${video.width * 0.6}px`;
        });
      }
    }, [videoRef.current]);
  
  
    return (
      <Container>
        <Wrapper>
          <VideoContainer>
            <audio ref={audioRef} autoPlay />
            <VideoTitle>Video 1</VideoTitle>
            <Video src="" autoPlay={true} ref={videoRef} />
            <ButtonContainer>
              <Button onClick={handleStartConnection}>
                <Call
                  sx={{
                    color: "green",
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
              </Button>
              <Button onClick={toggleCamera}>
                <Videocam
                  sx={{
                    color: "tomato",
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
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
                <Mic
                  sx={{
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
              </Button>
              <Button onClick={handleHangUp}>
                <CallEnd
                  sx={{
                    color: "red",
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
              </Button>
            </ButtonContainer>
            <VideoJoinContainer>
              <Text>Offer</Text>
              <VideoJoinSource>
                <JoinSource disabled value={state.offer} onChange={() => {}} />
                <Button
                  onClick={() => {
                    toast.success("Offer copied to clipboard");
                    navigator.clipboard.writeText(state.offer);
                  }}
                >
                  <ContentCopy />
                </Button>
              </VideoJoinSource>
              <Text>Answer</Text>
              <VideoJoinSource>
                <JoinSource
                  value={state.answer}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_ANSWER",
                      payload: {
                        answer: e.target.value,
                      },
                    });
                  }}
                />
                <Button onClick={handleJoinConnection}>
                  <Call
                    sx={{
                      color: "green",
                    }}
                  />
                </Button>
              </VideoJoinSource>
            </VideoJoinContainer>
          </VideoContainer>
          <VideoContainer>
            <VideoTitle>Video 2</VideoTitle>
            <Video src="" autoPlay={true} muted ref={cameraRef} />
            <ButtonContainer>
              <Button>
                <Videocam
                  sx={{
                    color: "tomato",
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
              </Button>
              <Button>
                <Mic
                  sx={{
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
              </Button>
              <Button>
                <CallEnd
                  sx={{
                    color: "red",
                    fontSize: "2.5rem !important",
                  }}
                  fontSize="large"
                />
              </Button>
            </ButtonContainer>
            <VideoJoinContainer>
              <Text>Offer</Text>
              <VideoJoinSource>
                <JoinSource />
                <Button>
                  <Call
                    sx={{
                      color: "green",
                    }}
                  />
                </Button>
              </VideoJoinSource>
              <Text>Answer</Text>
              <VideoJoinSource>
                <JoinSource />
                <Button>
                  <ContentCopy />
                </Button>
              </VideoJoinSource>
            </VideoJoinContainer>
          </VideoContainer>
          <TextContainer>
            <MessagesContainer>
              {state.messages.map((message, index) => {
                return (
                  <MessageContainer key={index}>
                    {message.sender === "own" ? (
                      <RightMessage>{message.text}</RightMessage>
                    ) : (
                      <LeftMessage>{message.text}</LeftMessage>
                    )}
                  </MessageContainer>
                );
              })}
            </MessagesContainer>
            <ChatInput>
              <Input
                multiple
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                sx={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
                onClick={handleSendMessage}
              >
                <Send
                  sx={{
                    color: "green",
                    rotate: "330deg",
                  }}
                  fontSize="large"
                />
              </Button>
            </ChatInput>
          </TextContainer>
        </Wrapper>
      </Container>
    );
  }
  
  export default App;
  
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    padding: 5%;
    min-height: 100vh;
  `;
  
  const Wrapper = styled.div`
    margin-top: 5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    column-gap: 4rem;
    row-gap: 4rem;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    margin-bottom: 2rem;
  `;
  
  const VideoContainer = styled.div`
    flex: 1.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;
  `;
  
  const VideoTitle = styled.h3`
    color: black;
    font-size: 2rem;
  `;
  
  const Video = styled.video`
    width: 100%;
    object-fit: cover;
    height: 50%;
    max-height: 50%;
    background-color: black;
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.3);
    transform: rotateY(180deg);
  `;
  
  const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    column-gap: 6rem;
  `;
  
  const Button = styled(IconButton)`
    background-color: white !important;
    &:hover {
      background-color: white !important;
    }
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  `;
  
  const VideoJoinContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
  `;
  
  const Text = styled.h5`
    color: black;
    font-size: 1.2rem;
    align-self: flex-start;
    text-transform: capitalize;
  `;
  
  const VideoJoinSource = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
    background-color: white;
    width: 30rem;
    padding: 0.5rem;
    padding-left: 1rem;
  `;
  const Offer = styled.p`
    font-size: 1.4rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    /* white-space: nowrap; */
  `;
  const JoinSource = styled.input`
    font-size: 1.4rem;
    flex: 1;
  `;
  
  const TextContainer = styled.div`
    flex: 0.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    align-self: flex-start;
    max-height: 80vh;
    height: 80vh;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.3);
    margin-top: 0.5rem;
    @media (max-width: 768px) {
      flex: 1;
      height: 70vh;
      max-height: 70vh;
    }
  `;
  
  const MessagesContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 3rem;
    overflow-y: scroll;
    padding: 2rem;
    margin-top: 2rem;
    transform: rotateX(180deg);
  `;
  
  const MessageContainer = styled.div`
    width: 100%;
    position: relative;
    margin-block: 1rem;
  `;
  
  const LeftMessage = styled.p`
    background-color: teal;
    color: white;
    padding: 1rem;
    position: absolute;
    left: 0;
    transform: rotateX(180deg);
    font-size: 1.5rem;
  `;
  
  const RightMessage = styled.p`
    background-color: #e62626;
    color: white;
    padding: 1rem;
    position: absolute;
    right: 0;
    transform: rotateX(180deg);
    font-size: 1.5rem;
  `;
  
  const ChatInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem;
    padding-left: 1rem;
    border-top: 1px solid black;
  `;
  const Input = styled.input`
    font-size: 1.5rem;
    flex: 1;
  `;
  
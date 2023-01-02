import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../utils/helperFunctions";
import { useCustomContext } from "../useCustomContext";
import { acceptCall, createCall, updateCallTime } from "./helperfunction";

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

const useWebRTC = () => {
  const { state, dispatch } = useCustomContext();
  const [message, setMessage] = useState("");
  const dataChannel = useRef(null);
  const peerConnection = useRef(null);

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


  const handleStartStream = async (pc, type) => {
    try {
      const newConstraints = { ...constraints, video: type === "video" };
      const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
      // const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();
      /**
       * This is used to tell the browser that the audio is speech
       * LINK - https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/contentHint
       */
      audioTracks[0].contentHint = "speech";
      audioTracks[0].onended = () => {
        console.log("Audio ended");
      };

      stream.onremovetrack = () => {
        console.log("Stream ended");
      };
      if (type === "video") {
        dispatch({
          type: "SET_CAMERA",
          payload: true,
        });
      } 
      stream.getTracks().forEach((track) => {
        //LINK - https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
        pc.addTrack(track, stream);
      });
      dispatch({
        type: "SET_LOCAL_STREAM",
        payload: stream, // *Local Stream and assign it to cameraRef setting the video tag to muted. This will prevent the user from hearing his own voice.
      });
      
      return stream;
      // Dispatching the local stream to the state
    } catch (error) {
      if (error.name === "ConstraintNotSatisfiedError") {
        toast.error(
          `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        toast.error(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      } else {
        toast.error(`getUserMedia error: ${error.name}`, error);
      }
      return new Error(error);
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
  // NOTE - To have the same state and not an old state
  const handleMessageChange = useCallback(
    (e, pc, dc) => {
      messageChange(e, pc, dc);
    },
    [state.dataChannel]
  );

  
  const handleNegotiation = (e, pc) => {
    console.log("negotiation needed", e, pc);
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        console.log("offer", pc.localDescription);
        sendSingle(pc.localDescription); // sending the offer to the other peer
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
      const videoTrack = e.streams[0].getVideoTracks()?.[0];
      
      const inboundAudioStream = new MediaStream();
      inboundAudioStream.addTrack(audioTrack);
      if (videoTrack) {
        const inboundVideoStream = new MediaStream();
        inboundVideoStream.addTrack(videoTrack);
        dispatch({
          type: "SET_REMOTE_STREAM",
          payload: inboundVideoStream,
        });
      }
      
      // audioRef.current.srcObject = inboundAudioStream;
      dispatch({
        type: "SET_REMOTE_AUDIO_STREAM",
        payload: inboundAudioStream,
      });
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

  

  const handleStartConnection = async (
    type,
    chatroomId,
    callerId,
    receiverId
  ) => {
    // const pc = new RTCPeerConnection(servers);
    const pc = state.peerConnection

    peerConnection.current = pc;
    const stream = await handleStartStream(pc, type); // *get user's audio and video
    pc.onconnectionstatechange = (e) => {
      // *Fired when the connection state changes
      switch (pc.connectionState) {
        case "new": // *The connection is new
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "new",
          })
          break;
        case "checking": // *The connection is being checked
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "checking",
          })
          break;
        case "connected": // *The connection is connected
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "connected",
          })
          break;
        case "disconnected": // *The connection is disconnected
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "disconnected",
          });
          break;
        case "closed": // *The connection is closed
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "disconnected",
          });
          break;
        case "failed": // *The connection failed
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "disconnected",
          })
          break;
        default:
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "Un",
          })
          break;
      }
    };
    const dc = pc.createDataChannel("channel");
    dc.onmessage = (e) => handleMessageChange(e, pc, dc); // *Fired when a message is received
    dc.onopen = (e) => {
      // *Fired when the data channel is opened
      // console.log("data channel opened");
      toast.success("Data channel opened");
    };
    dc.onclose = (e) => {
      // *Fired when the data channel is closed
      // console.log("data channel closed");
    };
    dataChannel.current = dc;

    //NOTE - Always use the onicecandidate event to get the local description. The local description is the offer in this case.

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        // console.log("candidate", e.candidate);
      }
       
      dispatch({
        type: "START_CONNECTION",
        payload: {
          peerConnection: pc,
          dataChannel: dc,
          offer: JSON.stringify(pc.localDescription), // *The local description is the offer
          isInitiator: true,
          callerId,
          receiverId,
          chatroomId,
          type,
        },
      });
    };
    const offer = await pc.createOffer(); // *Creating an offer
    await pc.setLocalDescription(offer); // *Setting the local description to the offer
    pc.ontrack = (e) => handleOnTrack(e); // *Fired when a track is added to the RTCPeerConnection
    pc.onnegotiationneeded = (e) => handleNegotiation(e, pc); // *Fired when a negotiation is needed
    try{
      const data =  await createCall(
        type,
        chatroomId,
        callerId,
        receiverId,
        JSON.stringify(pc.localDescription)
      );
      let interval;
      interval = setInterval(async () => {
        try {
          console.log("Updating call time");
          await updateCallTime(data._id);
        } catch (error) {
          console.log(error);
          dispatch({
            type: "SET_CONNECTION_STATE",
            payload: "failed",
          })
          clearInterval(interval);
          handleError(error);
        }
      }, 20000)
      dispatch({
        type: "SET_CALL_INTERVAL",
        payload: interval
      })
      return data;
    }
    catch(err){
      handleHangUp(pc,stream);
      throw (err);
    }
  };

  const handleJoinConnection = async () => {
      console.log("No peer connection");
      // const pc = new RTCPeerConnection(servers);
      const pc = state.peerConnection
      const stream = await handleStartStream(pc, state.type);
      pc.onconnectionstatechange = (e) => {
        // *Fired when the connection state changes
        switch (pc.connectionState) {
          case "new": // *The connection is new
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "new",
            })
            break;
          case "checking": // *The connection is being checked
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "checking",
            })
            break;
          case "connected": // *The connection is connected
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "connected",
            })
            break;
          case "disconnected": // *The connection is disconnected
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "disconnected",
            });
            break;
          case "closed": // *The connection is closed
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "disconnected",
            });
            break;
          case "failed": // *The connection failed
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "disconnected",
            })
            break;
          default:
            dispatch({
              type: "SET_CONNECTION_STATE",
              payload: "Un",
            })
            break;
        }
      };
      pc.ondatachannel = (e) => {
        // *Fired when a data channel is added to the RTCPeerConnection
        pc.dc = e.channel; // *Setting the data channel to the RTCPeerConnection
        pc.dc.onmessage = (e) => handleMessageChange(e, pc, pc.dc); // *Fired when a message is received
        pc.dc.onopen = (e) => {
          // *Fired when the data channel is opened
          // console.log("data channel opened");
          toast.success("Data channel opened");
        };
        pc.dc.onclose = (e) => {
          // *Fired when the data channel is closed
          // console.log("data channel closed");
        };
        dataChannel.current = pc.dc; // *Setting the data channel to the dataChannel ref
        dispatch({
          // *Dispatching the data channel to the reducer
          type: "SET_DATA_CHANNEL",
          payload: pc.dc,
        });
      };
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          // console.log("candidate", e.candidate);
        }
        dispatch({
          // *Dispatching the peer connection to the reducer with the answer
          type: "JOIN_CONNECTION",
          payload: {
            peerConnection: pc,
            offer: JSON.stringify(pc.localDescription), // *The local description is the answer for the other and local description for this peer user in this case
            isInitiator: false,
          },
        });
      };
      pc.ontrack = (e) => handleOnTrack(e); // *Fired when a track is added to the RTCPeerConnection
      pc.onnegotiationneeded = (e) => handleNegotiation(e, pc);

      const offer = JSON.parse(state.answer);
      await pc.setRemoteDescription(offer); // *Setting the remote description to the offer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer); // *Setting the local description to the answer
      
      try{
        const data =  await acceptCall(
          state.callId,
          JSON.stringify(pc.localDescription)
        );
        return data;
      }
      catch(err){
        handleHangUp(pc,stream);
        throw (err);
      }
  };

  const handleAcceptAnswer =  useCallback((answer) => {
    (async () => {
      const pc = state.peerConnection; // *Getting the peer connection from the reducer
      console.log(pc);
      await pc.setRemoteDescription(JSON.parse(answer)); // *Setting the remote description to the offer
      dispatch({
          type: "JOIN_CONNECTION",
          payload: {
            isStarted: true,
            answer
          },
      });
    })()
  }, [state])

  // const handleAcceptAnswer = async (answer) => {
  //   console.log("Accepting answer", answer);
  //   // const pc = state.peerConnection; // *Getting the peer connection from the reducer
  //   // console.log(pc);
  //   let pc = peerConnection.current;
  //   await pc.setRemoteDescription(JSON.parse(answer)); // *Setting the remote description to the offer
  //   dispatch({
  //       type: "JOIN_CONNECTION",
  //       payload: {
  //         isStarted: true,
  //         answer
  //       },
  //   });
  // }

  // *Sending a message
  const handleSendMessage = () => {
    state.dataChannel.send(
      // *Sending the message to the data channel
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

  const handleHangUp = (pc, stream) => {
    dataChannel.current?.close(); // *Closing the data channel
    dataChannel.current = null; // *Setting the data channel to null
    if (!pc) pc?.close(); // *Closing the peer connection
    else state.peerConnection?.close(); // *Closing the peer connection
    if(stream)
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    else
      state.localStream.getTracks().forEach((track) => {
          // *Stopping the local stream
          track.stop();
        });
    dispatch({
      type: "RESET",
    });
  };

  const toggleAudio = () => {
    console.log("toggle audio", state.muted);
    let audioTracks = state.localStream.getAudioTracks(); // *Getting the audio tracks from the local stream
    audioTracks[0].enabled = !audioTracks[0].enabled; // *Enabling or disabling the audio track
    dispatch({
      type: "SET_MUTED",
      payload: !state.muted,
    });
  };

  const toggleCamera = async () => {
    let videoTracks = state.localStream.getVideoTracks();
    if (state.screenShare) {
      // *If the screen share is on, then the camera can't be on
      toast.error("Please stop screen share first");
      return;
    }
    if (state.cameraSharing) {
      // *If the video track is on, then it will be removed
      dispatch({
        type: "SET_CAMERA",
        payload: false,
      });
      removeVideoTrack();
    } else {
      // *If the video track is off, then it will be added
      dispatch({
        type: "SET_CAMERA",
        payload: true,
      });
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
      stream = await navigator.mediaDevices.getUserMedia(constraints); // *Getting the user media
      removeVideoTrack(); // *Removing the video track from the local stream
    } catch (error) {
      console.log("error", error);
      return null;
    }
    // state.localStream.addTrack(stream.getVideoTracks()[0]);
    // cameraRef.current.srcObject = stream;
    const audioTrack = stream.getAudioTracks()[0]; // *Getting the audio track from the stream
    if (state.muted) audioTrack.enabled = false; // *If the audio is muted, then the audio track will be disabled
    audioTrack.contentHint = "speech"; // *Setting the content hint to speech
    stream.getTracks().forEach((track) => {
      // *Adding the tracks to the local stream
      state.peerConnection?.addTrack(track, stream); // *Adding the track to the peer connection
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
      }); // *Getting the display media
      // *Getting the user media
      removeVideoTrack(); // *Removing the video track from the local stream
      dispatch({
        type: "SET_CAMERA",
        payload: false,
      });
    } catch (error) {
      console.log("error", error);
      return null;
    }
    state.localStream.addTrack(stream.getVideoTracks()[0]); // *Adding the video track to the local stream
    // const audioTrack = stream2.getAudioTracks()[0];
    // if (state.muted) audioTrack.enabled = false;
    // stream.addTrack(stream2.getAudioTracks()[0]);
    stream.getTracks().forEach((track) => {
      // *Adding the tracks to the local stream
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
    let videoTracks = state.localStream.getVideoTracks(); // *Getting the video tracks from the local stream
    if (videoTracks.length === 0) return; // *If there is no video track, then it will return
    videoTracks[0].stop(); // *Stopping the video track
    state.localStream.removeTrack(videoTracks[0]); // *Removing the video track from the local stream
    dispatch({
      type: "SET_LOCAL_STREAM",
      payload: state.localStream,
    });
  };

  const toggleScreenShare = async () => {
    if (!state.screenShare) {
      // *If the screen share is off, then it will be on
      const stream = await addScreenVideoTrack(); // *Adding the screen video track
      if (!stream) return; // *If there is no stream, then it will return
      stream.getVideoTracks()[0].onended = () => {
        // *If the screen share is ended, then it will be removed and the camera will be added.
        removeVideoTrack();
        if (state.cameraSharing) {
          addVideoTrack();
        }
        dispatch({
          type: "SET_SCREEN_SHARING",
          payload: false,
        });
      };
      dispatch({
        type: "SET_SCREEN_SHARING",
        payload: true,
      });
    } else {
      removeVideoTrack(); // *If the screen share is on, then it will be removed and the camera will be added.
      if (state.cameraSharing) {
        addVideoTrack(); // *Adding the camera video track
      }
      dispatch({
        type: "SET_SCREEN_SHARING",
        payload: false,
      });
    }
    dispatch({
      type: "SET_LOCAL_STREAM",
      payload: state.localStream,
    });
    // addScreenVideoTrack();
  };

  return {
    message,
    setMessage,
    handleStartConnection,
    handleHangUp,
    handleJoinConnection,
    handleSendMessage,
    handleAcceptAnswer,
    toggleAudio,
    toggleCamera,
    addVideoTrack,
    removeVideoTrack,
    addScreenVideoTrack,
    toggleScreenShare,
  };
};

export default useWebRTC;

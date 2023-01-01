import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../utils/helperFunctions";
import { useCustomContext } from "../useCustomContext";
import { createCall, updateCallTime } from "./helperfunction";

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

  // Constraints - will be used by getUserMedia() for customizing the audio and video
  //TODO - Read More about MediaTrackConstraints and MediaTrackSettings
  //LINK  - https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
  //LINK - https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings
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

  /** ANCHOR
   * *This function will be called when the user clicks on the "Start Call" button.
   * *It is used to get user camera and microphone feed as a MediaStream object.
   * *You can Customize the constraints object to customize the audio and video.
   * *The MediaStream object is then looped over and indivudal tracks are added to the       RTCPeerConnection object.
   * *These tracks are added to the RTCPeerConnection object using the addTrack() method.
   * *Individual Tracks can be assigned to individual streams. As second parameter to addTrack() you can pass the stream object. addTrack(track, stream0, stream1, stream2, ...)
   * *The track can also be sent without any stream. addTrack(track) as I did for screen share.
   */

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

  /** ANCHOR -
   * *useCallback is used to prevent the function from being recreated on every render
   * *This function is used as a callback to send the offer to the other peer
   * *It is called when a new track is added and onTrack event is fired
   * *In this case it is called when user toggles the screen share or camera
   * NOTE -
   * *To have the same state and not an old state of the time when listner was added. As even listners can create a cache and cause bugs.
   */
  const sendSingle = useCallback(
    (signal) => {
      dataChannel.current.send(JSON.stringify(signal));
    },
    [state.dataChannel]
  );

  /** ANCHOR -
   * *This function is a callback fired when a new message is received on the data channel
   * *It is used to handle the offer and answer messages sent for negotiation
   * *It is also used to add the received message to the chat
   * *It is called through useCallBack to make sure the function has the same state and does not have an old state. Of the time when listner was added. As even listners can create a cache and cause bugs.
   */

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

  /** ANCHOR -
   * *This function is used to handle the negotiation needed event
   * *It is called when the negotiationneeded event is fired
   * *It is fired when a new track is added to the RTCPeerConnection object
   * *Read the note in addTrack() docs for more info. Then the one below.
   * LINK - https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/negotiationneeded_event
   * *It is used to create an offer and set it as the local description
   * *It is then sent to the other peer using the data channel
   */

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

  /** ANCHOR -
   * *This function is used to handle the onTrack event
   * *It is fired when a new track is added to the RTCPeerConnection object
   * *It recieves MediaStream Objects array in the event object
   * *The can have multiple streams and each stream can have multiple
   */

  const handleOnTrack = (e) => {
    if (e.streams && e.streams[0]) {
      /**  NOTE
       * *This 'if' is just used in the start of the connection in this use case as I am handling audio and video sepratly and not in the same stream. So later on when the video track is added to the RTCPeerConnection object the onTrack event is fired and the video track is added to the video element. But the audio track is already added to the audio element. So the if is used to prevent the audio track from being added to the video element.
       */

      console.log("Streams", Object.values(e.streams[0].getTracks()));
      const audioTrack = e.streams[0].getAudioTracks()[0];
      const videoTrack = e.streams[0].getVideoTracks()?.[0];
      /** REVIEW
       * * Creating a new stream and adding the track to it. This is done to keep the audio track in a seprate stream and the video track in a seprate stream. This is done for a various reasons.
       * *1. To be able to mute the audio track without muting the video track
       * *2. To not keep the audio track away the video track. So the audio can be still shared even if the video is not shared or the camera is off or the screen is shared.
       * *3 To be able to have full control over the audio and video tracks.
       * *4 As audio track can be muted and unmuted without the need to create a new stream. By setting the enabled property of the audio track to true or false. This is possible with the video track as well. But the camera resource is not released when the video track is disabled. So it is better to remove the stream when the video track is disabled. And add a new stream when the video track is enabled.
       */
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
      /** NOTE -
       * *Setting the remote stream to the video stream. This stream is later added to the video element in the useEffect hook below.
       */

      // audioRef.current.srcObject = inboundAudioStream;
      dispatch({
        type: "SET_REMOTE_AUDIO_STREAM",
        payload: inboundAudioStream,
      });
    } else {
      /**  NOTE -
       * *If the stream is not present in the event object. Then the track is added to a new stream and the stream is set as the remote stream. This is the MediaDevices.getUserMedia() stream.(Screen share or camera stream)
       */
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

  /** ANCHOR -
   * *This method will be called when the user clicks on the "Start Call" button
   * *It will crate a new RTCPeerConnection
   * *It will create a new RTCDataChannel
   * *It will call the handleStartStream() method to get the user's audio and video
   * *It will add event listeners to the RTCPeerConnection for track addition, negotiation, and data channel
   */

  const handleStartConnection = async (
    type,
    chatroomId,
    callerId,
    receiverId
  ) => {
    const pc = new RTCPeerConnection(servers);
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
      };
      pc.ontrack = (e) => handleOnTrack(e); // *Fired when a track is added to the RTCPeerConnection

      pc.onnegotiationneeded = (e) => handleNegotiation(e, pc);

      const offer = JSON.parse(state.answer);
      await pc.setRemoteDescription(offer); // *Setting the remote description to the offer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer); // *Setting the local description to the answer
      dispatch({
        // *Dispatching the peer connection to the reducer with the answer
        type: "JOIN_CONNECTION",
        payload: {
          peerConnection: pc,
          offer: JSON.stringify(pc.localDescription), // *The local description is the answer for the other and local description for this peer user in this case
          isInitiator: false,
        },
      });
    } else {
      const pc = state.peerConnection; // *Getting the peer connection from the reducer
      await pc.setRemoteDescription(JSON.parse(state.answer)); // *Setting the remote description to the offer
      dispatch({
        type: "SET_IS_STARTED",
        payload: true,
      });
    }
  };

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

  // useEffect(() => {
  //   if (state.localStream === null && state.remoteStream === null) {
  //     // *If there is no local stream and remote stream, then it will return
  //     if (cameraRef.current) cameraRef.current.srcObject = null;
  //     if (videoRef.current) videoRef.current.srcObject = null;
  //     return;
  //   }
  //   console.log(state.localStream.getTracks());
  //   cameraRef.current.srcObject = state.localStream; // *Setting the local stream to the camera ref
  //   videoRef.current.srcObject = state.remoteStream; // *Setting the remote stream to the video ref
  // }, [state]);

  // useEffect(() => {
  //   if (state.dataChannel) {

  //   }
  // }, [state.dataChannel]);

  // useLayoutEffect(() => {
  //   if (videoRef.current) {
  //     const video = videoRef.current.getBoundingClientRect();
  //     videoRef.current.style.height = `${video.width * 0.6}px`;
  //     videoRef.current.style.maxHeight = `${video.width * 0.6}px`;
  //     window.addEventListener("resize", () => {
  //       if (!videoRef.current) return;
  //       const video = videoRef.current.getBoundingClientRect();
  //       videoRef.current.style.height = `${video.width * 0.6}px`;
  //       videoRef.current.style.maxHeight = `${video.width * 0.6}px`;
  //     });
  //   }
  // }, [videoRef.current]);

  return {
    message,
    setMessage,
    handleStartConnection,
    handleHangUp,
    handleJoinConnection,
    handleSendMessage,
    toggleAudio,
    toggleCamera,
    addVideoTrack,
    removeVideoTrack,
    addScreenVideoTrack,
    toggleScreenShare,
  };
};

export default useWebRTC;

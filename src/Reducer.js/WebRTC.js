import { servers } from "../utils/VIdeoCall/servers";

export const webRTCInitialState = {
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  dataChannel: null,
  isChannelReady: false,
  isInitiator: false,
  isStarted: false,
  screenSharing: false,
  remoteAudioStream: null,
  muted: false,
  cameraSharing: false,
  connectionState: "",
  offer: "",
  answer: "",
  messages: [],
  callId: "",
  callInterval: null,
  callerId: "",
  chatroomId: "",
  type: "video",
};

export const webRTCReducer = (state = webRTCInitialState, action) => {
  switch (action.type) {
    case "START_CONNECTION": {
      // console.log("START_CONNECTION", action.payload);
      return {
        ...state,
        ...action.payload,
        isInitiator: true,
      };
    }
    case "JOIN_CONNECTION": {
      // console.log("JOIN_CONNECTION", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }

    case "SET_LOCAL_STREAM": {
      return { ...state, localStream: action.payload };
    }
    case "SET_REMOTE_STREAM":
      return { ...state, remoteStream: action.payload };
    case "SET_REMOTE_AUDIO_STREAM":
      return { ...state, remoteAudioStream: action.payload };
    case "SET_PEER_CONNECTION":
      return { ...state, peerConnection: action.payload };
    case "SET_DATA_CHANNEL": {
      return { ...state, dataChannel: action.payload };
    }
    case "SET_IS_CHANNEL_READY":
      return { ...state, isChannelReady: action.payload };
    case "SET_IS_INITIATOR":
      return { ...state, isInitiator: action.payload };
    case "SET_IS_STARTED":
      return { ...state, isStarted: action.payload };
    case "SET_OFFER":
      return { ...state, offer: action.payload };
    case "SET_ANSWER": {
      return { ...state, ...action.payload };
    }
    case "SET_MUTED": {
      return { ...state, muted: action.payload };
    }
    case "SET_CAMERA": {
      return { ...state, cameraSharing: action.payload };
    }
    case "SET_CALL_INTERVAL": {
      return { ...state, callInterval: action.payload };
    }
    case "SET_CONNECTION_STATE":
      console.log("SET_CONNECTION_STATE", action.payload);
      return { ...state, connectionState: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [action.payload, ...state.messages] };
    case "SET_SCREEN_SHARING": {
      console.log("SET_SCREEN_SHARING", action.payload);
      return { ...state, screenSharing: action.payload };
    }
    case "RESET":
      return webRTCInitialState;
  }
};

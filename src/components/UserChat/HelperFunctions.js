import { requestMethod } from "../../requestMethod";

export function handleMessageFormation(message) {
  const data = {};
  data[
    message?.type === "video"
      ? "videoURL"
      : message?.type === "audio"
      ? "audioURL"
      : "uri"
  ] = message?.uri;
  data["status"] =
    message?.type === "file"
      ? {
          click: false,
        }
      : message?.type === "video"
      ? {
          download: true,
        }
      : null;
  return {
    userId: message?.userId?._id,
    userName: message?.userId?.name,
    type: message?.type,
    text: message?.text,
    data,
  };
}

export const handleMessageCreation = (userId, chatroomId, message) => {
  const newMessage = {
    userId,
    chatroomId,
    type: message?.type,
    text: message?.text ? message?.text : null,
    uri:
      message?.type === "video"
        ? message?.data?.videoURL
        : message?.type === "audio"
        ? message?.data?.audioURL
        : message?.data?.uri,
  };
  return newMessage;
};

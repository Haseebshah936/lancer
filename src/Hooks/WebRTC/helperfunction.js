import { requestMethod } from "../../requestMethod";

export const createCall = async (
  type,
  chatroomId,
  callerId,
  receiverId,
  offer
) => {
  const res = await requestMethod.post("call", {
    chatroomId,
    callerId,
    receiverId,
    offer,
    type,
  });
  return res.data;
};

export const updateCallTime = async (
  callId
) => {
  const res = await requestMethod.put(`call/updateTime/${callId}`);
  return res.data;
};

export const acceptCall = async (callId, answer) => {
  const res = await requestMethod.put(`call/acceptCall/${callId}`, {
    answer,
  });
  return res.data;
};

export const endCall = async (callId) => {
  console.log("callId", callId);
  let res = {
    data: {}
  };
  // res = await requestMethod.put(`call/endCall/${callId}`);
  return res.data;
};

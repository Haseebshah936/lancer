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


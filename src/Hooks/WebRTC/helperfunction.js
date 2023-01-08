import { requestMethod } from "../../requestMethod";

export const createCall = async (
  type,
  chatroomId,
  callerId,
  receiverId,
  offer
) => {
  // const res = await requestMethod.post("call", {
  //   chatroomId,
  //   callerId,
  //   receiverId,
  //   offer,
  //   type,
  // });
  const res = await fetch("http://localhost:3003/api/call/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatroomId,
      callerId,
      receiverId,
      offer,
      type,
    }),
  });
  const json = await res.json();
  return json;
};

export const updateCallTime = async (callId) => {
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
  // let res = {
  //   data: {},
  // };
  const res = await requestMethod.put(`call/endCall/${callId}`);
  return res.data;
};

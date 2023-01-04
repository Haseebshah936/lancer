import React from "react";
import { useNavigate } from "react-router";
import { requestMethod } from "../requestMethod";
import { handleError } from "../utils/helperFunctions";

function useCreateChat(props) {
  const navigate = useNavigate();

  const createChatRoom_Navigate = (creatorId, participantId) => {
    /*
     * This function is used to create a chat room and navigate to the chat page
     * @param {String} creatorId - The id of the user who is creating the chat room => user._id
     * @param {String} participantId - The id of the user who is the participant in the chatroom
     */
    console.log("creatorId", creatorId);
    console.log("participantId", participantId);
    requestMethod
      .post("chatroom/createChatroom", {
        participantId,
        creatorId,
      })
      .then((res) => {
        navigate(`/chat`);
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  };

  const createGroupChatRoom_Navigate = (creatorId, participantId) => {
    /*
     * This function is used to create a chat room and navigate to the chat page
     * @param {String} creatorId - The id of the user who is creating the chat room => user._id
     * @param {String} participantId - The id of the user who is the participant in the chatroom
     */
    requestMethod
      .post("chatroom/createGroupChatroom", {
        participants: [participantId],
        creatorId,
      })
      .then((res) => {
        navigate(`/chat`);
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  };

  return {
    createChatRoom_Navigate,
    createGroupChatRoom_Navigate,
  };
}

export default useCreateChat;

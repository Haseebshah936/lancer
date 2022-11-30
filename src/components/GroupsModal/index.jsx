import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import {
  FacebookTwoTone,
  Google,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import colors from "../../utils/colors";
import { useRealmContext } from "../../db/RealmContext";
import Joi from "joi";
import { toast } from "react-toastify";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  handleAuthError,
  handleError,
  handleRealmError,
} from "../../utils/helperFunctions";
import UploadAttachments from "../UploadAttachments";
import { requestMethod } from "../../requestMethod";
import CustomFilledButton from "../CustomFilledButton";
import { Box } from "@mui/system";

const schema = Joi.object({
  attachment: Joi.object({
    uri: Joi.string().required().label("Group Image"),
  }).required(),
  groupName: Joi.string().required(),
  description: Joi.string().required(),
});

function GroupsModal({ toggleClose, handleAddToGroup }) {
  const { user } = useRealmContext();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const getChatRooms = async () => {
    setChatRooms([]);
    setChatRooms([]);
    setLoading(true);
    requestMethod
      .get(`chatroom/getChatroomsByUserIdWithCreatorAcess/${user._id}`)
      .then((res) => {
        setLoading(false);
        setChatRooms((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleError(err);
      });
  };

  useEffect(() => {
    if (user) getChatRooms();
  }, [user]);

  useEffect(() => {
    console.log("chatRooms", chatRooms);
  }, [chatRooms]);

  return (
    <Wrap>
      <ClickAwayListener onClickAway={toggleClose}>
        <Form></Form>
      </ClickAwayListener>
    </Wrap>
  );
}

export default GroupsModal;

const Wrap = styled.div`
  min-height: 100vh !important;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  margin: 2rem;
  padding: 4rem 3rem;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 38rem;
  height: 58rem;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5rem 1rem;
  margin-block: 1rem !important;
  font-size: 1.4rem;
  margin: 0.6rem 0;
  border: 0.2rem solid rgba(0, 0, 0, 0.26);
  text-transform: none;
  outline: none;
  border-radius: 2.5rem;
  :focus {
    border: 0.2rem solid ${colors.primaryGreen};
  }
  ::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const Heading = styled.h2`
  font-size: 3rem;
  color: #020202;
  align-self: center;
  margin-block: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Btn = styled(Button)`
  align-self: center;
  padding: 1rem 2rem !important;
  cursor: pointer;
  margin-block: 1rem !important;
  opacity: 0.6;
  margin-top: 2.5rem;
  border-radius: 50px !important;
  width: 70%;
  color: black !important;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 2px solid transparent;
    background: linear-gradient(45deg, #050505, ${colors.borderGreen})
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  &:hover {
    opacity: 1;
    background-color: #fff !important;
  }
`;

const BtnText = styled.div`
  font-size: 1.5rem;
  text-transform: capitalize;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SocialIcon = styled(Button)`
  align-self: center;
  padding: 1rem 2rem !important;
  cursor: pointer;
  margin-block: 1rem !important;
  opacity: 0.8;
  margin-top: 2.5rem;
  border-radius: 50px !important;
  color: black !important;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 2px solid transparent;
    background: ${(props) => props.c};
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  &:hover {
    opacity: 1.5;
    background-color: #fff !important;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
  align-items: center;
  a {
    color: black;
    font-size: 1.2rem;
    margin: 0.3rem 0;
    text-decoration: underline;
  }
  a:visited {
    color: black;
  }
`;

import React, { useState } from "react";
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
import { handleAuthError, handleRealmError } from "../../utils/helperFunctions";
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

function CreateGroup({ toggleClose }) {
  const { user } = useRealmContext();
  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
  });
  const [attachment, setAttachment] = useState({
    uri: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (attachment?.uploading) {
      toast.error("Uploading image, please wait");
      setLoading(false);
      return;
    }
    const { error } = schema.validate(
      { attachment, ...groupData },
      { abortEarly: false }
    );
    if (error) {
      const { details } = error;
      details.map((e, i) => {
        toast.error(e.message);
      });
      setLoading(false);
      return;
    }
    try {
      const response = await requestMethod.post(
        "chatroom/createGroupChatroom",
        {
          ...groupData,
          image: attachment.uri,
          creatorId: user._id,
          participants: [],
        }
      );
      setLoading(false);
      toggleClose();
      // alert("Group Created");
    } catch (error) {
      setLoading(false);
      handleAuthError(error);
    }
  };

  return (
    <Wrap>
      <ClickAwayListener onClickAway={toggleClose}>
        <Form onSubmit={handleSubmit}>
          {/* <Heading>Create Group</Heading> */}
          <UploadAttachments
            attachment={attachment}
            setAttachment={setAttachment}
            type="img"
          />
          <TextField
            type="text"
            name="groupName"
            onChange={(text) =>
              setGroupData({
                ...groupData,
                groupName: text.target.value,
              })
            }
            sx={{
              "& label.Mui-focused": {
                color: colors.textGreen,
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.textGreen,
                },
              },
              "& 	.MuiFormHelperText-root": {
                fontSize: "1rem",
              },
              marginBlock: "2.5rem",
            }}
            label="Enter Group Name"
            autoFocus={true}
          />
          <TextField
            type="text"
            name="description"
            className="box"
            label="Enter Description"
            sx={{
              "& label.Mui-focused": {
                color: colors.textGreen,
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.textGreen,
                },
              },
              "& 	.MuiFormHelperText-root": {
                fontSize: "1rem",
              },
            }}
            onChange={(text) =>
              setGroupData({
                ...groupData,
                description: text.target.value,
              })
            }
            multiline
            rows={4}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {!loading ? (
              <CustomFilledButton
                style={{
                  alignSelf: "center",
                  width: "15rem",
                }}
                type={"submit"}
                title={"Create Group"}
              />
            ) : (
              <CircularProgress
                style={{
                  color: colors.primaryGreen,
                  fontSize: ".5rem",
                  marginBlock: "2.5rem",
                }}
                size={20}
              />
            )}
          </Box>
        </Form>
      </ClickAwayListener>
    </Wrap>
  );
}

export default CreateGroup;

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

const Form = styled.form`
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

import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  RadioGroup,
  TextField,
} from "@mui/material";
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
import AvatarRadio from "../AvatarRadio";

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
  const [Selected, setSelected] = useState("");

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
        <Form>
          <CustomFormControl component="fieldset">
            <FormGroup aria-label="position" column>
              <RadioGroup
                aria-labelledby="chat-group"
                name="chat-group"
                value={Selected}
                onChange={(event) => {
                  setSelected(event.target.value);
                }}
              >
                {chatRooms.length > 0 &&
                  chatRooms.map((c) => {
                    return (
                      <AvatarRadio
                        key={c.id}
                        url={c.avatar}
                        name={c.title}
                        value={c.id}
                      />
                    );
                  })}
              </RadioGroup>
            </FormGroup>
          </CustomFormControl>
          <CustomFilledButton
            style={{
              alignSelf: "center",
              paddingInline: "4rem",
              marginTop: "1rem",
            }}
            title={"Add to Group"}
            onClick={() => handleAddToGroup(Selected)}
          />
        </Form>
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
  /* margin: 2rem; */
  padding-block: 0rem 2rem;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 38rem;
  height: 58rem;
  display: flex;
  flex-direction: column;
`;

const CustomFormControl = styled(FormControl)`
  overflow-y: scroll;
  overflow-x: hidden;
  padding-inline: 1rem !important;
  padding-bottom: 1rem !important;
  background-color: aliceblue;
`;

import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";
import colors from "../../utils/colors";
import CustomFilledButton from "../CustomFilledButton";
import { Box } from "@mui/system";
import { toast } from "react-toastify";

function CreateMeeting({ toggleClose, onSubmit, loading }) {
  const [meetingDetails, setMeetingDetails] = useState("");

  return (
    <Wrap>
      <ClickAwayListener onClickAway={toggleClose}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(meetingDetails);
          }}
        >
          <TextField
            type="text"
            name="Meeting Details"
            className="box"
            label="Meeting Details"
            color="success"
            value={meetingDetails}
            onChange={(text) => {
              if (text.target.value.length > 50) {
                toast.error("Meeting Detail cannot be more than 50 characters");
              }
              setMeetingDetails(text.target.value.slice(0, 50));
            }}
            multiline
            rows={2}
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
                title={"Create Meeting"}
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

export default CreateMeeting;

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
  height: auto;
  display: flex;
  flex-direction: column;
`;

import React, { useState, useEffect } from "react";
import { Box, Divider, Input, TextField, Grid, Chip } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Joi from "joi-browser";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import colors from "../../utils/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingComp from "../LoadingComp/LoadingComp";
import { toast } from "react-toastify";
import { requestMethod } from "../../requestMethod";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRealmContext } from "../../db/RealmContext";
import { handleError } from "./../../utils/helperFunctions";

export default function CreateDisputeComp({
  setCreateDisputePopValue,
  createDisputePopValue,
  p,
  setP,
}) {
  const { user } = useRealmContext();
  const [checkedValue, setCheckedValue] = useState("Requesting for Refund");
  const [isOtherReason, setIsOtherReason] = useState(false);
  const handleClickOpen = () => {
    setCreateDisputePopValue(true);
  };

  const handleClose = () => {
    setCreateDisputePopValue(false);
    setCheckedValue("Requesting for Refund");
    setIsOtherReason(false);
  };
  const [errors, setErrors] = useState({});
  const Schema = {
    reason: Joi.string().required().label("Reason"),
  };
  const validate = () => {
    const result = Joi.validate({ reason: checkedValue }, Schema, {
      abortEarly: false,
    });
    if (!result.error) {
      setErrors({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setErrors(errors);
    return errors;
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={createDisputePopValue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box p={1}>
          <HaederP>Create a dispute</HaederP>
        </Box>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you have any issue with the order, please create a dispute so
            that we can help you resolve it.You can create a dispute for the
            following reasons:
          </DialogContentText>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose Reason for dispute
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Refund"
                onClick={() => {
                  setIsOtherReason(false);
                  setCheckedValue("Requesting for Refund");
                }}
              />
              <FormControlLabel
                value="Due to extension"
                control={<Radio />}
                label="Due to extension"
                onClick={() => {
                  setIsOtherReason(false);
                  setCheckedValue("Due to extension");
                }}
              />
              <FormControlLabel
                value="Due to extra work"
                control={<Radio />}
                label="Due to extra work"
                onClick={() => {
                  setIsOtherReason(false);
                  setCheckedValue("Due to extra work");
                }}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                onClick={() => {
                  setCheckedValue("");
                  setIsOtherReason(true);
                }}
              />
              {isOtherReason ? (
                <GreenBorderTextField
                  fullWidth
                  value={checkedValue}
                  onChange={(e) => {
                    setCheckedValue(e.target.value);
                  }}
                ></GreenBorderTextField>
              ) : null}
            </RadioGroup>
          </FormControl>
        </Box>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.becomePartnerButtonGreen,
              color: "white",
              "&:hover": {
                backgroundColor: colors.becomePartnerButtonGreen,
                color: "white",
              },
            }}
            onClick={() => {
              const v = validate();
              if (v) {
                console.log("error", v);
              } else {
                console.log("clicked", {
                  checkedValue,
                  projectId: p?._id,
                  creatorId: user?._id,
                });
                requestMethod
                  .post("customerSupport/projectDispute", {
                    disputeReason: checkedValue,
                    projectId: p?._id,
                    creatorId: user?._id,
                  })
                  .then((res) => {
                    toast.success("Dispute created successfully");
                    setCreateDisputePopValue(false);
                  })
                  .catch((err) => {
                    handleError(err);
                  });
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const HaederP = styled.p`
  font-size: 1.45rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #696969;
`;
const FileNameP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #7f7f7f;
  margin-bottom: 0px;
`;
const FileExtensionP = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 5px;
  color: #7f7f7f;
`;
const GreenBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  }
`;

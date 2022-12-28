import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Joi from "joi-browser";
import colors from "../../utils/colors";
import { Grid, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { requestMethod } from "../../requestMethod";

export default function ExtendDeliverDateComp({
  deadlineExtendedPopValue,
  setDeadlineExtendedPopValue,
  p,
  setP,
}) {
  const [date, setDate] = useState(new Date());
  const [extendDeliveryDate, setExtendDeliveryDate] = useState({
    days: "",
    reason: "",
  });

  useEffect(() => {
    console.log(date);
  }, [date]);
  const handleClickOpen = () => {
    setDeadlineExtendedPopValue(true);
  };

  const handleClose = () => {
    setDeadlineExtendedPopValue(false);
  };
  const [error, setError] = useState({});
  const schema = {
    days: Joi.number().min(1).required().label("Days"),
    reason: Joi.string().min(10).required().label("Reason"),
  };
  const validate = () => {
    const result = Joi.validate(extendDeliveryDate, schema, {
      abortEarly: false,
    });
    if (!result.error) {
      setError({});
      return null;
    }
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    setError(error);
    return error;
  };

  return (
    <div>
      <Dialog
        open={deadlineExtendedPopValue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Request Deadline Extension"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Request for the deadline extension to the buyer. The buyer will be
            notified and he has the right to accept or reject the deadlne
            extension request.
          </DialogContentText>
          <Grid
            container
            display={"flex"}
            flexDirection={"column"}
            // justifyContent={"space-between"}
            justifyContent={"center"}
          >
            <Grid item sx={11} my={1}>
              <GreenTextField
                value={extendDeliveryDate.days}
                label="No. of days you want to extend"
                onChange={(e) => {
                  setExtendDeliveryDate({
                    ...extendDeliveryDate,
                    days: e.target.value,
                  });
                }}
                fullWidth
              ></GreenTextField>
            </Grid>
            <Grid item sx={11} my={1}>
              <GreenTextField
                value={extendDeliveryDate.reason}
                label="Reason for extension"
                onChange={(e) => {
                  setExtendDeliveryDate({
                    ...extendDeliveryDate,
                    reason: e.target.value,
                  });
                }}
                fullWidth
              ></GreenTextField>
            </Grid>
            {/* <Grid item xs={5} display={"flex"} justifyContent={"center"} mt={1}>
              <TimerP>Nov 5, 2021, 12:00 PM</TimerP>
            </Grid> */}
            {/* <Grid
              item
              xs={5}
              display={"flex"}
              justifyContent={"center"}
              mt={1}
              fontStyle={"italic"}
            >
              <Form.Control
                type="date"
                name="datepic"
                placeholder="DateRange"
                className="form-control "
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
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
                if (error.days) {
                  toast.error(error.days);
                } else {
                  toast.error(error.reason);
                }
              } else {
                requestMethod
                  .put("project/createExtension/" + p._id, extendDeliveryDate)
                  .then((res) => {
                    console.log(res.data);
                    setP(res.data);
                    setExtendDeliveryDate({
                      days: "",
                      reason: "",
                    });

                    toast.success("Extension request sent successfully");
                    setDeadlineExtendedPopValue(false);
                  })
                  .catch((err) => {
                    toast.error("extension request failed try again");
                  });
              }
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const TimerP = styled.p`
  font-size: 1.45rem;
  font-weight: 600;
  color: #716f6f;
`;
const GreenTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerButtonGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerButtonGreen};
    }
  }
  // on hover mui textfield border coloR
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.becomePartnerButtonGreen};
  }
  // on focus mui textfield border coloR
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.becomePartnerButtonGreen};
  }
  // on hover mui textfield label coloR
  & .MuiInputLabel-root:hover {
    color: ${colors.becomePartnerButtonGreen};
  }

  //
`;

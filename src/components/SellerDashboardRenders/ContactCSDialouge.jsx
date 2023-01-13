import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Grid } from "@mui/material";
import Styled from "styled-components";
import Joi from "joi-browser";

import colors from "../../utils/colors";
import { toast } from "react-toastify";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import { handleError } from "../../utils/helperFunctions";

export default function ContactCSDialouge({ setCOpen, cOpen }) {
  const { user } = useRealmContext();
  const [reasonVar, setReasonVar] = useState("");
  const [errrors, setErrors] = useState({});
  const Schama = {
    reasonVar: Joi.string().required().min(10).label("Reason"),
  };
  const validate = () => {
    const result = Joi.validate({ reasonVar }, Schama, {
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

  const handleClickOpen = () => {
    setCOpen(true);
  };

  const handleClose = () => {
    setCOpen(false);
    setReasonVar("");
  };

  return (
    <div>
      <Dialog
        open={cOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Contact Customer Support"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Facing any issue? or have any query Contact our customer support
            team any time we are always here to help you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={12}>
              <GreenBorderTextField
                label={"Reason"}
                fullWidth
                multiline
                rows={4}
                value={reasonVar}
                onChange={(e) => setReasonVar(e.target.value)}
              ></GreenBorderTextField>
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              my={1}
            >
              <Button
                onClick={() => {
                  const v = validate();
                  if (v) {
                    toast.error(v.reasonVar);
                  } else {
                    console.log("reasonVar", reasonVar);
                    requestMethod
                      .post("customerSupport/other", {
                        disputeReason: reasonVar,
                        creatorId: user?._id,
                      })
                      .then((res) => {
                        toast.success(
                          "Your request has been sent to customer support team"
                        );
                      })
                      .catch((err) => {
                        handleError(err);
                      });

                    handleClose();
                  }
                }}
                autoFocus
                variant="contained"
                sx={{
                  backgroundColor: colors.becomePartnerGreen,
                  color: "white",
                  "&:hover": {
                    backgroundColor: colors.becomePartnerGreen,
                    color: "white",
                  },
                }}
              >
                Contact Customer Support
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const GreenBorderTextField = Styled(TextField)`
    & label.Mui-focused {
      color: ${colors.becomePartnerGreen};
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${colors.becomePartnerGreen};
      }
    }
  `;

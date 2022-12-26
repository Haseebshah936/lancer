import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import colors from "../../utils/colors";

export default function CancelOrderComp({
  cancelOrderPopValue,
  setCancelOrderPopValue,
}) {
  const handleClickOpen = () => {
    setCancelOrderPopValue(true);
  };

  const handleClose = () => {
    setCancelOrderPopValue(false);
  };
  return (
    <div>
      <Dialog
        open={cancelOrderPopValue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <HaederP>Cancel the order</HaederP>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the order? This action cannot be
            undone. Once you cancel the order, you will not be able to continue
            the order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: colors.becomePartnerButtonGreen,
              color: "white",
              "&:hover": {
                backgroundColor: colors.becomePartnerButtonGreen,
                color: "white",
              },
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{
              backgroundColor: colors.becomePartnerButtonGreen,
              color: "white",
              "&:hover": {
                backgroundColor: colors.becomePartnerButtonGreen,
                color: "white",
              },
            }}
          >
            Agree
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

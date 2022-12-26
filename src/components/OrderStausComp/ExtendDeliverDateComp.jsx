import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import colors from "../../utils/colors";
import { Grid } from "@mui/material";

export default function ExtendDeliverDateComp({
  deadlineExtendedPopValue,
  setDeadlineExtendedPopValue,
}) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log(date);
  }, [date]);
  const handleClickOpen = () => {
    setDeadlineExtendedPopValue(true);
  };

  const handleClose = () => {
    setDeadlineExtendedPopValue(false);
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
            justifyContent={"space-between"}
            fontStyle={"italic"}
          >
            <Grid item xs={5} display={"flex"} justifyContent={"center"} mt={1}>
              <TimerP>Nov 5, 2021, 12:00 PM</TimerP>
            </Grid>
            <Grid
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
            </Grid>
          </Grid>
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

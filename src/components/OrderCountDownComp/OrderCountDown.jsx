import React, { useState } from "react";
import { useReactCountdown } from "use-react-countdown";
import { Grid, Button, Divider } from "@mui/material";
import styled from "styled-components";
import colors from "../../utils/colors";
import DeliverOrderComp from "../OrderStausComp/DeliverOrderComp";
import CancelOrderComp from "../OrderStausComp/CancelOrderComp";
import ExtendDeliverDateComp from "../OrderStausComp/ExtendDeliverDateComp";

export default function OrderCountDown({ p, setP }) {
  const [deliverOrderPopValue, setDeliverOrderPopValue] = useState(false);
  const [cancelOrderPopValue, setCancelOrderPopValue] = useState(false);
  const [deadlineExtendedPopValue, setDeadlineExtendedPopValue] =
    useState(false);
  const calculatedTime = () => {
    const updatedDate = new Date(
      new Date(p.startedAt).getTime() + p.days * 24 * 60 * 60 * 1000
    );
    // req
    // July 22, 2029 00:00:00
    //have
    // "Mon Jan 09 2023 20:40:52";
    const month = updatedDate.toString().substring(4, 7);
    const date = updatedDate.toString().substring(8, 10);
    const year = updatedDate.toString().substring(11, 15);
    const time = updatedDate.toString().substring(16, 24);
    // console.log(
    //   `month: "${month}" date: "${date}", year: "${year}" time: "${time}"`
    // );
    // console.log(`${month} ${date}, ${year} ${time}`);
    return `${month} ${date}, ${year} ${time}`;
  };

  const [remainingDate, setRemainingDate] = useState(calculatedTime());
  // let dateToEndCountdownAt = calculatedTime();
  const { days, hours, minutes, seconds } = useReactCountdown(remainingDate);

  return (
    <div
      style={{
        boxShadow: "0 1px 21px 0 rgba(135,140,157,.2)",
        padding: "20px",
        borderRadius: "7px",
      }}
    >
      <DeliverOrderComp
        deliverOrderPopValue={deliverOrderPopValue}
        setDeliverOrderPopValue={setDeliverOrderPopValue}
      ></DeliverOrderComp>
      <CancelOrderComp
        cancelOrderPopValue={cancelOrderPopValue}
        setCancelOrderPopValue={setCancelOrderPopValue}
      ></CancelOrderComp>
      <ExtendDeliverDateComp
        deadlineExtendedPopValue={deadlineExtendedPopValue}
        setDeadlineExtendedPopValue={setDeadlineExtendedPopValue}
        p={p}
        setP={setP}
      ></ExtendDeliverDateComp>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Grid item display={"flex"} justifyContent={"center"}>
          <TimeTile>Time Left to deliver</TimeTile>
        </Grid>
        <Grid container item xs={12} display={"flex"} justifyContent={"center"}>
          <TimerGrid item xs={2} display={"flex"} flexDirection={"column"}>
            <TimerP>{days} </TimerP>
            <TimeP>Days</TimeP>
          </TimerGrid>
          <TimerGrid item xs={2} display={"flex"} flexDirection={"column"}>
            <TimerP>{hours} </TimerP>
            <TimeP>Hours</TimeP>
          </TimerGrid>
          <TimerGrid item xs={2} display={"flex"} flexDirection={"column"}>
            <TimerP>{minutes} </TimerP>
            <TimeP>min</TimeP>
          </TimerGrid>
          <TimerGrid item xs={2} display={"flex"} flexDirection={"column"}>
            <TimerP>{seconds}</TimerP>
            <TimeP>sec</TimeP>
          </TimerGrid>
        </Grid>
        {/* Buttons */}
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.becomePartnerGreen,
              color: colors.white,
              "&:hover": {
                backgroundColor: colors.becomePartnerGreen,
                color: colors.white,
              },
              minWidth: "135px",
              maxWidth: "135px",
            }}
            onClick={() => setDeliverOrderPopValue(true)}
          >
            Deliver
          </Button>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"} mt={0.5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.becomePartnerGreen,
              color: colors.white,
              "&:hover": {
                backgroundColor: colors.becomePartnerGreen,
                color: colors.white,
              },
              minWidth: "135px",
              maxWidth: "135px",
            }}
            onClick={() => setDeadlineExtendedPopValue(true)}
          >
            Extend Time
          </Button>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"} mt={0.5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.becomePartnerGreen,
              color: colors.white,
              "&:hover": {
                backgroundColor: colors.becomePartnerGreen,
                color: colors.white,
              },
              minWidth: "135px",
              maxWidth: "135px",
            }}
            onClick={() => setCancelOrderPopValue(true)}
          >
            Cancel Order
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const TimerP = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.becomePartnerGreen};
  margin-bottom: 0;
`;
const TimerGrid = styled(Grid)`
  //   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-right: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TimeP = styled.p`
  font-weight: 500;
`;
const TimeTile = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0px;
`;

import React from "react";
import styled from "styled-components";
import { Grid, Button, Divider } from "@mui/material";
// import { Timeline, TimelineEvent } from "react-event-timeline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RocketIcon from "@mui/icons-material/Rocket";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import colors from "../../utils/colors";
import OrderPalcedTimelineItem from "../../components/OrderStausComp/OrderPalcedTimelineItem";
import RequirementsTimelineItem from "../../components/OrderStausComp/RequirementsTimelineItem";
import StatusChangeTimelineItem from "../../components/OrderStausComp/StatusChangeTimelineItem";
import DeliveredTheOrderTimeLine from "../../components/OrderStausComp/DeliveredTheOrderTimeLine";
import EmployerReviewTimeLine from "../../components/OrderStausComp/EmployerReviewTimeLine";

export default function OrderStatus() {
  return (
    <div>
      <HeaderLoggedIn></HeaderLoggedIn>
      <Grid
        container
        // mr={{ xs: 0, sm: 3 }}
        // ml={{ xs: 0, sm: 3 }}
        display={"flex"}
        justifyContent={{ xs: "center", sm: "space-evenly" }}
        // style={{ backgroundColor: "#F4F4F4" }}
      >
        <Grid item xs={12} sm={8.5} className="container">
          <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
            <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
              <OrderPalcedTimelineItem></OrderPalcedTimelineItem>
              <RequirementsTimelineItem></RequirementsTimelineItem>
              {/* Order Started */}
              <StatusChangeTimelineItem
                Icon={RocketIcon}
                data={{
                  titleText: "The Order Started",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem>
              {/* Delivery Time updated staus change*/}
              <StatusChangeTimelineItem
                Icon={AccessAlarmIcon}
                data={{
                  titleText: "Your delivery date was updated to November 6",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem>
              {/* Deliverred the product*/}
              <DeliveredTheOrderTimeLine></DeliveredTheOrderTimeLine>
              {/* Project submitted staus change*/}
              <StatusChangeTimelineItem
                Icon={Inventory2Icon}
                data={{
                  titleText: "Your delivery date was updated to November 6",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem>
              {/* Employer Review TimeLine */}
              {/* Static */}
              <EmployerReviewTimeLine></EmployerReviewTimeLine>
            </Timeline>
          </Timeline>
        </Grid>
        <Grid item xs={0} sm={3} display={{ xs: "none", sm: "block" }}>
          E
        </Grid>
      </Grid>
    </div>
  );
}

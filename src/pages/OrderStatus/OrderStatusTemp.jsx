import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Button, Divider, Box } from "@mui/material";
// import { Timeline, TimelineEvent } from "react-event-timeline";
import Timeline from "@mui/lab/Timeline";

import RocketIcon from "@mui/icons-material/Rocket";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import OrderPalcedTimelineItem from "../../components/OrderStausComp/OrderPalcedTimelineItem";
import RequirementsTimelineItem from "../../components/OrderStausComp/RequirementsTimelineItem";
import StatusChangeTimelineItem from "../../components/OrderStausComp/StatusChangeTimelineItem";
import DeliveredTheOrderTimeLine from "../../components/OrderStausComp/DeliveredTheOrderTimeLine";
import EmployerReviewTimeLine from "../../components/OrderStausComp/EmployerReviewTimeLine";
import OrderCountDown from "../../components/OrderCountDownComp/OrderCountDown";
import OrderStatusTimeLine from "../../components/OrderStausComp/OrderStatusTimeLine";
import OrderJustStartedComp from "../../components/OrderStausComp/OrderJustStartedComp";
import OrderCompletedComp from "../../components/OrderStausComp/OrderCompletedComp";
import FreelancerReviewTimeLine from "../../components/OrderStausComp/FreelancerReviewTimeLine";
import LastTimeLine from "../../components/OrderStausComp/LastTimeLine";
import DeadlineUpdatedTimeLine from "../../components/OrderStausComp/DeadlineUpdatedTimeLine";
import Footer from "../../components/Footer";
import DeliverOrderComp from "../../components/OrderStausComp/DeliverOrderComp";
import DeadlineUpdateRequestTimeLine from "../../components/OrderStausComp/DeadlineUpdateRequestTimeLine";

export default function OrderStatusTemp() {
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
        {/* Order Just Started Comp Start*/}
        <Grid container item xs={12} sm={8.5} className="container">
          <Grid
            container
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid item xs={11.5}>
              <OrderJustStartedComp></OrderJustStartedComp>
            </Grid>
          </Grid>
          {/* Order Just Started Comp End*/}
          {/* Order Completed Comp Started */}
          <Grid
            container
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid item xs={11.5}>
              <OrderCompletedComp></OrderCompletedComp>
            </Grid>
          </Grid>
          {/* Order Completed Comp End */}
          <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
            <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
              <OrderPalcedTimelineItem></OrderPalcedTimelineItem>
              {/* Requiremnets send Timeline started*/}
              <RequirementsTimelineItem></RequirementsTimelineItem>
              {/* Requiremnets send Timeline Ends*/}
              {/* Order Started */}
              <StatusChangeTimelineItem
                Icon={RocketIcon}
                data={{
                  titleText: "The Order Started",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem>
              {/* Deadline Update request Time Line for buyer side Starts here */}
              <DeadlineUpdateRequestTimeLine></DeadlineUpdateRequestTimeLine>
              {/* Deadline Update request Time Line for buyer side ends here */}
              {/* Delivery Time updated timeline started */}
              <DeadlineUpdatedTimeLine></DeadlineUpdatedTimeLine>
              {/* Delivery Time updated timeline ended */}

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
              {/* Freelancer Revire TimeLine start */}
              <FreelancerReviewTimeLine></FreelancerReviewTimeLine>
              {/* Freelancer Revire TimeLine Ends */}

              {/* Last Time Line */}
              <LastTimeLine></LastTimeLine>
            </Timeline>
          </Timeline>
        </Grid>
        {/* Side BaR */}
        {/* Count Down */}
        <Grid
          container
          item
          xs={12}
          sm={3}
          // display={{ xs: "none", sm: "block" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={11}
            sx={{
              height: "400px",
              maxHeight: "400px",
            }}
          >
            <Box>
              <OrderCountDown></OrderCountDown>
              <OrderStatusTimeLine></OrderStatusTimeLine>
            </Box>
          </Grid>
          <Grid xs={11} mt={0.7}></Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

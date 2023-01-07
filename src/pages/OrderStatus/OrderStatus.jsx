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
import FreelancerGotReviewTimeLine from "../../components/OrderStausComp/FreelancerGotReviewTimeLine";
import LastTimeLine from "../../components/OrderStausComp/LastTimeLine";
// import DeadlineUpdatedTimeLine from "../../components/OrderStausComp/DeadlineUpdatedTimeLine";
import Footer from "../../components/Footer";
import DeliverOrderComp from "../../components/OrderStausComp/DeliverOrderComp";
import { useLocation, useNavigate } from "react-router-dom";
import RequestForRequirements from "../../components/OrderStausComp/RequestForRequirements";
import { useRealmContext } from "../../db/RealmContext";
import SendRquestedRequiremnetsTimeLine from "../../components/OrderStausComp/SendRquestedRequiremnetsTimeLine";
import { requestMethod } from "../../requestMethod";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReuestedForDeadlineExtensionTimeLine from "../../components/OrderStausComp/ReuestedForDeadlineExtensionTimeLine";
import ProjectDeiverdedTimeLine from "../../components/OrderStausComp/ProjectDeiverdedTimeLine";
import ShowReviewToFreelancerTimeline from "../../components/OrderStausComp/ShowReviewToFreelancerTimeline";
import ClientGotReviewTimeLine from "../../components/OrderStausComp/ClientGotReviewTimeLine";
export default function OrderStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useRealmContext();
  const [p, setP] = useState(location?.state?.p);
  const [clinetsReview, setClinetsReview] = useState({});
  const [freelancersReview, setFreelancersReview] = useState({});
  console.log("p", p);
  useEffect(() => {
    requestMethod
      .get("project/" + p._id)
      .then((res) => {
        setP(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        // navigate("/");
      });
  }, []);
  useEffect(() => {
    if (p.state === "completed") {
      setTimeout(() => {
        requestMethod
          .get(`review/sellerReview/${p?.creatorId?._id}/${p?._id}`)
          .then((res) => {
            setFreelancersReview(res.data);
            console.log("s rev", res.data);
          })
          .catch((err) => {
            console.log("s err", err);
          });
      }, 200);
    }
  }, []);
  useEffect(() => {
    if (p.state === "completed") {
      setTimeout(() => {
        requestMethod
          .get(`review/buyerReview/${p?.hired?._id}/${p?._id}`)
          .then((res) => {
            setClinetsReview(res.data);
            console.log("c rev", res.data);
          })
          .catch((err) => {
            console.log("c err", err);
          });
      }, 200);
    }
  }, []);
  useEffect(() => {
    console.log("cc rev", clinetsReview);
    console.log("ss rev", freelancersReview);
  }, [clinetsReview, freelancersReview]);

  return (
    <div>
      <HeaderLoggedIn></HeaderLoggedIn>
      {p._id}
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
          <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
            <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
              <OrderPalcedTimelineItem
                userName={p?.creatorId?.name}
                time={
                  p.createdAt.substring(0, 10) +
                  " " +
                  p.createdAt.substring(11, 19)
                }
              ></OrderPalcedTimelineItem>
              {/* Requiremnets send Timeline started*/}
              <RequirementsTimelineItem
                userName={p?.creatorId?.name}
                time={
                  p.createdAt.substring(0, 10) +
                  " " +
                  p.createdAt.substring(11, 19)
                }
                requirementDescriptionLinks={[...p.links, ...p.files]}
                requirementDescription={p.description}
              ></RequirementsTimelineItem>
              {/* Requiremnets send Timeline Ends*/}
              {/*  */}
              {/* Request For for more requirements time line starts here */}
              {user?._id !== p.creatorId._id &&
              p?.requirenments[0]?.state === "pending" ? (
                <RequestForRequirements pID={p?._id}></RequestForRequirements>
              ) : (
                <div></div>
              )}
              {/* Request For for more requirements time line ends here */}
              {/*  */}
              {/* If requirements are requested compoenent starts here */}
              {user?._id === p?.creatorId?._id &&
              p?.requirenments[0]?.state === "pending" ? (
                <SendRquestedRequiremnetsTimeLine
                  userName={p?.hired?.userId?.name}
                  recquirementId={
                    p?.requirenments[0]?._id && p?.requirenments[0]?._id
                  }
                  projectId={p?._id}
                  req={p?.requirenments}
                  setP={setP}
                ></SendRquestedRequiremnetsTimeLine>
              ) : (
                <></>
              )}
              {/* If requirements are requested compoenent ends here */}
              {/*  */}
              {p.requirenments[0].state === "provided" ? (
                <StatusChangeTimelineItem
                  Icon={RocketIcon}
                  data={{
                    titleText: "Empolyer send the new requirements",
                    time: "",
                  }}
                ></StatusChangeTimelineItem>
              ) : (
                <></>
              )}
              {/*  */}
              {/* if requirements are provided by the client time line starts here */}
              {p.requirenments[0].state === "provided" ? (
                <RequirementsTimelineItem
                  userName={p.creatorId.name}
                  time={""}
                  requirementDescriptionLinks={[
                    ...p?.requirenments[0]?.links,
                    ...p?.requirenments[0]?.files,
                  ]}
                  requirementDescription={p?.requirenments[0]?.details}
                ></RequirementsTimelineItem>
              ) : (
                <div></div>
              )}
              {/* if requirements are provided by the client time line ends here */}
              {/*  */}
              {/* if seller requested for the time extension starts here  */}

              {p.extension.map((e) => (
                <ReuestedForDeadlineExtensionTimeLine
                  Icon={AccessTimeIcon}
                  data={{
                    titleText: `requested for the ${e.days} days deadline extension.`,
                    time: "",
                    reason: e.reason,
                    p: p,
                    state: e.state,
                    id: e._id,
                  }}
                  setP={setP}
                  proj={p}
                ></ReuestedForDeadlineExtensionTimeLine>
              ))}
              {/*  */}
              {/* if seller requested for the time extension ends here  */}
              {/*  */}
              {/* if freelancer has delivered teh project timeline starts here*/}

              {p.delivery.map((d) => (
                <ProjectDeiverdedTimeLine
                  userName={p?.hired?.userId?.name}
                  time={
                    d.createdAt.substring(0, 10) +
                    " " +
                    d.createdAt.substring(11, 19)
                  }
                  requirementDescriptionLinks={[...d.links, ...d.files]}
                  requirementDescription={d.details}
                  state={d.state}
                  deliveryId={d._id}
                  p={p}
                  setP={setP}
                ></ProjectDeiverdedTimeLine>
              ))}
              {/* if freelancer has delivered teh project timeline ends here*/}
              {/*  */}
              {/* <FreelancerGotReviewTimeLine></FreelancerGotReviewTimeLine> */}
              {/*  */}
              {/*  */}
              {/* <ClientGotReviewTimeLine></ClientGotReviewTimeLine> */}
              {/*  */}
              {/* if client has accepted the project timeline starts here # rating*/}
              {p?.state === "completed" ? (
                <div>
                  {user?._id === p?.creatorId?._id ? (
                    <EmployerReviewTimeLine
                      p={p}
                      setP={setP}
                    ></EmployerReviewTimeLine>
                  ) : (
                    <ShowReviewToFreelancerTimeline
                      p={p}
                      setP={setP}
                    ></ShowReviewToFreelancerTimeline>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              {/* if client has accepted the project timeline ends here # rating*/}

              {/*  */}
              {/* project progress last timeline starts here*/}
              {p?.state !== "completed" ? (
                <LastTimeLine></LastTimeLine>
              ) : (
                <div>
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
                </div>
              )}
              {/* project progress last timeline ends here*/}
              <Grid contsiner>
                <Grid item xs={12} marginTop={5} marginBottoms={5}>
                  S
                </Grid>
                <Grid item xs={12} marginTop={5} marginBottoms={5}>
                  p
                </Grid>
                <Grid item xs={12} marginTop={5} marginBottoms={5}>
                  a
                </Grid>
                <Grid item xs={12} marginTop={5} marginBottoms={5}>
                  c
                </Grid>
                <Grid item xs={12} marginTop={5} marginBottoms={5}>
                  e
                </Grid>
              </Grid>
              {/* Static */}

              {/* Order Started */}
              {/* <StatusChangeTimelineItem
                Icon={RocketIcon}
                data={{
                  titleText: "The Order Started",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem> */}
              {/* Delivery Time updated timeline started */}
              {/* <DeadlineUpdatedTimeLine></DeadlineUpdatedTimeLine> */}
              {/* Delivery Time updated timeline ended */}

              {/* Delivery Time updated staus change*/}
              {/* <StatusChangeTimelineItem
                Icon={AccessAlarmIcon}
                data={{
                  titleText: "Your delivery date was updated to November 6",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem> */}
              {/* Deliverred the product*/}
              {/* <DeliveredTheOrderTimeLine></DeliveredTheOrderTimeLine> */}
              {/* Project submitted staus change*/}
              {/* <StatusChangeTimelineItem
                Icon={Inventory2Icon}
                data={{
                  titleText: "Your delivery date was updated to November 6",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem> */}
              {/* Employer Review TimeLine */}
              {/* Static */}
              {/* <EmployerReviewTimeLine></EmployerReviewTimeLine> */}
              {/* Freelancer Revire TimeLine start */}
              {/* <FreelancerReviewTimeLine></FreelancerReviewTimeLine> */}
              {/* Freelancer Revire TimeLine Ends */}

              {/* Last Time Line */}
              {/* <LastTimeLine></LastTimeLine> */}
            </Timeline>
          </Timeline>
          {/* Order Just Started Comp End*/}

          {/* Order Completed Comp Started */}
          {/* <Grid
            container
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid item xs={11.5}>
              <OrderCompletedComp></OrderCompletedComp>
            </Grid>
          </Grid> */}
          {/* Order Completed Comp End */}
          <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
            <Timeline sx={{ paddingLeft: "4px", paddingRight: 0 }}>
              {/* <OrderPalcedTimelineItem></OrderPalcedTimelineItem> */}
              {/* Requiremnets send Timeline started*/}
              {/* <RequirementsTimelineItem></RequirementsTimelineItem> */}
              {/* Requiremnets send Timeline Ends*/}
              {/* Request For for more requirements time line starts here */}
              {/* <RequestForRequirements pID={p?._id}></RequestForRequirements> */}
              {/* Request For for more requirements time line ends here */}
              {/* Order Started */}
              {/* <StatusChangeTimelineItem
                Icon={RocketIcon}
                data={{
                  titleText: "The Order Started",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem> */}
              {/* Delivery Time updated timeline started */}
              {/* <DeadlineUpdatedTimeLine></DeadlineUpdatedTimeLine> */}
              {/* Delivery Time updated timeline ended */}

              {/* Delivery Time updated staus change*/}
              {/* <StatusChangeTimelineItem
                Icon={AccessAlarmIcon}
                data={{
                  titleText: "Your delivery date was updated to November 6",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem> */}
              {/* Deliverred the product*/}
              {/* <DeliveredTheOrderTimeLine></DeliveredTheOrderTimeLine> */}
              {/* Project submitted staus change*/}
              {/* <StatusChangeTimelineItem
                Icon={Inventory2Icon}
                data={{
                  titleText: "Your delivery date was updated to November 6",
                  time: "Nov 5, 3:49 PM",
                }}
              ></StatusChangeTimelineItem> */}
              {/* Employer Review TimeLine */}
              {/* Static */}
              {/* <EmployerReviewTimeLine></EmployerReviewTimeLine> */}
              {/* Freelancer Revire TimeLine start */}
              {/* <FreelancerReviewTimeLine></FreelancerReviewTimeLine> */}
              {/* Freelancer Revire TimeLine Ends */}

              {/* Last Time Line */}
              {/* <LastTimeLine></LastTimeLine> */}
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
              <OrderCountDown p={p} setP={setP}></OrderCountDown>
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

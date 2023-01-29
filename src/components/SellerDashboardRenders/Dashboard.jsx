import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import { handleError } from "../../utils/helperFunctions";
import LineGraphWidget from "../DashboardComponents/LineGraphWidget";
import OngoingOrdersWidget from "../DashboardComponents/OngoingOrdersWidget";
import PastOrdersWidget from "../DashboardComponents/PastOrdersWidget";
import RadialChartWidget from "../DashboardComponents/RadialChartWidget";
import StatCardWidget from "../DashboardComponents/StatCardWidget";
import AptitudeDialouge from "./AptitudeDialouge";
import { UserState } from "realm-web";
import ContactCSDialouge from "./ContactCSDialouge";
import colors from "../../utils/colors";
import { useCustomContext } from "../../Hooks/useCustomContext";
const Dashboard = ({ ongoingData, loader }) => {
  const { user } = useRealmContext();
  const { activeProfile } = useCustomContext();
  const [views, setViews] = useState([]);
  const location = useLocation();
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [activeOrdersCount, setActiveOrdrCount] = useState(0);
  const [cancelledOrdersCount, setCancelledOrdersCount] = useState(0);
  useEffect(() => {
    const path = location.pathname.split("/");
    if (path[1] === "f") {
      requestMethod.get(`project/seller/onGoing/${user?._id}`).then((res) => {
        console.log(res.data.length);
        setActiveOrdrCount(res.data.length);
      });
      requestMethod.get("project/seller/completed/" + user?._id).then((res) => {
        console.log(res.data.length);
        setCompletedOrdersCount(res.data.length);
      });
      requestMethod.get("project/seller/cancelled/" + user?._id).then((res) => {
        console.log(res.data.length);
        setCancelledOrdersCount(res.data.length);
      });
    } else {
      requestMethod.get(`project/creator/onGoing/${user?._id}`).then((res) => {
        console.log(res.data.length);
        setActiveOrdrCount(res.data.length);
      });
      requestMethod
        .get(`project/creator/completed/${user?._id}`)
        .then((res) => {
          console.log(res.data.length);
          setCompletedOrdersCount(res.data.length);
        });
      requestMethod
        .get(`project/creator/cancelled/${user?._id}`)
        .then((res) => {
          console.log(res.data.length);
          setCancelledOrdersCount(res.data.length);
        });
    }
  }, []);
  const path = location.pathname.split("/");

  const getViews = async (id) => {
    try {
      const res = await requestMethod.get(
        `view/user/${path[1] === "f" ? "seller" : "buyer"}/${id}`
      );
      const data = res.data;
      setViews(data);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (user) {
      getViews(user._id);
    }
  }, [user]);

  return (
    <>
      {" "}
      <AptitudeDialouge />
      <ContactCSDialouge />
      {/* <Grid
        container
        display={"flex"}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        <Grid item my={1} xs={12}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.becomePartnerButtonGreen,
              color: "white",
              "&:hover": {
                backgroundColor: colors.becomePartnerButtonGreen,
                color: "white",
              },
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Apply for Aptitude Test
          </Button>
        </Grid>
        <Grid item my={1} xs={12}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.becomePartnerButtonGreen,
              color: "white",
              "&:hover": {
                backgroundColor: colors.becomePartnerButtonGreen,
                color: "white",
              },
            }}
            onClick={() => {
              setCOpen(true);
            }}
          >
            Contact Customer Support
          </Button>
        </Grid>
      </Grid> */}
      <Grid
        item
        container
        columnSpacing={2}
        rowSpacing={2}
        style={{
          paddingRight: "5px",
          marginRight: "-5px",
          paddingBottom: "5px",
          marginBottom: "-5px",
          overflow: "hidden",
        }}
      >
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget
            Heading="Active Orders"
            Value={
              activeOrdersCount === 0 ? "No Active Orders" : activeOrdersCount
            }
            link={activeProfile === "seller" ? "/f/projects" : "/e/projects"}
            tabValue={activeProfile === "seller" ? 2 : 1}
          />
        </Grid>
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget
            Heading="Completed Orders"
            Value={
              completedOrdersCount === 0
                ? "No Completed Orders"
                : completedOrdersCount
            }
            link={activeProfile === "seller" ? "/f/projects" : "/e/projects"}
            tabValue={activeProfile === "seller" ? 3 : 2}
          />
        </Grid>
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget
            Heading="Cancelled Orders"
            Value={
              cancelledOrdersCount === 0
                ? "No Cancelled Orders"
                : cancelledOrdersCount
            }
            link={activeProfile === "seller" ? "/f/reviews" : "/e/reviews"}
          />
        </Grid>
        <Grid item container columnSpacing={2} rowSpacing={2}>
          <Grid
            item
            rowSpacing={2}
            laptop={12}
            desktop={8}
            tablet={12}
            mobile={12}
          >
            <LineGraphWidget data={views} />
          </Grid>
          <Grid
            item
            rowSpacing={2}
            laptop={12}
            desktop={4}
            tablet={12}
            mobile={12}
          >
            <RadialChartWidget
              RCWData={[
                {
                  name: "ongoing Orders",
                  value: activeOrdersCount === 0 ? 0 : activeOrdersCount,
                  fill: "#8D60C6",
                },
                {
                  name: "Completed Orders",
                  value: completedOrdersCount === 0 ? 0 : completedOrdersCount,
                  fill: "#F980B0",
                },
                {
                  name: "Cancelled Orders",
                  value: cancelledOrdersCount === 0 ? 0 : cancelledOrdersCount,
                  fill: "#F9D356",
                },
                {
                  name: "Total Orders",
                  value:
                    activeOrdersCount +
                      completedOrdersCount +
                      cancelledOrdersCount ===
                    0
                      ? 0
                      : activeOrdersCount +
                        completedOrdersCount +
                        cancelledOrdersCount,
                  fill: "#43C8E0",
                },
              ]}
            />
          </Grid>
        </Grid>

        <Grid item rowSpacing={2} mobile={12}>
          <OngoingOrdersWidget ongoingOrders={ongoingData} loader={loader} />
        </Grid>
        <Grid item rowSpacing={2} mobile={12}>
          <PastOrdersWidget />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

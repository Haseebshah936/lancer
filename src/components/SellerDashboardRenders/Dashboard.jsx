import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useRealmContext } from "../../db/RealmContext";
import LineGraphWidget from "../DashboardComponents/LineGraphWidget";
import OngoingOrdersWidget from "../DashboardComponents/OngoingOrdersWidget";
import PastOrdersWidget from "../DashboardComponents/PastOrdersWidget";
import RadialChartWidget from "../DashboardComponents/RadialChartWidget";
import StatCardWidget from "../DashboardComponents/StatCardWidget";
const Dashboard = ({ ongoingData, loader }) => {
  const { user } = useRealmContext();

  useEffect(() => {
    console.log("User", user);
  }, [user]);
  return (
    <>
      {" "}
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
            Heading="Completed Orders"
            Value={
              user?.seller.completedOrders !== null
                ? user?.seller.completedOrders
                : "-"
            }
          />
        </Grid>
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget
            Heading="Active Orders"
            Value={
              user?.seller.activeOrders !== null
                ? user?.seller.activeOrders
                : "-"
            }
          />
        </Grid>
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget
            Heading="Reviews"
            Value={user?.seller.reviews !== null ? user?.seller.reviews : "-"}
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
            <LineGraphWidget />
          </Grid>
          <Grid
            item
            rowSpacing={2}
            laptop={12}
            desktop={4}
            tablet={12}
            mobile={12}
          >
            <RadialChartWidget />
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

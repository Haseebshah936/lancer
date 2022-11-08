import { Grid } from "@mui/material";
import React from "react";
import LineGraphWidget from "../DashboardComponents/LineGraphWidget";
import OngoingOrdersWidget from "../DashboardComponents/OngoingOrdersWidget";
import PastOrdersWidget from "../DashboardComponents/PastOrdersWidget";
import RadialChartWidget from "../DashboardComponents/RadialChartWidget";
import StatCardWidget from "../DashboardComponents/StatCardWidget";
const Dashboard = () => {
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
          <StatCardWidget />
        </Grid>
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget Heading="Task Completed" Value={30} />
        </Grid>
        <Grid item rowSpacing={2} laptop={5} desktop={4} tablet={5} mobile={12}>
          <StatCardWidget Heading="Reviews" Value={30} />
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
          <OngoingOrdersWidget />
        </Grid>
        <Grid item rowSpacing={2} mobile={12}>
          <PastOrdersWidget />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

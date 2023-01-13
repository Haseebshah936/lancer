import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRealmContext } from "../../db/RealmContext";
import colors from "../../utils/colors";
import LineGraphWidget from "../DashboardComponents/LineGraphWidget";
import OngoingOrdersWidget from "../DashboardComponents/OngoingOrdersWidget";
import PastOrdersWidget from "../DashboardComponents/PastOrdersWidget";
import RadialChartWidget from "../DashboardComponents/RadialChartWidget";
import StatCardWidget from "../DashboardComponents/StatCardWidget";
import AptitudeDialouge from "./AptitudeDialouge";
import { UserState } from "realm-web";
import { requestMethod } from "../../requestMethod";
import ContactCSDialouge from "./ContactCSDialouge";
const Dashboard = ({ ongoingData, loader }) => {
  const { user } = useRealmContext();
  const [open, setOpen] = React.useState(false);
  const [cOpen, setCOpen] = React.useState(false);

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  return (
    <>
      {" "}
      <AptitudeDialouge setOpen={setOpen} open={open}></AptitudeDialouge>
      <ContactCSDialouge cOpen={cOpen} setCOpen={setCOpen}></ContactCSDialouge>
      <Grid
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
      </Grid>
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

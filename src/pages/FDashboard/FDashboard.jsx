import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
// import Header from "../../components/Header";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FSideBar from "../../pages/FSideBar/FSideBar";
import SellerDashboard from "../SellerDashboard";
import Dashboard from "../../components/SellerDashboardRenders/Dashboard";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
export default function FDashboard() {
  const { user } = useRealmContext();
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [ongoingLoader, setOngoingLoader] = useState(true);
  const [pastInvoices, setPastInvoices] = useState([]);
  const [pastInvoicesLoader, setPastInvoiceLoader] = useState(true);

  const getOngoingOrders = async (id) => {
    const response = await requestMethod.get("project/seller/onGoing/" + id);
    return response.data;
  };

  const getPastInvoices = async (id) => {
    const response = await requestMethod.get(
      "invoice/getInvoiceByUserId/seller/" + id
    );
    return response.data;
  };

  useEffect(() => {
    if (user) {
      getOngoingOrders(user._id).then((data) => {
        setOngoingOrders(data);
        setOngoingLoader(false);
      });
      getPastInvoices(user._id).then((data) => {
        setPastInvoices(data);
        setPastInvoiceLoader(false);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>

      <Container>
        <Box sx={{ flexGrow: 1, pt: 1, pb: 1 }}>
          <ThemeProvider
            theme={createTheme({
              breakpoints: {
                values: {
                  laptop: 1024,
                  tablet: 640,
                  mobile: 0,
                  desktop: 1280,
                  xs: 0,
                  sm: 600,
                  md: 900,
                  lg: 1200,
                  xl: 1536,
                },
              },
            })}
          >
            <Grid container spacing={2}>
              <Grid item mobile={12} laptop={4} tablet={5} desktop={3}>
                <FSideBar></FSideBar>
              </Grid>

              <Grid
                item
                mobile={12}
                tablet={7}
                laptop={8}
                desktop={9}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Dashboard
                  ongoingData={ongoingOrders}
                  ongoingLoader={ongoingLoader}
                  pastInvoices={pastInvoices}
                  pastInvoicesLoader={pastInvoicesLoader}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

      <Footer></Footer>
    </div>
  );
}

const Container = Styled.div`
  margin-inline: 7%;
`;

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Header from "../components/HeaderLoggedIn";
import Footer from "../components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../components/DashboardComponents/Sidebar";
import StatCardWidget from "../components/DashboardComponents/StatCardWidget";
import LineGraphWidget from "../components/DashboardComponents/LineGraphWidget";
import RadialChartWidget from "../components/DashboardComponents/RadialChartWidget";
import OngoingOrdersWidget from "../components/DashboardComponents/OngoingOrdersWidget";
import PastOrdersWidget from "../components/DashboardComponents/PastOrdersWidget";
import { Button } from "@material-ui/core";
import { useRealmContext } from "../db/RealmContext";

const SellerDashboard = () => {
  const { currentUser } = useRealmContext();
  return (
    <>
      <Header />
      <Button
        onClick={async () => {
          const mongo = currentUser.mongoClient("mongodb-atlas");
          const collection = mongo.db("test").collection("test");
          const result = await collection.insertOne({
            name: "lily of the valley",
            sunlight: "full",
            color: "white",
            type: "perennial",
            _partition: "Store 47",
          });
          // const result = await collection.find();
          console.log(result);
        }}
      >
        Hello
      </Button>
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
                },
              },
            })}
          >
            <Grid container spacing={2}>
              <Grid item mobile={12} laptop={4} tablet={5} desktop={3}>
                <Sidebar />{" "}
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
                  <Grid
                    item
                    rowSpacing={2}
                    laptop={5}
                    desktop={4}
                    tablet={5}
                    mobile={12}
                  >
                    <StatCardWidget />
                  </Grid>
                  <Grid
                    item
                    rowSpacing={2}
                    laptop={5}
                    desktop={4}
                    tablet={5}
                    mobile={12}
                  >
                    <StatCardWidget Heading="Task Completed" Value={30} />
                  </Grid>
                  <Grid
                    item
                    rowSpacing={2}
                    laptop={5}
                    desktop={4}
                    tablet={5}
                    mobile={12}
                  >
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
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default SellerDashboard;

const Container = styled.div`
  margin-inline: 7%;
`;

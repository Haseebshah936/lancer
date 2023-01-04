import { Paper, Typography, styled, Grid, Divider } from "@mui/material";
import * as styled2 from "styled-components";
import colors from "../../utils/colors";
import CustomFilledButton from "../CustomFilledButton";

const Orders = [
  {
    id: 1,
    name: "React JS Web App",
    summary:
      "I want to you to redesign my react web app and make it responsive, with extra designs",
    type: "Milestone",
    price: "$600",
    Location: "UK",
    Deadline: "10 days left",
  },
  {
    id: 2,
    name: "React Native App",
    summary: "I want to you to redesign my react Native app",
    type: "Milestone",
    price: "$600",
    Location: "UK",
    Deadline: "10 days left",
  },
  {
    id: 3,
    name: "Amazon Dropshipping",
    summary: "I want to you to product hunt for me and manage my store",
    type: "Milestone",
    price: "$600",
    Location: "UK",
    Deadline: "10 days left",
  },
  {
    id: 4,
    name: "Wordpress Website build",
    summary:
      "I want to you to make a woocommerce store for me and add products to it",
    type: "Milestone",
    price: "$600",
    Location: "UK",
    Deadline: "10 days left",
  },
];
const CardHeading = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.8rem",
});

const OrderName = styled(Typography)({
  color: colors.textGreen,
  fontWeight: "500",
  fontSize: "1.7rem",
});

const OrderSummary = styled(Typography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "60ch",
  paddingTop: "4px",
  color: "#9A9494",
});

const OrderDetailType = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.3rem",
  paddingBottom: "4px",
});

const OrderDetailName = styled(Typography)({
  fontWeight: "500",
  fontSize: "1.2rem",
  color: "#838383",
});

const OngoingOrdersWidget = ({ title = "Ongoing Orders" }) => {
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,
          margin: "auto",
          maxWidth: "100%",
        }}
      >
        <HeaderrWrapper>
          <CardHeading>{title}</CardHeading>
          <CustomFilledButton
            title={"View All"}
            style={{ margin: "5px 0px 0px 0px" }}
          ></CustomFilledButton>
        </HeaderrWrapper>
        <Divider sx={{ mx: -2, mb: 2 }} />

        {Orders.map((order) => (
          <OrderWrapper>
            <OrderName>{order.name}</OrderName>
            <OrderSummary variant="subtitle1">{order.summary}</OrderSummary>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              sx={{ pt: 1 }}
            >
              <Grid item mobile={3}>
                <OrderDetailType>Order Type</OrderDetailType>
                <OrderDetailName>{order.type}</OrderDetailName>
              </Grid>
              <Grid item mobile={3}>
                <OrderDetailType>Project Price</OrderDetailType>
                <OrderDetailName>{order.price}</OrderDetailName>
              </Grid>
              <Grid item mobile={3}>
                <OrderDetailType>Location</OrderDetailType>
                <OrderDetailName>{order.Location}</OrderDetailName>
              </Grid>
              <Grid item mobile={3}>
                <OrderDetailType>Deadline</OrderDetailType>
                <OrderDetailName>{order.Deadline}</OrderDetailName>
              </Grid>
            </Grid>
          </OrderWrapper>
        ))}
      </Paper>
    </>
  );
};

export default OngoingOrdersWidget;

const HeaderrWrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  padding-bottom:15px;
`;

const OrderWrapper = styled2.default.div`
  display: flex;
  flex-direction: column;
  padding-bottom:30px;
  
`;

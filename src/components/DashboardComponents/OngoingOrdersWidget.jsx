import {
  Paper,
  Typography,
  styled,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as styled2 from "styled-components";
import colors from "../../utils/colors";
import CustomFilledButton from "../CustomFilledButton";

const OngoingOrdersWidget = ({
  title = "Ongoing Orders",
  ongoingOrders,
  loader,
  tabValue,
  link,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Ongoing Orders", ongoingOrders);
  }, [ongoingOrders]);

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
            onClick={() => {
              if (link) {
                navigate(link, {
                  state: {
                    value: tabValue,
                  },
                });
              }
            }}
          ></CustomFilledButton>
        </HeaderrWrapper>
        <Divider sx={{ mx: -2, mb: 2 }} />

        {loader ? (
          <CircularProgress
            sx={{
              "&.MuiCircularProgress-root": {
                color: colors.textGreen,
              },
              alignSelf: "center",
            }}
          />
        ) : ongoingOrders.length > 0 ? (
          ongoingOrders.map((order) => (
            <OrderWrapper>
              <OrderName>{order.title}</OrderName>

              <Grid
                container
                spacing={2}
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ pt: 1 }}
              >
                <Grid item mobile={4}>
                  <OrderDetailType>Order Type</OrderDetailType>
                  <OrderDetailName>{order.pricingType}</OrderDetailName>
                </Grid>
                <Grid item mobile={4}>
                  <OrderDetailType>Project Price</OrderDetailType>
                  <OrderDetailName>${order.budget}</OrderDetailName>
                </Grid>
                <Grid item mobile={4}>
                  <OrderDetailType>Deadline</OrderDetailType>

                  {order.days <= 3 ? (
                    <OrderDetailName sx={{ color: "red" }}>
                      {order.days} days
                    </OrderDetailName>
                  ) : (
                    <OrderDetailName>{order.days} days</OrderDetailName>
                  )}
                </Grid>
              </Grid>
            </OrderWrapper>
          ))
        ) : (
          <CardHeading sx={{ color: "black", fontWeight: "bold" }}>
            No Ongoing Orders Yet
          </CardHeading>
        )}
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

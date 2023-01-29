import React from "react";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import colors from "../../utils/colors";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51JgDf0HHulWCxCO2rvJaz2Jxm1yUfy52n9weCoqxnXDH4jVVrjyu4UewmnhBGJSYamZhTvwx8JRkaKPq4w4ZwRdn00gD4wZNAX"
);
const PaymentStatus = () => {
  return (
    <Container>
      <HeaderLoggedIn />
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
      <Footer />
    </Container>
  );
};

export default PaymentStatus;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`;

import { CircularProgress } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { validate } from "joi-browser";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";
import { handleError } from "../../utils/helperFunctions";

function Payment(props) {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const { user } = useRealmContext();
  const { order, setOrder } = useCustomContext();
  const navigate = useNavigate();

  const validate = () => {
    console.log(order);
    // requestMethod("invoice/invoiceAndProject ", Project)
    //   .then(() => {
    //     toast.success("Order Placed Successfully");
    //     setOrder({});
    //     navigate("/home");
    //   })
    //   .catch((err) => {
    //     handleError(err);
    //     navigate("/home");
    //   });
    // gig = {};
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent.status) {
        case "succeeded":
          validate();
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  return (
    <Wrapper>
      <CircularProgress size={"5rem"} />
      <Text>{message}</Text>
    </Wrapper>
  );
}

export default Payment;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  .MuiCircularProgress-colorPrimary {
    color: ${colors.primaryGreen} !important;
  }
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.primaryGreen};
  margin-top: 2rem;
`;

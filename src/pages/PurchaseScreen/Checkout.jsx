import { Close } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import CustomFilledButton from "../../components/CustomFilledButton";
import CustomIconButton from "../../components/CustomIconButton";
import { requestMethod } from "../../requestMethod";
import { miniMobile, mobile } from "../../responsive";
import colors from "../../utils/colors";
import { handleError } from "../../utils/helperFunctions";

function Checkout({ togglePaymentModal, project }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  //   const loaction = useLocation();
  //   let options = {
  //     // passing the client secret obtained in step 3
  //     // clientSecret: loaction.state.clientSecret,
  //     // Fully customizable with appearance API.
  //     clientSecret,
  //     appearance: {
  //       /*...*/
  //     },
  //   };

  //   useEffect(() => {
  //     console.log(loaction.state.clientSecret);
  //     // if (!loaction.state.clientSecret) navigate("/");
  //   }, []);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = stripe
      .confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect: "if_required",
      })
      .then((res) => {
        if (res.error) {
          throw res.error.message;
        }
        requestMethod.post("invoice/invoiceAndProject ", project).then(() => {
          toast.success("Order Placed Successfully");
          navigate("/home");
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
        setLoading(false);
      });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <IconBtn onClick={togglePaymentModal}>
          <Close fontSize="large" />
        </IconBtn>
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
        />
        {/* {errorMessage && <Error>{errorMessage}</Error>} */}
        <CustomFilledButton
          style={{
            alignSelf: "center",
            width: "20rem",
            color: colors.white,
          }}
          title={"Submit"}
          type="submit"
          disabled={!stripe}
          loading={loading}
        />
      </Form>
    </Container>
  );
}

export default Checkout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  background-color: ${colors.white};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-inline: 12%;
  ${mobile({
    marginInline: "5%",
  })}
  ${miniMobile({
    marginInline: "0",
  })}
`;

const IconBtn = styled(IconButton)`
  align-self: flex-end;
  position: absolute;
  right: -1rem;
  top: -1rem;
`;

const Error = styled.div`
  color: red;
  align-self: center;
  font-size: 1.5rem;
`;

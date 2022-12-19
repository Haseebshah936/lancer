import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import { Visa, Mastercard } from "react-pay-icons";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import Footer from "../../components/Footer";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../utils/payment";
import TextFieldComp from "../../components/GigComponent/TextFieldComp";

export default function PurchaseScreen() {
  const [Card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCard({ issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setCard({
      ...Card,
      focused: target.name,
    });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setCard({ ...Card, [target.name]: target.value });
  };

  return (
    <>
      <Container>
        <HeaderLoggedIn />

        <Content>
          <Grid container>
            <Grid item container mobile={8}>
              <Grid
                item
                container
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
                mobile={12}
              >
                <Typography variant="h4">Credit & Debit Cards</Typography>
                <Visa style={{ marginLeft: "5px", width: "2.5rem" }} />
                <Mastercard style={{ marginLeft: "5px", width: "2.5rem" }} />
              </Grid>

              <Grid item container mobile={12} sx={{ mt: 1 }}>
                <Grid item mobile={5.75}>
                  <TextFieldComp
                    label="Enter Your Full Name"
                    name="name"
                    value={Card.name}
                    pattern="[a-z A-Z-]+"
                    // error={errors.gigTitle}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item mobile={0.5}></Grid>

                <Grid item mobile={5.75}>
                  <TextFieldComp
                    label="Card Number"
                    name="number"
                    value={Card.number}
                    type="tel"
                    pattern="[\d| ]{16,22}"
                    // error={errors.gigTitle}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
              </Grid>

              <Grid item container mobile={12}>
                <Grid item mobile={5.75}>
                  <TextFieldComp
                    label="Expiration Date"
                    type="tel"
                    name="expiry"
                    value={Card.expiry}
                    pattern="\d\d/\d\d"
                    // error={errors.gigTitle}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item mobile={0.5}></Grid>

                <Grid item mobile={5.75}>
                  <TextFieldComp
                    label="Security Code"
                    type="tel"
                    name="cvc"
                    value={Card.cvc}
                    pattern="\d{3}"
                    // error={errors.gigTitle}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item container mobile={4}>
              <Cards
                cvc={Card.cvc}
                expiry={Card.expiry}
                focused={Card.focused}
                name={Card.name}
                number={Card.number}
                callback={handleCallback}
              />
            </Grid>
          </Grid>
        </Content>

        <Footer />
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  padding-inline: 7%;
`;

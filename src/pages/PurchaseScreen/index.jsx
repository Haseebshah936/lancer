import { CardMedia, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import CustomIconButton from "../../components/CustomIconButton";

import OrderSummary from "./OrderSummary";
import colors from "../../utils/colors";

import { jazz, EasyPaisa } from "../../assets";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { Wallet } from "@mui/icons-material";

export default function PurchaseScreen() {
  const [errors, setErrors] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    console.log("Errors", errors);
    console.log("Date Error", errors.expiry);
  }, [errors]);

  const [Card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
  });

  const handleCallback = useCallback(
    ({ issuer }, isValid) => {
      console.log("Evernt", issuer);
      console.log("isValid", isValid);
      if (isValid) {
        setCard({ ...Card, issuer });
        console.log("Valid ", issuer);
      }
    },
    [Card]
  );

  // const handleCallback = ({ issuer }, isValid) => {
  //   if (isValid) {
  //     setCard({ issuer });
  //   }
  // };

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

  const [select, setSelect] = useState("creditCard");

  useEffect(() => {
    console.log("Select: ", select);
  }, [select]);

  useEffect(() => {
    console.log("Card:", Card);
  }, [Card]);

  return (
    <>
      <Container>
        <HeaderLoggedIn />

        <Content>
          <Grid container columnSpacing={{ laptop: 2, desktop: 0 }}>
            <Grid item mobile={12} laptop={7}>
              <RadioGroup
                sx={{ m: 0, p: 0, width: "100%" }}
                defaultValue="creditCard"
                name="payment"
                value={select}
                onChange={(event) => {
                  setSelect(event.target.value);
                }}
              >
                <RadioContainer>
                  <Radio
                    value="creditCard"
                    sx={{
                      color: colors.textGreen,
                      "&.Mui-checked": {
                        color: colors.textGreen,
                      },
                    }}
                  />

                  <Typography variant="h4">Credit & Debit Cards</Typography>
                  <Visa style={{ marginLeft: "5px", width: "2.5rem" }} />
                  <Mastercard style={{ marginLeft: "5px", width: "2.5rem" }} />
                </RadioContainer>

                {select === "creditCard" && (
                  <Grid container mobile={12} sx={{ my: 2 }}>
                    <Grid item container mobile={12}>
                      <Grid container justifyContent="center" mobile={12}>
                        <Grid item mobile={12}>
                          <Cards
                            cvc={Card.cvc}
                            expiry={Card.expiry}
                            focused={Card.focused}
                            name={Card.name}
                            number={Card.number}
                            callback={(e, j) => handleCallback(e, j)}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        mobile={12}
                        rowSpacing={1}
                        sx={{ pt: 2 }}
                      >
                        <Grid item mobile={12} laptop={5.75}>
                          <TextFieldComp
                            label="Enter Your Full Name"
                            name="name"
                            value={Card.name}
                            pattern="[a-z A-Z-]+"
                            error={errors.name}
                            errmsg={errors.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </Grid>
                        <Grid item mobile={12} laptop={0.5}></Grid>

                        <Grid item mobile={12} laptop={5.75}>
                          <TextFieldComp
                            label="Card Number"
                            name="number"
                            value={Card.number}
                            type="tel"
                            pattern="[\d| ]{16,22}"
                            error={errors.number}
                            errmsg={errors.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        rowSpacing={1}
                        mobile={12}
                        sx={{ pt: 2 }}
                      >
                        <Grid item mobile={12} laptop={5.75}>
                          <TextFieldComp
                            label="Expiration Date"
                            type="tel"
                            name="expiry"
                            value={Card.expiry}
                            pattern="\d\d/\d\d"
                            error={errors.expiry}
                            errmsg={errors.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </Grid>
                        <Grid item mobile={12} laptop={0.5}></Grid>

                        <Grid item mobile={12} laptop={5.75}>
                          <TextFieldComp
                            label="Security Code"
                            type="tel"
                            name="cvc"
                            value={Card.cvc}
                            pattern="\d{3}"
                            error={errors.cvc}
                            errmsg={errors.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </Grid>
                      </Grid>
                      <input type="hidden" name="issuer" value={Card.issuer} />
                    </Grid>
                  </Grid>
                )}

                <RadioContainer>
                  <Radio
                    value="JazzCash"
                    sx={{
                      color: colors.textGreen,
                      "&.Mui-checked": {
                        color: colors.textGreen,
                      },
                    }}
                  />
                  <Typography variant="h4">JazzCash</Typography>
                  <CardMedia
                    sx={{ ml: 1 }}
                    component="img"
                    sizes="contain"
                    style={{
                      width: "35px",
                    }}
                    image={jazz}
                    alt="Gig Image"
                  />
                </RadioContainer>

                <RadioContainer>
                  <Radio
                    value="EasyPaisa"
                    sx={{
                      color: colors.textGreen,
                      "&.Mui-checked": {
                        color: colors.textGreen,
                      },
                    }}
                  />

                  <Typography variant="h4">EasyPaisa</Typography>
                  <CardMedia
                    sx={{ ml: 1 }}
                    component="img"
                    sizes="contain"
                    style={{
                      width: "30px",
                    }}
                    image={EasyPaisa}
                    alt="Gig Image"
                  />
                </RadioContainer>

                <RadioContainer>
                  <Radio
                    value="wallet"
                    sx={{
                      color: colors.textGreen,
                      "&.Mui-checked": {
                        color: colors.textGreen,
                      },
                    }}
                  />

                  <Typography variant="h4">Wallet</Typography>
                  <Wallet
                    sx={{ ml: 1, fontSize: "3.0rem", color: colors.textGreen }}
                  />
                </RadioContainer>
              </RadioGroup>
            </Grid>

            <Grid item mobile={1}></Grid>

            <Grid item mobile={12} laptop={4}>
              <Grid item container justifyContent="center" mobile={12}>
                <Grid item mobile={12}>
                  <OrderSummary
                    Card={Card}
                    errors={errors}
                    setErrors={setErrors}
                    order={state}
                    method={select}
                    style={{ mt: 0 }}
                  />
                </Grid>
              </Grid>
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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0px;
`;

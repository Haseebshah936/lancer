import React, { useState } from "react";
import { Box, Button, Grid, Tab, Tabs, TextField } from "@mui/material";
import Styled from "styled-components";
import colors from "./../../utils/colors";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import { handleError } from "./../../utils/helperFunctions";

export default function WithdrawFunds() {
  const { user } = useRealmContext();
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div style={{ width: "100%" }}>
      <Grid conatiner>
        <Grid
          item
          xs={12}
          boxShadow=" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          my={2}
        >
          <Box padding={2}>
            <TitleP className="text-left">Account Details</TitleP>
            <Grid container>
              <Grid item xs={12} sx={{ mb: 1.6 }}>
                <GreenBorderTextField
                  fullWidth
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <GreenBorderTextField
                  fullWidth
                  id="outlined-basic"
                  label="Card IBAN"
                  variant="outlined"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <GreenBorderTextField
                  fullWidth
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                my={1.2}
                display={"flex"}
                justifyContent={"center"}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    width: "130px",
                    height: "40px",
                    backgroundColor: colors.becomePartnerGreen,
                  }}
                  onClick={() => {
                    console.log("withdrawal", nameOnCard, cardNumber);
                    // userId, amount, IBAN, accountHolderName
                    requestMethod
                      .post("withdrawal", {
                        userId: user?._id,
                        amount: amount,
                        IBAN: cardNumber,
                        accountHolderName: nameOnCard,
                      })
                      .then((res) => {
                        console.log("res", res);
                        toast.success("Withdraw successfully");
                      })
                      .catch((err) => {
                        console.log("err", err);
                        handleError(err);
                      });
                  }}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          my={1.2}
          className="border rounded"
          padding={2}
        >
          <div style={{ height: "200px" }}>
            <TitleP>Wallet</TitleP>
            <div
              className="d-flex justify-content-center align-items-center rounded"
              style={{
                height: "100px",
                backgroundColor: colors.becomePartnerButtonGreen,
              }}
            >
              <div
                style={{
                  backgroundColor: colors.becomePartnerGreen,
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  fontSize: "30px",
                  paddingTop: "10px",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <p style={{ color: "white" }}>$</p>
              </div>
              <Box mx={{ xs: 3, sm: 1 }}>
                <p style={{ color: "white", fontSize: "1.5rem" }}>
                  Avalible Amount
                </p>
                <p style={{ color: "white", fontSize: "1.5rem" }}>
                  {user?.currentBalance} $
                </p>
              </Box>
            </div>
            <div className="d-flex to-row justify-content-between pe-2 ps-2">
              <div className="pt-3">
                <STitleP>Total Credit</STitleP>
                <STitleP>{user?.currentBalance} $</STitleP>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;
const STitleP = Styled.p`
    font-size: 1.4rem;
    font-weight: 600;
    `;
const GreenBorderTextField = Styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  }
`;
const PayentAmountDiv = Styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #f5f5f5;
  `;

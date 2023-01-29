import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import Styled from "styled-components";
import colors from "../../utils/colors";
import { invoiceData } from "./../../utils/invoices";
import "./index.css";
import { requestMethod } from "./../../requestMethod";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { useRealmContext } from "../../db/RealmContext";
import orderPic from "../../utils/orderPic.png";

export default function Invoices() {
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const { user } = useRealmContext();
  useEffect(() => {
    requestMethod.get("withdrawal/user/" + user?._id).then((res) => {
      console.log(res.data);
      setWithdrawHistory(res.data);
    });
  }, []);
  return (
    <div>
      {withdrawHistory.length > 0 && (
        <Grid container display={"flex"} justifyContent={"center"} my={2}>
          <Grid item xs={11.5}>
            <TitleP className="text-left">Withdraw History</TitleP>
          </Grid>
          <Grid item xs={11.5}>
            <table style={{ borderRadius: "10px" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    Invoice ID
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    Name
                  </th>

                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    IBAN
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    Intialized On
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    Completed On
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: colors.becomePartnerGreen,
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawHistory?.map((data, index) => {
                  return (
                    <tr className="mt-5" key={index}>
                      <td
                        data-label="Invoice ID"
                        style={{
                          fontSize: "1.3rem",
                          color: colors.becomePartnerGreen,
                        }}
                      >
                        {"INV"}
                        {index + 1}
                      </td>
                      <td data-label="Name" style={{ fontSize: "1.3rem" }}>
                        {data?.accountDetail?.accountHolderName}
                      </td>
                      <td data-label="Amount" style={{ fontSize: "1.3rem" }}>
                        {data.amount} $
                      </td>
                      <td data-label="IBAN" style={{ fontSize: "1.3rem" }}>
                        {data?.accountDetail?.IBAN.substring(0, 6)}---
                        {data?.accountDetail?.IBAN.substring(20, 26)}
                      </td>
                      <td
                        data-label="Intialized On"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {data.createdAt.substring(0, 10)}
                      </td>
                      <td
                        data-label="Completed On"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {data.completionDate?.substring(0, 10)}
                      </td>
                      <td data-label="Status" style={{ fontSize: "1.3rem" }}>
                        {data.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Grid>
        </Grid>
      )}
      {withdrawHistory.length === 0 && (
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item xs={11} sm={6} mt={1}>
            <BoldFNP>No Withdrawl History</BoldFNP>
            <Box component={"img"} src={orderPic} width={"185px"} mt={1}></Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
const BoldFNP = Styled.p`
  align-text: center;
  font-weight: bold;
  font-size: 1.8rem;
  margin: 0;
`;
const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;

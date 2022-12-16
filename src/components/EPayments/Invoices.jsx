import React from "react";
import { Box, Grid, Button } from "@mui/material";
import Styled from "styled-components";
import colors from "../../utils/colors";
import { invoiceData } from "./../../utils/invoices";
import "./index.css";

export default function Invoices() {
  return (
    <div>
      <Grid container display={"flex"} justifyContent={"center"} my={2}>
        <Grid item xs={11.5}>
          <TitleP className="text-left">Invoices</TitleP>
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
                  Client Name
                </th>
                <th
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: colors.becomePartnerGreen,
                  }}
                >
                  Creatrd Date
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
                  Due Date
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
                <th
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: colors.becomePartnerGreen,
                  }}
                >
                  Paid On
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((data) => {
                return (
                  <tr className="mt-5">
                    <td
                      data-label="Invoice ID"
                      style={{
                        fontSize: "1.3rem",
                        color: colors.becomePartnerGreen,
                      }}
                    >
                      {data.invoiceID}
                    </td>
                    <td data-label="Client Name" style={{ fontSize: "1.3rem" }}>
                      {data.clientName}
                    </td>
                    <td
                      data-label="Creatrd Date"
                      style={{ fontSize: "1.3rem" }}
                    >
                      {data.createdDate}
                    </td>
                    <td data-label="Amount" style={{ fontSize: "1.3rem" }}>
                      {data.amount}
                    </td>
                    <td data-label="Due Date" style={{ fontSize: "1.3rem" }}>
                      {data.dueDate}
                    </td>
                    <td data-label="Status" style={{ fontSize: "1.3rem" }}>
                      {data.status}
                    </td>
                    <td data-label="Paid On" style={{ fontSize: "1.3rem" }}>
                      {data.paidOn}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </div>
  );
}

const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    `;

import React, { useState } from "react";
import { Grid, Button, Divider, Box } from "@mui/material";
import styled from "styled-components";

import colors from "../../utils/colors";
import VerifiedIcon from "@mui/icons-material/Verified";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeliverOrderComp from "./DeliverOrderComp";

export default function OrderStatusTimeLine() {
  const [orderStatus, setOrderStatus] = React.useState({
    gigImageLink:
      "https://media.graphassets.com/resize=fit:clip,height:523,/output=format:webp/blgTs2rjTDOmunPXgHoT",
    gigTitle: "I will do data entry work, copy paste work, excel work",
    employerUserName: "John Doe",
    deliveryDate: "Nov 6, 2021",
    price: "100",
  });
  return (
    <div
      style={{
        boxShadow: "0 1px 21px 0 rgba(135,140,157,.2)",
        padding: "10px",
        borderRadius: "7px",
        marginTop: "10px",
      }}
    >
      <Grid container>
        <Grid item display={"flex"} justifyContent={"center"} xs={12} mb={0.7}>
          <TimeTile>Time Left to deliver</TimeTile>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <Box
              component="img"
              src={orderStatus?.gigImageLink}
              alt="order"
              sx={{
                width: "100%",
                height: "100%",
                minHeight: "100%",
                minWidth: "100%",
                borderRadius: "2px",
              }}
            ></Box>
          </Grid>
          <Grid container item xs={8} mb={1}>
            <Grid item xs={12} p={0.4}>
              <GigTitle>{orderStatus?.gigTitle}</GigTitle>
            </Grid>
          </Grid>
          <Grid container item xs={12} p={1}>
            <SubTitleGrid item xs={6}>
              <SubTitle>Ordered By</SubTitle>
            </SubTitleGrid>
            <Grid item xs={6}>
              <UserNameP>{orderStatus.employerUserName}</UserNameP>
            </Grid>
          </Grid>
          <Grid container item xs={12} p={1}>
            <SubTitleGrid item xs={6}>
              <SubTitle>Delivery Date</SubTitle>
            </SubTitleGrid>
            <Grid item xs={6}>
              <TextP>{orderStatus.deliveryDate}</TextP>
            </Grid>
          </Grid>
          <Grid container item xs={12} p={1}>
            <SubTitleGrid item xs={6}>
              <SubTitle>Total Price</SubTitle>
            </SubTitleGrid>
            <Grid item xs={6}>
              <TextP>{orderStatus.price}</TextP>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid item xs={5}>
              <VerifiedIcon
                sx={{
                  height: "25px",
                  width: "25px",
                  color: colors.becomePartnerGreen,
                }}
              ></VerifiedIcon>
            </Grid>
            <Grid item xs={5} display={"flex"} alignItems={"center"}>
              <TextP>Step 1</TextP>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            mt={1}
          >
            <Grid item xs={5}>
              <RadioButtonUncheckedIcon
                sx={{
                  height: "25px",
                  width: "25px",
                  color: colors.becomePartnerGreen,
                }}
              ></RadioButtonUncheckedIcon>
            </Grid>
            <Grid item xs={5} display={"flex"} alignItems={"center"}>
              <TextP>Step 2</TextP>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
const TimeTile = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0px;
`;
const GigTitle = styled.p`
  font-size: 1.35rem;
  font-weight: 500;
  margin-bottom: 0px;
`;
const SubTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0px;
`;
const SubTitleGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
`;
const UserNameP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${colors.becomePartnerGreen};
`;

const TextP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0px;
`;

import React, { useState } from "react";
import { Grid, Button, Divider, Box } from "@mui/material";
import styled from "styled-components";

import colors from "../../utils/colors";
import VerifiedIcon from "@mui/icons-material/Verified";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeliverOrderComp from "./DeliverOrderComp";
import { requestMethod } from "../../requestMethod";

export default function OrderStatusTimeLine({ p }) {
  const [orderStatus, setOrderStatus] = useState([]);

  const [productDetails, setProductDetails] = useState({});
  React.useEffect(() => {
    requestMethod.get("product/" + p?.hired?.productId).then((res) => {
      setProductDetails(res.data);
    });
  }, []);
  React.useEffect(() => {
    var statusArr = [
      "pending",
      "requirementGathering",
      "onGoing",
      "delivered",
      "revision",
      "extended",
      "disputed",
      "cancelled",
      "completed",
    ];
    if (p?.state === " requirementGathering") {
      setOrderStatus(["requirementGathering"]);
    } else if (p?.state === "onGoing") {
      setOrderStatus(["requirementGathering", "onGoing"]);
    } else if (p?.state === "delivered") {
      setOrderStatus(["requirementGathering", "onGoing", "delivered"]);
    } else if (p?.state === "revision") {
      setOrderStatus([
        "requirementGathering",
        "onGoing",
        "delivered",
        "revision",
      ]);
    } else if (p?.state === "extended") {
      setOrderStatus([
        "requirementGathering",
        "onGoing",
        "delivered",
        "revision",
        "extended",
      ]);
    } else if (p?.state === "disputed") {
      setOrderStatus(["requirementGathering", "onGoing", "disputed"]);
    } else if (p?.state === "cancelled") {
      setOrderStatus(["requirementGathering", "disputed", "cancelled"]);
    } else if (p?.state === "completed") {
      setOrderStatus([
        "requirementGathering",
        "onGoing",
        "delivered",
        "completed",
      ]);
    }
  }, [orderStatus]);
  return (
    <div
      style={{
        boxShadow: "0 1px 21px 0 rgba(135,140,157,.2)",
        padding: "10px",
        borderRadius: "7px",
        marginTop: "10px",
        overflow: "hidden",
      }}
    >
      <Grid container>
        <Grid item display={"flex"} justifyContent={"center"} xs={12} mb={0.7}>
          <TimeTile>Order Details</TimeTile>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <Box
              component="img"
              src={productDetails?.images}
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
              <GigTitle>{productDetails?.title}</GigTitle>
            </Grid>
          </Grid>
          <Grid container item xs={12} p={1}>
            <SubTitleGrid item xs={6}>
              <SubTitle>Ordered By</SubTitle>
            </SubTitleGrid>
            <Grid item xs={6}>
              <UserNameP>{p?.creatorId?.name}</UserNameP>
            </Grid>
          </Grid>
          <Grid container item xs={12} p={1}>
            <SubTitleGrid item xs={6}>
              <SubTitle>Order Startted At</SubTitle>
            </SubTitleGrid>
            <Grid item xs={6}>
              <TextP>{p?.createdAt.substring(0, 10)}</TextP>
            </Grid>
          </Grid>
          <Grid container item xs={12} p={1}>
            <SubTitleGrid item xs={12}>
              <SubTitle>Requirement gathering Stage</SubTitle>
            </SubTitleGrid>
          </Grid>
          {orderStatus?.map((item, index) => (
            <Grid
              item
              container
              xs={12}
              display={"flex"}
              justifyContent={"center"}
            >
              <Grid item xs={3}>
                <VerifiedIcon
                  sx={{
                    height: "25px",
                    width: "25px",
                    color: colors.becomePartnerGreen,
                  }}
                ></VerifiedIcon>
              </Grid>
              <Grid item xs={8} display={"flex"} alignItems={"center"}>
                <TextP>{item}</TextP>
              </Grid>
            </Grid>
          ))}
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

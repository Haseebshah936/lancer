import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";
import { Divider, Paper, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import colors from "../../utils/colors";

export default function OrderSummary() {
  return (
    <>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "10px",
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          color: "#404145",
        }}
      >
        <Header>
          <Heading>$1200</Heading>
          <Order>Single Order</Order>
        </Header>
        <Divider
          sx={{
            my: 2,
            borderBottomWidth: "2px",
            "&.MuiDivider-root": {
              backgroundColor: "##DDDEDF",
            },
          }}
        />
        <Order>Single Order</Order>

        <Divider
          sx={{
            my: 2,
            borderBottomWidth: "2px",
            "&.MuiDivider-root": {
              backgroundColor: "##DDDEDF",
            },
          }}
        />

        <Footer>
          <GigQuantity>Gig Quantity</GigQuantity>

          <IncrementContainer>
            <AddCircleOutlineOutlined
              sx={{
                color: colors.textGreen,
                "&.MuiSvgIcon-root": {
                  fontSize: "2.5rem",
                },
              }}
            />
            <Quantity sx={{ pl: 0 }}>1</Quantity>
            <RemoveCircleOutlineOutlined
              sx={{
                color: colors.textGreen,
                "&.MuiSvgIcon-root": {
                  fontSize: "2.5rem",
                },
              }}
            />
          </IncrementContainer>
        </Footer>
      </Paper>
    </>
  );
}

const Header = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const Heading = styled(Typography)({
  fontSize: "4.0rem",
  fontWeight: "600",
});

const Order = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "500",
  color: colors.black,
});

const Body = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
});

const IncrementContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  flex: "0.4",
});

const GigQuantity = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "600",
});

const Quantity = styled(Typography)({
  paddingLeft: "5px",
  fontSize: "1.7rem",
  fontWeight: "500",
  color: colors.gray,
});

import { Paper, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import colors from "../../utils/colors";

export default function MainCard({
  gigQuantity,
  title = "Basic",
  description = "I will do basic work for you",
  price = "900",
  type = "Basic",
}) {
  return (
    <>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          p: 3,
          borderColor: "black",
          borderWidth: "2px",
          borderRadius: "10px",
          "&:hover": {
            outlineStyle: "solid",
            OutlineColor: "black",
            outlineWidth: "1px",
          },
        }}
      >
        <Header>
          <Heading>
            {type}
            {gigQuantity > 1 && (
              <Quantity sx={{ display: "inline" }}>(X{gigQuantity})</Quantity>
            )}{" "}
          </Heading>
          <Price>${price * gigQuantity}</Price>
        </Header>
        <Description>
          <Name>{title}</Name>
          {description}
        </Description>
      </Paper>
    </>
  );
}

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "15px",
});
const Heading = styled(Typography)({
  fontSize: "2.0rem",
  fontWeight: "600",
  color: colors.black,
});

const Description = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "500",
  color: colors.black,
});

const Price = styled(Typography)({
  fontSize: "2.0rem",
  fontWeight: "500",
  color: colors.black,
});

const Name = styled(Typography)({
  display: "inline",
  fontSize: "1.5rem",
  paddingRight: "3px",
  fontWeight: "600",
  color: colors.black,
});

const Quantity = styled(Typography)({
  paddingLeft: "5px",
  fontSize: "1.7rem",
  fontWeight: "500",
  color: colors.gray,
});

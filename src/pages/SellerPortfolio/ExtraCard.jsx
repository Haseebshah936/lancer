import { Paper, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import colors from "../../utils/colors";

export default function ExtraCard() {
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
          <Heading>Basic</Heading>
          <Price>$900</Price>
        </Header>
        <Description>
          <Name>Basic Web App</Name>I will develop an asp net mvc, dot net core
          or blazor webapp
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

const SubHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
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

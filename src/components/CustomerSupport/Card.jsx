import { Paper, styled, Typography } from "@mui/material";
import React from "react";
// import styled from "styled-components";
import colors from "../../utils/colors";

export default function Card({
  title,
  Icon,
  description,
  onClick = () => {},
  style,
}) {
  return (
    <>
      <Paper
        elevation={2}
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          my: { mobile: 2, laptop: 0 },
          minWidth: "350px",
          borderRadius: "15px",
          ...style,
          //   border: `2px solid ${colors.textGreen}`,
        }}
      >
        {Icon}
        <Heading>{title}</Heading>
        <Description>{description}</Description>
      </Paper>
    </>
  );
}

const Heading = styled(Typography)({
  color: colors.black,
  fontWeight: "bold",
  fontSize: "2.5rem ",
  margin: " 15px 0px 5px 0px",
});

const Description = styled(Typography)({
  color: colors.black,
  fontSize: "1.3rem ",
});

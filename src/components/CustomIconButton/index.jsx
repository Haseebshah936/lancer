import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

function CustomIconButton({
  style = {},
  leftIcon,
  text,
  rightIcon,
  onClick = () => {},
}) {
  return (
    <CustomButton
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        backgroundColor: colors.textGreen,
        ...style,
      }}
      variant="contained"
      onClick={onClick}
    >
      {leftIcon}
      &nbsp;&nbsp;{text}
      {rightIcon}
    </CustomButton>
  );
}

export default CustomIconButton;

const CustomButton = styled(Button)`
  align-self: center;
  color: ${colors.white} !important;
  width: 100%;
  padding-block: 1rem !important;
  text-transform: none !important;
  font-weight: bold !important;
`;

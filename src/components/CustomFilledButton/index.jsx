import { Button } from "@mui/material";
import React from "react";
import colors from "../../utils/colors";

function CustomFilledButton({
  title,
  style,
  color1 = "#172f33",
  color2 = colors.primaryGreen,
  type = "",
  onClick = () => {},
  ...props
}) {
  return (
    <Button
      variant="contained"
      style={{ ...style }}
      sx={{
        borderRadius: "2rem",
        color: "white",
        marginLeft: "1.5rem",
        fontSize: "1rem",
        padding: "1rem 2rem",
        minWidth: "1rem",
        background: ` linear-gradient(130deg, ${color1}, ${color2}) border-box`,
        marginTop: "4rem",
        textTransform: "capitalize",
      }}
      onClick={onClick}
      type={type}
      {...props}
    >
      {title}
    </Button>
  );
}

export default CustomFilledButton;

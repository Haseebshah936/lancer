import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function SkillInfoComponent({
  title = "",
  description = "",
  starting = "",
  ending = "",
}) {
  return (
    <Box mb={"1rem"}>
      <Typography
        variant="subtitle1"
        fontWeight={"bold"}
        color="text.secondary"
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {starting && (
        <Typography variant="body2" color="text.secondary">
          {starting}
          {ending ? " - " + ending : ""}
        </Typography>
      )}
    </Box>
  );
}

export default SkillInfoComponent;

import React from "react";
import { CircularProgress } from "@mui/material";
import colors from "../../utils/colors";

export default function LoadingComp() {
  return (
    <div>
      <CircularProgress
        sx={{
          color: colors.becomePartnerGreen,
        }}
      />
    </div>
  );
}

import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

export default function OrderJustStartedComp() {
  return (
    <div
      style={{
        boxShadow: "0 1px 21px 0 rgba(135,140,157,.2)",
        borderRadius: "5px",
      }}
    >
      <OuterBox>
        <MainTitle>Order Started</MainTitle>
        <MainText>
          Now you have all the requirements You can start the work
        </MainText>
      </OuterBox>
    </div>
  );
}
const OuterBox = styled(Box)`
  border-left: 5px solid ${colors.becomePartnerGreen};

  border-radius: 5px;
  padding: 20px;
  paddiinf-top: 30px;
  padding-bottom: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const MainTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
`;
const MainText = styled.p`
  font-size: 1.6rem;
  //   font-weight: 600;
`;

import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import { Grid } from "@material-ui/core";

export default function OrderCompletedComp() {
  return (
    <div
      style={{
        boxShadow: "0 1px 21px 0 rgba(135,140,157,.2)",
        borderRadius: "5px",
      }}
    >
      <OuterBox>
        <MainTitle>Order Completed Congratulation!</MainTitle>
        <MainText>
          You have completed the order. Now you can wait for the employer
          review. In the meantime you can browse other orders thet are avalible.
          Good Luck!.
        </MainText>
        <Box>
          <CustomButton
            variant="contained"
            style={{
              margin: "auto",
              marginTop: "20px",
              backgroundColor: colors.becomePartnerGreen,
            }}
          >
            Browse Orders
          </CustomButton>
        </Box>
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
const CustomButton = styled(Button)`
  background-color: ${colors.becomePartnerGreen};
  color: white;
  "&:hover": {
    background-color: ${colors.becomePartnerGreen};
  }
  margin: auto;
`;

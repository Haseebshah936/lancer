import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";
import {
  ButtonBase,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import colors from "../../utils/colors";

const CheckBox = ({ onChange, checked, label, error }) => {
  return (
    <Checkbox
      checked={checked}
      disableRipple
      onChange={onChange}
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: "2rem",
        },
        color: colors.textGreen,
        "&.Mui-checked": {
          color: colors.textGreen,
        },
      }}
    />
  );
};

export default function ExtrasCard({ check, setCheck = () => {} }) {
  return (
    <>
      <Box
        component="div"
        onClick={() => {
          setCheck(!check);
        }}
      >
        <Paper
          variant="outlined"
          elevation={0}
          sx={{
            p: 3,
            mt: 1,
            borderColor: "#E6E7E8",
            borderWidth: "2px",
            borderRadius: "10px",
            "&:hover": {
              borderColor: "gray",
            },
          }}
        >
          <Header>
            <SubHeader>
              <Heading>Basic</Heading>
              <Days>(+3 days)</Days>
            </SubHeader>
            <CheckBox
              checked={check}
              onChange={(e) => {
                setCheck(e.target.checked);
              }}
            />
          </Header>
          <Description>
            I will develop an asp net mvc, dot net core or blazor webapp
          </Description>
          {check ? (
            <>
              {" "}
              <Divider sx={{ my: 3 }} />
              <Footer>
                <Price>$900</Price>

                <IncrementContainer>
                  <IconButton disableRipple>
                    <AddCircleOutlineOutlined
                      sx={{
                        color: colors.textGreen,
                        "&.MuiSvgIcon-root": {
                          fontSize: "2.5rem",
                        },
                      }}
                    />
                  </IconButton>
                  <Days sx={{ pl: 0 }}>1</Days>
                  <IconButton disableRipple>
                    <RemoveCircleOutlineOutlined
                      sx={{
                        color: colors.textGreen,
                        "&.MuiSvgIcon-root": {
                          fontSize: "2.5rem",
                        },
                      }}
                    />
                  </IconButton>
                </IncrementContainer>
              </Footer>
            </>
          ) : (
            <Price>$900</Price>
          )}
        </Paper>
      </Box>
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
  justifyContent: "flex-start",
  flexDirection: "row",
});

const Heading = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "600",
  color: colors.black,
});

const Description = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "500",
  color: colors.black,
});

const Price = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "500",
  color: colors.black,
});

const Days = styled(Typography)({
  paddingLeft: "5px",
  fontSize: "1.7rem",
  fontWeight: "500",
  color: colors.gray,
});

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const IncrementContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  flex: "0.3",
});

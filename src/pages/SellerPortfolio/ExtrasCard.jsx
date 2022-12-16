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

export default function ExtrasCard({
  title = "basic",
  days = "3",
  price = "100",
  checkArr,
  setCheckArr = () => {},
  id,
}) {
  return (
    <>
      <Box
        component="div"
        sx={{ mb: 2 }}
        onClick={() => {
          let newArr = [...checkArr];
          newArr[id].checked = !newArr[id].checked;
          setCheckArr(newArr);
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
              <Heading>{title}</Heading>
              <Days>(+{days} days)</Days>
            </SubHeader>
            <CheckBox
              checked={checkArr[id]?.checked}
              onChange={(e) => {
                let newArr = [...checkArr];
                newArr[id].checked = e.target.checked;
                setCheckArr(newArr);
              }}
            />
          </Header>
          <Description>Add this extra to your order.</Description>
          {checkArr[id]?.checked ? (
            <>
              {" "}
              <Divider sx={{ my: 2 }} />
              <Footer>
                <Price>${price}</Price>

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
            <Price>${price}</Price>
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

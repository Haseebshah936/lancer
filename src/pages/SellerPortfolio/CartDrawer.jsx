import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  SwipeableDrawer,
  Typography,
  styled,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { useCustomContext } from "../../Hooks/useCustomContext";
import colors from "../../utils/colors";
import MainCard from "./MainCard";

export default function CartDrawer() {
  const { setCartDrawer, cartDrawer } = useCustomContext();
  return (
    <>
      <SwipeableDrawer
        anchor="right"
        onClose={() => setCartDrawer(false)}
        onOpen={() => setCartDrawer(true)}
        open={cartDrawer}
        PaperProps={{
          sx: {
            py: 2,
            px: 4,
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            width: { mobile: "auto", laptop: 410 },
            height: { mobile: "100vh", laptop: "auto" },
          }}
        >
          <Header>
            <HeaderText>Order options</HeaderText>
            <IconButton disableRipple onClick={() => setCartDrawer(false)}>
              <CloseOutlined
                sx={{
                  fontSize: "2.3rem",
                  cursor: "pointer",
                  color: colors.black,
                }}
              />
            </IconButton>
          </Header>
          <Divider
            sx={{
              mx: -5,
              borderBottomWidth: "2px",
              mb: 3,

              "&.MuiDivider-root": {
                backgroundColor: "#E6E7E9",
              },
            }}
          />

          {/* <Container> */}
          <MainCard />
          {/* </Container> */}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "20px",
  paddingBottom: "20px",
});

const HeaderText = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "600",
  color: colors.black,
});

const Container = styled(Box)({
  overflow: "scroll",
});

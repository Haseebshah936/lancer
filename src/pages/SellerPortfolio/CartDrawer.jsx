import { Box, SwipeableDrawer } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useCustomContext } from "../../Hooks/useCustomContext";

export default function CartDrawer() {
  const { setCartDrawer, cartDrawer } = useCustomContext();
  return (
    <>
      <SwipeableDrawer
        anchor="right"
        onClose={() => setCartDrawer(false)}
        onOpen={() => setCartDrawer(true)}
        open={cartDrawer}
        // PaperProps={{
        //   sx: {
        //     backgroundColor: "red",
        //   },
        // }}
      >
        <Box
          sx={{
            width: { mobile: "100vh", laptop: 450 },
          }}
        ></Box>
      </SwipeableDrawer>
    </>
  );
}
// const CustomBox = styled(Box)({
//   width: { mobile: "100vh", laptop: 450 },
// });

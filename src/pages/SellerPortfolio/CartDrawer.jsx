import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  SwipeableDrawer,
  Typography,
  styled,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomFilledButton from "../../components/CustomFilledButton";
import CustomIconButton from "../../components/CustomIconButton";
import { useCustomContext } from "../../Hooks/useCustomContext";
import colors from "../../utils/colors";
import ExtrasCard from "./ExtrasCard";
import MainCard from "./MainCard";
import OrderSummary from "./OrderSummary";

export default function CartDrawer({
  gigQuantity,
  IncGigQuantity = () => {},
  DecGigQuantity = () => {},
  Extras,
}) {
  const { setCartDrawer, cartDrawer, selectedPlan } = useCustomContext();
  const [check, setCheck] = useState(false);
  const [checkArr, setCheckArr] = useState([]);

  useEffect(() => {
    console.log("Checked Array", checkArr);
  }, [checkArr]);

  useEffect(() => {
    if (Extras) {
      const ExtraArr = Extras.map((item) => {
        if (item.active) {
          return {
            title: item.title,
            quantity: item.quantity,
            checked: false,
            quantityBased: item.quantityBased,
          };
        }
      });
      setCheckArr(ExtraArr);

      console.log("Extras Array", ExtraArr);
    }
  }, [Extras]);

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

            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            // alignItems: "center",
            width: { mobile: "auto", laptop: 450 },
            height: "100vh",
          }}
        >
          <Header sx={{ px: 4 }}>
            <Heading>Order options</Heading>
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
              mx: -4,
              borderBottomWidth: "2px",

              "&.MuiDivider-root": {
                backgroundColor: "#E6E7E9",
              },
            }}
          />

          <CartListContainer sx={{ px: 4, py: 3 }} component="div">
            <MainCard
              gigQuantity={gigQuantity}
              title={selectedPlan.name}
              description={selectedPlan.description}
              price={selectedPlan.cost}
              type={selectedPlan.name}
            />

            <ExtrasContainer sx={{ pt: 3 }}>
              <Heading>Upgrade your order with extras</Heading>

              {Extras?.map((item, i) => {
                if (item.active) {
                  return (
                    <ExtrasCard
                      key={i}
                      id={i}
                      check={check}
                      checkArr={checkArr ? checkArr : []}
                      setCheckArr={setCheckArr}
                      setCheck={setCheck}
                      title={item.title}
                      price={item.cost}
                      // onChange={() => {
                      //   const newArr = [...checkArr];
                      //   newArr[i].checked = !newArr[i].checked;
                      //   setCheckArr(newArr);
                      // }}
                    />
                  );
                }
              })}
            </ExtrasContainer>

            <Divider sx={{ my: 3 }} />
            <OrderSummary
              gigQuantity={gigQuantity}
              IncGigQuantity={IncGigQuantity}
              DecGigQuantity={DecGigQuantity}
              check={check}
            />
          </CartListContainer>

          <Divider
            sx={{
              mx: -4,

              borderBottomWidth: "2px",

              "&.MuiDivider-root": {
                backgroundColor: "#E6E7E9",
              },
            }}
          />

          <Footer sx={{ px: 4, pt: 3 }}>
            <CustomIconButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
                fontSize: "1.5rem",
              }}
              text={`Continue ($900)`}
              onClick={() => {}}
            />
            <Typography variant="h6">You won't be charged yet</Typography>
          </Footer>
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
  height: "100px",
  // flexShrink: "0",
});

const Heading = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "600",
  color: colors.black,
});

const CartListContainer = styled(Box)({
  flexGrow: "1",
  overflowY: "scroll",
});

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  height: "200px",
  // flexShrink: "0",
});

const ExtrasContainer = styled(Box)({});

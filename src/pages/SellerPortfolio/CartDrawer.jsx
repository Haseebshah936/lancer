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
import { useNavigate } from "react-router-dom";

export default function CartDrawer({
  gigQuantity,
  IncGigQuantity = () => {},
  DecGigQuantity = () => {},
  Extras,
  productData,
  // title = "",
  // image = "",
}) {
  const { setCartDrawer, cartDrawer, selectedPlan } = useCustomContext();
  const [checkArr, setCheckArr] = useState([]);
  const [orderState, setOrderState] = useState({
    title: "",
    image: "",
    planName: "",
    planCost: 0,
    features: [],
    extraFeatures: [],
    total: 0,
    delivery: 0,
  });
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checked Array", checkArr);
  }, [checkArr]);

  useEffect(() => {
    console.log("Order State", orderState);
  }, [orderState]);

  useEffect(() => {
    setOrderState({
      title: productData?.title,
      image: productData?.images ? productData?.images[0] : "",
      planName: selectedPlan?.name,
      planCost: selectedPlan?.cost,
      features: selectedPlan?.features,
      extraFeatures: checkArr ? checkArr : [],
      total: total ? total : selectedPlan?.cost,
      delivery: selectedPlan?.delivery,
    });
  }, [total, selectedPlan, productData]);

  useEffect(() => {
    setTotal(selectedPlan.cost);
    console.log("Total", total);
  }, [selectedPlan]);

  useEffect(() => {
    checkArr.map((item) => {
      if (item.checked) {
        console.log("Cost", item.cost);
        console.log("quantity", item.quantity);

        let t = selectedPlan.cost * gigQuantity + item.cost * item.quantity;
        setTotal(t);
      } else {
        setTotal(selectedPlan.cost * gigQuantity);
      }
    });
  }, [checkArr, gigQuantity]);

  useEffect(() => {
    if (Extras) {
      console.log("Additional", Extras);
      const ExtraArr = Extras.map((item) => {
        if (item.active) {
          return {
            title: item.title,
            quantity: 0,
            checked: false,
            cost: item.cost,
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
                      checkArr={checkArr ? checkArr : []}
                      setCheckArr={setCheckArr}
                      title={item.title}
                      price={item.cost}
                      days={item.time}

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
              total={total}
              gigQuantity={gigQuantity}
              IncGigQuantity={IncGigQuantity}
              DecGigQuantity={DecGigQuantity}
              plan={selectedPlan.name}
              delivery={selectedPlan.delivery}
              checkArr={checkArr}
              features={selectedPlan.features}
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
              text={`Continue ($${total})`}
              onClick={() => {
                navigate(`/payments`, {
                  state: orderState,
                });
              }}
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

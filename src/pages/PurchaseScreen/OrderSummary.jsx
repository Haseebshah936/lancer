import { Lock } from "@material-ui/icons";
import { Check, HttpsOutlined } from "@mui/icons-material";
import {
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { teamImg } from "../../assets";
import CustomIconButton from "../../components/CustomIconButton";
import colors from "../../utils/colors";
import Joi from "joi-browser";
import { useRealmContext } from "../../db/RealmContext";
import { toast } from "react-toastify";
import { handleError } from "../../utils/helperFunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { requestMethod } from "../../requestMethod";
import Checkout from "./Checkout";
import CustomModal from "../../components/CustomModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { set } from "date-fns/esm";
import { useCustomContext } from "../../Hooks/useCustomContext";
const stripePromise = loadStripe(
  "pk_test_51JgDf0HHulWCxCO2rvJaz2Jxm1yUfy52n9weCoqxnXDH4jVVrjyu4UewmnhBGJSYamZhTvwx8JRkaKPq4w4ZwRdn00gD4wZNAX"
);
export default function OrderSummary({
  style = {},
  order,
  Card,
  setErrors,
  method,
}) {
  const { user } = useRealmContext();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = React.useState({});
  const [togglePayment, setTogglePayment] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState("");
  const { setOrder } = useCustomContext();
  const [project, setProject] = React.useState({});
  console.log("Order", order);

  useEffect(() => {
    const { gigID, planName, freelancerId, extraFeatures, proposalId } = order;
    console.log({
      productId: gigID,
      extras: extraFeatures,
      packageSelected: planName,
      freelancerId,
      employerId: user._id,
      proposalId,
    });
    setOrderDetails({
      productId: gigID,
      extras: extraFeatures,
      packageSelected: planName,
      freelancerId,
      employerId: user._id,
      proposalId,
    });
  }, []);

  const CardSchema = {
    name: Joi.string().required().label("Name"),
    number: Joi.string().length(19).required().label("Card Number"),
    // expiry: Joi.date().greater("now").required().label("Expiration Date"),
    expiry: Joi.string(),
    cvc: Joi.string().length(3).required().label("CVC/Security Code"),
    // issuer: Joi.string(),
    focused: Joi.string(),
  };

  useEffect(() => {
    setTogglePayment(false);
    setClientSecret("");
    setOrder({});
  }, []);

  const Validate = () => {
    // const tempCard = { ...Card, expiry: `00-${Card.expiry.replace("/", "-")}` };
    console.log(" currentUser.id", user);

    const { issuer, ...card } = Card;

    const result = Joi.validate(card, CardSchema, {
      abortEarly: false,
    });
    console.log("Errors Result: ", result);
    if (!result.error) {
      setErrors({});
      console.log("No Error");

      const Project = {
        title: order.title,
        freelancerId: order.freelancerId,
        employerId: user._id,
        amount: order.total,
        paymentMethod: method,
        packageSelected: order.planName,
        productId: order.gigID,
        days: order.delivery,
        revisionsAllowed: "3",
        extras: order.extraFeatures,
      };

      (async () => {
        try {
          console.log(Project);
          const response = await axios.post(
            "http://localhost:3003/api/invoice/invoiceAndProject",
            Project
          );
          // gig = {};

          toast.success("Order Placed Successfully");
          // setLoading(false);
          navigate("/home");
        } catch (error) {
          handleError(error);
        }
      })();

      return null;
    }
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    setErrors(error);
    return error;
  };

  const pay = async () => {
    // Validate();
    // creditCard
    try {
      let res;
      if (method === "creditCard") {
        res = await requestMethod.post("invoice/prjectIntent", orderDetails);
        const { client_secret: clientSecret, id } = res.data;
        if (clientSecret) {
          setTogglePayment(true);
          setClientSecret(clientSecret);
        }
        setProject({
          title: order.title,
          freelancerId: order.freelancerId,
          proposalId: order?.proposalId,
          employerId: user._id,
          amount: order.total,
          paymentMethod: method,
          packageSelected: order.planName,
          productId: order.gigID,
          days: order.delivery,
          revisionsAllowed: "3",
          extras: order.extraFeatures,
        });
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          ...style,
          mx: { desktop: 4 },
          display: "flex",
          flexDirection: "column",
          mt: 3,
          justifyContent: "flex-start",
          p: 2,
          Width: "100%",
        }}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid item mobile={4}>
            {" "}
            <CardMedia
              component="img"
              sizes="contain"
              border="1px"
              sx={{
                cursor: "pointer",
                height: { laptop: "75px", mobile: "150px" },
                borderRadius: "15px",
                borderColor: "transparent",
              }}
              image={order?.image}
              alt="Gig Image"
            />
          </Grid>
          <Grid item mobile={7}>
            <Typography
              sx={{
                fontSize: { laptop: "1.7rem", mobile: "2.0rem" },
                color: "#62646a",
              }}
            >
              {order?.title}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {order?.planName && (
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item mobile={8}>
              {" "}
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: "#62646a",
                }}
              >
                {order?.gigQuantity > 1
                  ? order?.planName + " (X" + order?.gigQuantity + ")"
                  : order?.planName}
              </Typography>
            </Grid>
            <Grid
              item
              container
              mobile={4}
              direction="row"
              justifyContent="flex-end"
            >
              <Typography sx={{ fontSize: "1.7rem", color: "#62646a" }}>
                ${order?.planCost * order?.gigQuantity}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid item container mobile={12} sx={{ pt: 1 }}>
          <CustomList sx={{ py: 0 }}>
            {order?.features?.map((feature) => {
              return (
                <CustomListItem sx={{ padding: 0 }}>
                  <ListItemIcon>
                    <Check
                      sx={{
                        fontSize: "2.0rem",
                        cursor: "pointer",
                        color: colors.textGreen,
                      }}
                    />
                  </ListItemIcon>
                  <CustomListText
                    primary={`${feature.title}`}
                    disableTypography={true}
                  />
                </CustomListItem>
              );
            })}
          </CustomList>
          <Grid container mobile={12}>
            <CustomList
              sx={{ py: 0 }}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              {order?.extraFeatures?.map((feature) => {
                if (feature?.checked) {
                  return (
                    <Grid
                      container
                      mobile={12}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item mobile={8}>
                        <CustomListItem sx={{ padding: 0 }}>
                          <ListItemIcon>
                            <Check
                              sx={{
                                fontSize: "2.0rem",
                                cursor: "pointer",
                                color: colors.textGreen,
                              }}
                            />
                          </ListItemIcon>
                          {feature.quantity > 1 ? (
                            <CustomListText
                              primary={`${feature.title} (X${feature.quantity})`}
                              disableTypography={true}
                            />
                          ) : (
                            <CustomListText
                              primary={`${feature.title}`}
                              disableTypography={true}
                            />
                          )}
                        </CustomListItem>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-end"
                        mobile={4}
                      >
                        <Typography
                          sx={{ fontSize: "1.7rem", color: "#62646a" }}
                        >
                          ${feature?.cost * feature?.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                }
              })}
            </CustomList>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item mobile={8}>
            {" "}
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: "#62646a",
              }}
            >
              Order Total
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-end"
            mobile={4}
          >
            <Typography sx={{ fontSize: "1.7rem", color: "#62646a" }}>
              ${order?.total}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <Grid item mobile={8}>
            {" "}
            <Typography
              sx={{
                fontSize: "1.7rem",

                color: "#62646a",
              }}
            >
              Total Delivery Time
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-end"
            mobile={4}
          >
            <Typography sx={{ fontSize: "1.7rem", color: "#62646a" }}>
              {order?.delivery} days
            </Typography>
          </Grid>

          <Grid item mobile={12} sx={{ mt: 2 }}>
            <CustomIconButton
              style={{
                marginTop: "0px",
                marginBottom: "0px",

                fontSize: "1.5rem",
              }}
              text={`Pay Now`}
              onClick={pay}
            />
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              mobile={12}
              sx={{ mt: 1 }}
            >
              <HttpsOutlined
                sx={{
                  fontSize: "1.6rem",
                  "&.MuiSvgIcon-root": {
                    fill: "#62646a",
                  },
                }}
              />
              <Typography sx={{ pl: 1, color: "#62646a", fontSize: "1.5rem" }}>
                SSL Secure Payment
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <CustomModal isVisible={togglePayment}>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <Checkout
            project={project}
            togglePaymentModal={() => setTogglePayment(false)}
          />
        </Elements>
      </CustomModal>
    </>
  );
}

const CustomList = styled(List)({
  color: colors.black,
  fontSize: "1.6rem !important",
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: "10px",
  },
});

const CustomListText = styled(ListItemText)({
  fontSize: "1.5rem",
  fontWeight: "400",
  color: "#404145",
});

const CustomListItem = styled(ListItem)({
  marginBottom: "5px",
  color: "#404145",
});

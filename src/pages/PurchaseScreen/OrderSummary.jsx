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
import React from "react";
import styled from "styled-components";
import { teamImg } from "../../assets";
import CustomIconButton from "../../components/CustomIconButton";
import colors from "../../utils/colors";

export default function OrderSummary({ style = {}, order }) {
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
        <Grid item container direction="row" justifyContent="space-evenly">
          <Grid item mobile={4}>
            {" "}
            <CardMedia
              component="img"
              sizes="contain"
              border="1px"
              style={{
                cursor: "pointer",
                height: "75px",
                borderRadius: "15px",
                borderColor: "transparent",
              }}
              image={order?.image}
              alt="Gig Image"
            />
          </Grid>
          <Grid item mobile={7}>
            <Typography sx={{ fontSize: "1.7rem", color: "#62646a" }}>
              {order?.title}
            </Typography>
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
              {order?.planName}
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
              ${order?.planCost}
            </Typography>
          </Grid>
        </Grid>
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
              style={{ display: "flex", flexDirection: "row", flex: 1 }}
            >
              {order?.extraFeatures?.map((feature) => {
                if (feature.checked) {
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
                          <CustomListText
                            primary={`${feature.title}`}
                            disableTypography={true}
                          />
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
              onClick={() => {}}
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

const ExtrasDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

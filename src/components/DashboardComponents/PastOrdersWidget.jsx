import {
  Paper,
  Typography,
  styled,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as styled2 from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import { tablet } from "../../responsive";
import colors from "../../utils/colors";
import CustomFilledButton from "../CustomFilledButton";

const PastOrdersWidget = ({ pastInvoices, loader }) => {
  const { activeProfile } = useCustomContext();

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,
          margin: "auto",
          maxWidth: "100%",
        }}
      >
        <HeaderrWrapper>
          <CardHeading>Past Earnings</CardHeading>
          <CustomFilledButton
            title={"View All"}
            style={{ margin: "5px 0px 0px 0px" }}
          ></CustomFilledButton>
        </HeaderrWrapper>
        <Divider sx={{ mx: -2, mb: 2 }} />

        {pastInvoices.map((order, index) => (
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ pt: 2 }}
          >
            <Grid
              item
              container
              mobile={12}
              tablet={5}
              laptop={7}
              direction="column"
            >
              <OrderTitle variant="h6">
                {order.projectId.title.length > 60
                  ? order.projectId.title.slice(0, 60)
                  : order.projectId.title}
              </OrderTitle>

              <DateCompleted>
                {new Date(order.createdAt).toDateString()}
              </DateCompleted>
            </Grid>
            <Grid
              item
              container
              mobile={10}
              tablet={5}
              laptop={4}
              direction="row"
              alignItems="center"
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
                aria-label="ProfilePic"
                src={
                  activeProfile === "seller"
                    ? order.employerId.profilePic
                    : order.freelancerId.profilePic
                }
              ></Avatar>

              <ProfileName>
                {activeProfile === "seller"
                  ? order.employerId.name
                  : order.freelancerId.name}
              </ProfileName>
            </Grid>
            <Grid item mobile={2} tablet={2} laptop={1}>
              <AmmountEarned>${order.amount}</AmmountEarned>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
};

export default PastOrdersWidget;

const HeaderrWrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  padding-bottom:15px;
`;

const CardHeading = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.8rem",
});

const OrderTitle = styled(Typography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "60ch",
  paddingTop: "4px",
  color: colors.black,
});

const DateCompleted = styled(Typography)({
  fontWeight: "500",
  fontSize: "1.25rem",
  color: "#838383",
  paddingTop: "10px",
});

const ProfileName = styled(Typography)({
  fontWeight: "500",
  fontSize: "1.20rem",
  color: colors.black,
  paddingLeft: "8px",
});

const AmmountEarned = styled(Typography)({
  color: colors.textGreen,
  fontWeight: "600",
  fontSize: "2.0rem",
});

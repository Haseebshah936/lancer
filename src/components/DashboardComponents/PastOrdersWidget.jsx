import {
  Paper,
  Typography,
  styled,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import * as styled2 from "styled-components";
import { tablet } from "../../responsive";
import colors from "../../utils/colors";
import CustomFilledButton from "../CustomFilledButton";

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

const PastOrdersWidget = ({
  Orders = [
    {
      id: 1,
      Title:
        "I want some customization and installation on I want some customization and installation on wordpress want some customization and installation on wordpressI want some customization and installation on wordpress ",
      DateCompleted: "October 5, 2021",
      ProfileName: "Haseeb Iqbal",
      AmmountEarned: "$100",
      ProfileURL:
        "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg",
    },
    {
      id: 2,
      Title: "I want simple Joomla 4 component development",
      DateCompleted: "October 12, 2021",
      ProfileName: "Haseeb Iqbal",
      AmmountEarned: "$300",
      ProfileURL:
        "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg",
    },
    {
      id: 3,
      Title: "I want migrate Wordpress website",
      DateCompleted: "October 30, 2021",
      ProfileName: "Haseeb Iqbal",
      AmmountEarned: "$200",
      ProfileURL:
        "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg",
    },
    {
      id: 4,
      Title: "I want Landing Page Redesign / Sales Page Redesign",
      DateCompleted: "October 5, 2021",
      ProfileName: "Haseeb Iqbal",
      AmmountEarned: "$500",
      ProfileURL:
        "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg",
    },
  ],
}) => {
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

        {Orders.map((order) => (
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
                {order.Title.length > 60
                  ? order.Title.slice(0, 60)
                  : order.Title}
              </OrderTitle>

              <DateCompleted>{order.DateCompleted}</DateCompleted>
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
                src={order.ProfileURL}
              ></Avatar>

              <ProfileName>{order.ProfileName}</ProfileName>
            </Grid>
            <Grid item mobile={2} tablet={2} laptop={1}>
              <AmmountEarned>{order.AmmountEarned}</AmmountEarned>
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

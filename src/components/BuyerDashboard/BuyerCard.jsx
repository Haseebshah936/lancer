import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import GradeSharpIcon from "@mui/icons-material/GradeSharp";
const BuyerCard = () => {
  return (
    <Card sx={{ maxWidth: "20rem" }}>
      <CardMedia
        component="img"
        image="1.svg"
        alt="Gig Image"
        sizes="contain"
        border-radius="15px"
      />
      <CardHeader
        sx={{ paddingTop: "2px", paddingBottom: "0px" }}
        avatar={
          <Avatar
            aria-label="recipe"
            src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg"
          ></Avatar>
        }
        action={
          <Tooltip title="Save To List" placement="right">
            <IconButton
              aria-label="settings"
              sx={{ paddingTop: "15px", color: "#045c4a" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        }
        title="Muhammad Haseeb"
        subheader="Level rana Seller"
      />
      <CardContent sx={{ paddingTop: "5px", paddingBottom: "0px" }}>
        <Typography variant="h5" sx={{ color: "black", fontWeight: 400 }}>
          I will assassinate Talha and Umer with pressure
        </Typography>
        <Wrapper>
          <GradeSharpIcon sx={{ color: "#FFBE5B" }} />
          <MiniWrapper>
            <p style={{ color: "#FFBE5B" }}>5.0</p>
            <p>(33)</p>
          </MiniWrapper>
        </Wrapper>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingTop: "0px" }}>
        <Tooltip title="Save To Favourites" placement="bottom">
          <IconButton aria-label="add to favorites">
            <FavoriteBorderOutlinedIcon sx={{ color: "#045c4a" }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default BuyerCard;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  /* background-color: red; */

  margin-top: 5px;
`;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 2px;
`;

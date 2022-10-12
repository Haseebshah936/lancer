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
import { teamImg } from "../../assets";
const BuyerCard = () => {
  return (
    <Card
      sx={{
        maxWidth: "20rem",
        minWidth: "20rem",
        marginRight: "2rem",
        boxShadow: "3px 2px 16px 5px rgba(240, 240, 240, 0.75)",
        WebkitBoxShadow: "3px 2px 16px 5px rgba(240, 240, 240, 0.75)",
        borderRadius: "5%",
      }}
    >
      <CardMedia
        component="img"
        image={teamImg}
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
            <p style={{ marginLeft: "2px" }}>(33)</p>
          </MiniWrapper>
        </Wrapper>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          paddingTop: "0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Save To Favourites" placement="bottom">
          <IconButton aria-label="add to favorites">
            <FavoriteBorderOutlinedIcon sx={{ color: "#045c4a" }} />
          </IconButton>
        </Tooltip>
        <MiniWrapper>
          <p
            style={{ color: "grey", fontFamily: "'Gemunu Libre', sans-serif" }}
          >
            STARTING AT
          </p>
          <p
            style={{
              marginLeft: "5px",
              fontWeight: "500",
              fontSize: "2rem",
              color: "#045c4a",
            }}
          >
            $50
          </p>
        </MiniWrapper>
      </CardActions>
    </Card>
  );
};

export default BuyerCard;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 2px;
`;

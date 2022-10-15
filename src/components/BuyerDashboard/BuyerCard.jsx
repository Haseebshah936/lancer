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

const BuyerCard = ({hideProfileInfo=true,...props}) => {
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
        image={props.GigImage}
        alt="Gig Image"
        sizes="contain"
        border-radius="15px"
        style={{ cursor: "pointer" }}
      />
      {hideProfileInfo && <CardHeader
        style={{ cursor: "pointer" }}
        sx={{ paddingTop: "2px", paddingBottom: "0px" }}
        avatar={<Avatar aria-label="recipe" src={props.Avatar}></Avatar>}
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
        title={props.SellerName}
        subheader={props.SellerLevel}
      />}
      <CardContent sx={{ paddingTop: "5px", paddingBottom: "0px" }}>
        <Typography
          variant="h5"
          sx={{ color: "black", fontWeight: 400 }}
          style={{ cursor: "pointer" }}
        >
          {props.GigTitle}
        </Typography>
        <Wrapper>
          <GradeSharpIcon sx={{ color: "#FFBE5B" }} />
          <MiniWrapper>
            <p style={{ color: "#FFBE5B", marginBottom: "0px" }}>
              {props.SellerRating}
            </p>
            <p style={{ marginLeft: "2px", marginBottom: "0px" }}>
              {props.GigReviewsTotal}
            </p>
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
        <MiniWrapper2>
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
              cursor: "pointer",
            }}
          >
            {props.GigStartPrice}
          </p>
        </MiniWrapper2>
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
const MiniWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 4px;
`;

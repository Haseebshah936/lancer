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
import colors from "../../utils/colors";
import { Box, Checkbox } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const modalstyle = {
  textAlign: "center",
  color: colors.textGreen,
  borderRadius: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: `2px solid ${colors.textGreen}`,
  boxShadow: 24,
  p: 4,
};

const PortfolioCard = ({ hideProfileInfo = true, style, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        style={style}
        sx={{
          maxWidth: "20rem",
          minWidth: "20rem",
          marginRight: "2rem",
          border: "none",
          boxShadow: "3px 2px 16px 5px rgba(240, 240, 240, 0.75)",
          WebkitBoxShadow: "3px 2px 16px 5px rgba(240, 240, 240, 0.75)",
          borderRadius: "5%",
        }}
      >
        <Link to="/portfolio/2">
          <CardMedia
            component="img"
            image={props.GigImage}
            alt="Gig Image"
            sizes="contain"
            border-radius="15px"
            style={{ cursor: "pointer" }}
          />
        </Link>
        {hideProfileInfo && (
          <CardHeader
            style={{ cursor: "pointer" }}
            sx={{ paddingTop: "2px", paddingBottom: "0px" }}
            avatar={<Avatar aria-label="recipe" src={props.Avatar}></Avatar>}
            action={
              <Tooltip title="Save To List" placement="right">
                <IconButton
                  onClick={handleOpen}
                  aria-label="settings"
                  sx={{ paddingTop: "15px", color: "#045c4a" }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            }
            title={props.SellerName}
            subheader={props.SellerLevel}
          />
        )}
        <CardContent sx={{ paddingTop: "5px", paddingBottom: "0px" }}>
          <LinkText>
            <Link to="/portfolio/2">
              <Typography
                variant="h5"
                sx={{ color: "black", fontWeight: 400 }}
                style={{ cursor: "pointer" }}
              >
                {props.GigTitle}
              </Typography>
            </Link>
          </LinkText>
          <Wrapper>
            <GradeSharpIcon sx={{ color: colors.gold, paddingRight: 0 }} />
            <MiniWrapper>
              <p style={{ color: colors.gold, marginBottom: "0px" }}>
                {props.SellerRating}
              </p>
              <p style={{ marginLeft: "2px", marginBottom: "0px" }}>
                ({props.GigReviewsTotal})
              </p>
            </MiniWrapper>
          </Wrapper>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            paddingTop: "0px",
            display: "flex",
            marginRight: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Save To Favourites" placement="bottom">
            <Checkbox
              {...label}
              icon={
                <FavoriteBorderOutlinedIcon
                  sx={{ color: colors.googleRed, fontSize: "2rem!important" }}
                />
              }
              checkedIcon={
                <FavoriteOutlinedIcon
                  sx={{ color: colors.googleRed, fontSize: "2rem!important" }}
                />
              }
            />
          </Tooltip>
          <MiniWrapper2>
            <p
              style={{
                color: "grey",
                fontFamily: "'Gemunu Libre', sans-serif",
              }}
            >
              STARTING AT
            </p>
            <p
              style={{
                marginLeft: "5px",
                fontWeight: "500",
                fontSize: "2rem",
                color: colors.black,
                cursor: "pointer",
              }}
            >
              {props.GigStartPrice}
            </p>
          </MiniWrapper2>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Added to List
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default PortfolioCard;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
  margin-top: 2px;
`;
const MiniWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 4px;
`;

const LinkText = styled.div`
  a {
    text-decoration: none !important;
  }
`;

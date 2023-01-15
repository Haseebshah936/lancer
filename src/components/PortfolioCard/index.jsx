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
import { Link, NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import { useState } from "react";
import { useEffect } from "react";
import { CheckOutlined } from "@material-ui/icons";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomCardHeader = styled(CardHeader)({
  a: { textDecoration: "none" },
  "a:hover": { color: colors.black },
});

const PortfolioCard = ({
  hideProfileInfo = true,
  ownerId,
  productId,
  styles,
  ...props
}) => {
  const { user } = useRealmContext();
  const [checked, setChecked] = useState(false);
  const [openFavSnack, setOpenFavSnack] = useState(false);
  const [openUnSaveSnack, setOpenUnSaveSnack] = useState(false);

  const [favid, setfavid] = useState("");

  const handleOpenFavSnack = () => {
    setOpenFavSnack(true);
  };

  const handleOpenUnSaveSnack = () => {
    setOpenUnSaveSnack(true);
  };

  const closeUnSaveSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUnSaveSnack(false);
  };

  const closeFavSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFavSnack(false);
  };

  const checkFavourite = async (user, favuser, product) => {
    const response = await requestMethod.get(
      "favorite/user/" + user + "/" + product + "/" + favuser
    );
    return response.data;
  };

  const createFavourite = async (user, favuser, product) => {
    const response = await requestMethod.post("favorite", {
      userId: user,
      productId: product,
      favoriteUserId: favuser,
    });
    return response.data;
  };

  const deleteFavourite = async (id) => {
    const response = await requestMethod.delete("favorite/" + id);
    return response.data;
  };

  const handleChange = (check) => {
    if (check) {
      createFavourite(user._id, ownerId, productId).then((res) => {
        console.log("Saved state", res);
        setChecked(true);
        setfavid(res._id);
        handleOpenFavSnack();
      });
    } else {
      deleteFavourite(favid).then((res) => {
        console.log("Unsaved state", res);
        setChecked(false);
        handleOpenUnSaveSnack();
      });
    }
  };

  useEffect(() => {
    console.log("Use effect");

    if (user && productId) {
      checkFavourite(user._id, ownerId, productId).then((res) => {
        console.log("Resp", res);
        if (res) {
          setChecked(true);
          setfavid(res._id);
        } else {
          setChecked(false);
        }
      });
    }
  }, [productId, user]);

  return (
    <>
      <Card
        sx={{
          ...styles,
          maxWidth: "22rem",
          minWidth: "22rem",
          minHeight: "30rem",
          marginRight: "1rem",
          border: "none",
          boxShadow: "3px 2px 16px 5px rgba(240, 240, 240, 0.75)",
          WebkitBoxShadow: "3px 2px 16px 5px rgba(240, 240, 240, 0.75)",
          borderRadius: "5%",
        }}
      >
        <Link to={"/portfolio/" + productId}>
          <CardMedia
            component="img"
            image={props.GigImage}
            alt="Gig Image"
            sizes="contain"
            border-radius="15px"
            height="140rem"
            style={{ cursor: "pointer", marginBottom: ".5rem" }}
          />
        </Link>
        {hideProfileInfo && (
          <CustomCardHeader
            style={{ cursor: "pointer" }}
            sx={{ paddingTop: "2px", paddingBottom: "0px" }}
            avatar={
              <NavLink to={"/profile/" + ownerId}>
                <Avatar aria-label="recipe" src={props.Avatar}></Avatar>
              </NavLink>
            }
            // action={
            //   <Tooltip title="Save To List" placement="right">
            //     <IconButton
            //       onClick={handleOpen}
            //       aria-label="settings"
            //       sx={{ paddingTop: "15px", color: "#045c4a" }}
            //     >
            //       <AddIcon />
            //     </IconButton>
            //   </Tooltip>
            // }
            title={
              <NavLink to={"/profile/" + ownerId}>{props.SellerName}</NavLink>
            }
            subheader={props.SellerLevel}
          />
        )}
        <CardContent
          sx={{
            paddingTop: "5px",
            paddingBottom: "0px",
            height: hideProfileInfo ? "7rem" : "10rem",
          }}
        >
          <LinkText>
            <Link to={"/portfolio/" + productId}>
              <Typography
                variant="h5"
                sx={{
                  color: "black",
                  fontWeight: 400,
                  // width: "65ch",
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                }}
                style={{ cursor: "pointer" }}
              >
                {props.GigTitle.slice(0, 50).concat("...")}
              </Typography>
            </Link>
          </LinkText>
          <Wrapper>
            <GradeSharpIcon sx={{ color: colors.gold, paddingRight: 0 }} />
            <MiniWrapper>
              <p style={{ color: colors.gold, marginBottom: "0px" }}>
                {props.SellerRating.toFixed(1)}
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
            paddingTop: "10px",
            display: "flex",
            marginRight: "1rem",
            flexGrow: 1,
          }}
        >
          <Tooltip title="Save To Favourites" placement="bottom">
            <Checkbox
              checked={checked}
              onChange={(e) => {
                handleChange(e.target.checked);
              }}
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
                fontSize: "1.2rem",
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
              ${props.GigStartPrice}
            </p>
          </MiniWrapper2>
        </CardActions>
        <Snackbar
          open={openFavSnack}
          autoHideDuration={2000}
          onClose={closeFavSnack}
        >
          <Alert
            onClose={closeFavSnack}
            icon={<CheckOutlined fontSize="inherit" />}
            severity="success"
            sx={{
              width: "30rem",
              "@media (max-width: 550px)": {
                width: "100%",
              },
              color: colors.textGreen,
              fontSize: "1.5rem",
              backgroundColor: colors.white,
              border: `1px solid ${colors.textGreen}`,
            }}
          >
            Added to Favourites
          </Alert>
        </Snackbar>

        <Snackbar
          open={openUnSaveSnack}
          autoHideDuration={2000}
          onClose={closeUnSaveSnack}
        >
          <Alert
            icon={<CheckOutlined fontSize="inherit" />}
            onClose={closeUnSaveSnack}
            severity="error"
            sx={{
              width: "30rem",
              "@media (max-width: 550px)": {
                width: "100%",
              },
              color: "red",
              fontSize: "1.5rem",
              backgroundColor: colors.white,
              border: "1px solid red",
            }}
          >
            Removed from Favourites
          </Alert>
        </Snackbar>
      </Card>
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
  align-self: flex-end;
  align-items: center;
  margin-left: 5px;
  margin-top: 4px;
  justify-content: flex-end;
  flex: 1;
`;

const LinkText = styled.div`
  a {
    text-decoration: none !important;
  }
`;

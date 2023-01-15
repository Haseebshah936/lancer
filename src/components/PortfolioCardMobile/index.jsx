import {
  Avatar,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/colors";
import GradeSharpIcon from "@mui/icons-material/GradeSharp";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  StyleOutlined,
} from "@material-ui/icons";
import { useRealmContext } from "../../db/RealmContext";
import { requestMethod } from "../../requestMethod";
const PortfolioCardMobile = ({ productId, ownerId, ...props }) => {
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
      <Paper elevation={2} sx={{ pr: 1 }}>
        <Grid sx={{ width: "100%" }}>
          <Grid container direction="row" columnSpacing={1}>
            <Grid item mobile={5}>
              <MediaContainer>
                <CardMedia
                  component="img"
                  sizes="contain"
                  border="1px"
                  style={{
                    cursor: "pointer",
                    height: "83px",
                    borderRadius: "15px",
                    borderColor: "#ADAFB2",
                  }}
                  image={props.GigImage}
                  alt="Gig Image"
                />

                <LikeContainer>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      handleChange(e.target.checked);
                    }}
                    icon={
                      <FavoriteBorderOutlined
                        sx={{
                          color: colors.googleRed,

                          "& .MuiSvgIcon-root": {
                            fontSize: "2.5rem",
                          },
                        }}
                      />
                    }
                    checkedIcon={
                      <FavoriteOutlined
                        sx={{
                          color: `${colors.googleRed} !important`,
                          "& .MuiSvgIcon-root": {
                            fontSize: "2.5rem",
                          },
                        }}
                      />
                    }
                  />
                </LikeContainer>
              </MediaContainer>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="spacer-between"
              mobile={7}
            >
              <LinkText>
                <Link to={"/portfolio/" + productId}>
                  <Typography
                    variant="h5"
                    sx={{ color: "black", fontWeight: 400 }}
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
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 1, pb: 1 }}
          >
            <ProfileContainer>
              <Avatar
                sx={{ width: 34, height: 34 }}
                aria-label="recipe"
                src={props.Avatar}
              ></Avatar>
              <InfoWrapper>
                <Link to={"/profile/" + ownerId}>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: "-2px",
                    }}
                  >
                    {props.SellerName}
                  </Typography>
                </Link>
                <Typography variant="subtitle1">
                  {props.SellerLevel}{" "}
                </Typography>
              </InfoWrapper>
            </ProfileContainer>

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
                ${props.GigStartPrice}
              </p>
            </MiniWrapper2>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PortfolioCardMobile;

const LinkText = styled.div`
  a {
    text-decoration: none !important;
  }
`;

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
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MediaContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const LikeContainer = styled.div`
  position: absolute;
  top: 1px;
  right: 1px;
`;

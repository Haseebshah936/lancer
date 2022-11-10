import {
  Avatar,
  CardHeader,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/colors";
import GradeSharpIcon from "@mui/icons-material/GradeSharp";
import { StyleOutlined } from "@material-ui/icons";
const PortfolioCardMobile = ({ ...props }) => {
  return (
    <>
      <Paper elevation={2} sx={{ pr: 1 }}>
        <Grid>
          <Grid container direction="row" columnSpacing={1}>
            <Grid item mobile={5}>
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
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="spacer-between"
              mobile={7}
            >
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
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: "-2px",
                  }}
                >
                  {props.SellerName}
                </Typography>
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
                {props.GigStartPrice}
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

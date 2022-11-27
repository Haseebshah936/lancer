import React, { useEffect } from "react";
import { Box, Grid, Tab, Tabs, Chip } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import axios from "axios";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";

export default function FGigs() {
  const [gigs, setGigs] = React.useState([]);
  const { user } = useRealmContext();
  useEffect(() => {
    if (user) {
      requestMethod
        .get(`product/byUserId/${user?._id}`)
        .then((response) => {
          console.log(response.data);
          setGigs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} md={11}>
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item xs={11} sm={2.7}>
              <FSideBar></FSideBar>
            </Grid>
            <Grid
              item
              xs={11}
              sm={9}
              marginLeft={"10px"}
              my={{ xs: 1, md: 0 }}
              // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              paddingLeft={{ md: "10px" }}
            >
              <TitleP>Active Gigs</TitleP>
              <div>
                <Grid container className="d-flex justify-content-between">
                  {gigs?.map((gig) => (
                    <Grid
                      item
                      xs={12}
                      md={3.7}
                      style={{ maxHeight: "400px" }}
                      className="mt-3"
                    >
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                              src={gig.owner._id.profilePic}
                            ></Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={gig.owner._id.name}
                          subheader="September 14, 2021"
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={gig.images[0]}
                          alt="Paella dish"
                        />

                        <Box padding={1} paddingStart={4} paddingEnd={2}>
                          <h3
                            variant="h5"
                            className="bold mb-"
                            color="text.secondary"
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {gig.title}
                          </h3>
                          <Box className="d-flex to-row align-items-center pb-0">
                            <SmallP>Starts at &nbsp;</SmallP>
                            <TitleP>&nbsp;{gig.packages[0].cost}$</TitleP>
                          </Box>
                        </Box>
                        <CardActions disableSpacing>
                          {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton> */}
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
            <Grid xs={11} sm={9}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </div>
  );
}

const TitleP = Styled.p`
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.black};
    `;
const SmallP = Styled.p`
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0px;
    color: #8B8B8B;
    `;

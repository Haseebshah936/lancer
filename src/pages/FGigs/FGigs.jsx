import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { requestMethod } from "../../requestMethod";
import { useRealmContext } from "../../db/RealmContext";
import CustomFilledButton from "./../../components/CustomFilledButton/index";

import { useNavigate } from "react-router-dom";
import GigMorePopper from "./GigMorePopper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FGigs() {
  const [gigs, setGigs] = React.useState([]);
  const [stateChanged, setStateChanged] = React.useState(0);
  const navigate = useNavigate();
  const { user } = useRealmContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (user) {
      requestMethod
        .get(`product/byUserId/${user?._id}`)
        .then((response) => {
          // console.log(response.data);
          setGigs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    requestMethod
      .get(`product/byUserId/${user?._id}`)
      .then((response) => {
        // console.log(response.data);
        setGigs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stateChanged]);

  return (
    <div style={{ width: "100vw" }}>
      <Header></Header>

      <Container>
        <Box sx={{ flexGrow: 1, pt: 1, pb: 1 }}>
          <ThemeProvider
            theme={createTheme({
              breakpoints: {
                values: {
                  laptop: 1024,
                  tablet: 640,
                  mobile: 0,
                  desktop: 1280,
                  xs: 0,
                  sm: 600,
                  md: 900,
                  lg: 1200,
                  xl: 1536,
                },
              },
            })}
          >
            <Grid container spacing={2}>
              <Grid item mobile={12} laptop={4} tablet={5} desktop={3}>
                <FSideBar></FSideBar>
              </Grid>

              <Grid
                item
                mobile={12}
                tablet={7}
                laptop={8}
                desktop={9}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid
                  item
                  xs={12}
                  marginLeft={"10px"}
                  my={{ xs: 1, md: 0 }}
                  // boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  paddingLeft={{ md: "10px" }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      {gigs.find((gig) => gig.state === "live") ? (
                        <Box>
                          <TitleP>Active Gigs</TitleP>
                        </Box>
                      ) : null}
                      <Box>
                        <CustomFilledButton
                          title={"Create Gigs"}
                          style={{ marginTop: "0px" }}
                          onClick={() => navigate("/createGig")}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <div>
                    <Grid container columnGap={2}>
                      {gigs?.map((gig, index) =>
                        gig.state === "live" ? (
                          <Grid
                            item
                            xs={12}
                            md={3.7}
                            style={{ maxHeight: "400px" }}
                            className="mt-3 ms-3"
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
                                  <GigMorePopper
                                    gig={gig}
                                    setStateChanged={setStateChanged}
                                    stateChanged={stateChanged}
                                  ></GigMorePopper>
                                }
                                title={gig.owner._id.name}
                                subheader="September 14, 2021"
                              />
                              <CardMedia
                                component="img"
                                height="194"
                                image={gig.images[0]}
                                alt=""
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
                                  <TitleP>&nbsp;{gig.cost}$</TitleP>
                                </Box>
                              </Box>
                              <CardActions disableSpacing>
                                {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton> */}
                                <IconButton
                                  id="basic-button"
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={handleClick}
                                >
                                  <ShareIcon />
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                  >
                                    <MenuItem onClick={handleClose}>
                                      Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      My account
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      Logout
                                    </MenuItem>
                                  </Menu>
                                </IconButton>
                              </CardActions>
                            </Card>
                          </Grid>
                        ) : null
                      )}
                    </Grid>
                  </div>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      display={"flex"}
                      justifyContent={"space-between"}
                      my={2}
                    >
                      {gigs.find((gig) => gig.state !== "live") ? (
                        <Box>
                          <TitleP>Paused Gigs</TitleP>
                        </Box>
                      ) : null}
                    </Grid>
                  </Grid>

                  <div>
                    <Grid container columnGap={2}>
                      {gigs.length > 0 &&
                        gigs?.map((gig, index) =>
                          gig.state !== "live" ? (
                            <Grid
                              item
                              xs={12}
                              md={3.7}
                              style={{ maxHeight: "400px" }}
                              className="mt-3 ms-3"
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
                                    <GigMorePopper
                                      gig={gig}
                                      setStateChanged={setStateChanged}
                                      stateChanged={stateChanged}
                                    ></GigMorePopper>
                                  }
                                  title={gig.owner._id.name}
                                  subheader="September 14, 2021"
                                />
                                <CardMedia
                                  component="img"
                                  height="194"
                                  image={gig.images[0]}
                                  alt=""
                                />

                                <Box
                                  padding={1}
                                  paddingStart={4}
                                  paddingEnd={2}
                                >
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
                                    <TitleP>&nbsp;{gig?.cost}$</TitleP>
                                  </Box>
                                </Box>
                                <CardActions disableSpacing>
                                  {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton> */}
                                  <IconButton
                                    id="basic-button"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                  >
                                    <ShareIcon />
                                    <Menu
                                      id="basic-menu"
                                      anchorEl={anchorEl}
                                      open={open}
                                      onClose={handleClose}
                                      MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                      }}
                                    >
                                      <MenuItem onClick={handleClose}>
                                        Profile
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        My account
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        Logout
                                      </MenuItem>
                                    </Menu>
                                  </IconButton>
                                </CardActions>
                              </Card>
                            </Grid>
                          ) : null
                        )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>

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

const Container = Styled.div`
  margin-inline: 7%;
`;

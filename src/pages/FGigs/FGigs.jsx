import React, { useEffect } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import colors from "../../utils/colors";
import FSideBar from "../../pages/FSideBar/FSideBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
export default function FGigs() {
  const [gigs, setGigs] = React.useState({});
  useEffect(() => {
    axios
      .get(
        "http://localhost:3003/api/gig/getAllGigsByEmail/umer192rb@gmail.com"
      )
      .then((response) => {
        console.log(response.data);
        setGigs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
                <Grid container>
                  {gigs.map((gig) => (
                    <Grid item xs={12} md={4}>
                      <Card sx={{ maxWidth: 250 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="/static/images/cards/contemplative-reptile.jpg"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Lizard
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Share</Button>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
              <TitleP>Paused Gigs</TitleP>
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

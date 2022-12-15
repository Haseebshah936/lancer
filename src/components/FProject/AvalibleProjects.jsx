import { Avatar, Box, Button, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styled from "styled-components";
import colors from "../../utils/colors";
import usePagination from "./Pagination";
import { requestMethod } from "../../requestMethod";

export default function AvalibleProjects({ data }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState("");
  const [selecteProjectData, setSelectedProjectData] = useState({});
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(projects.length / PER_PAGE);
  const _DATA = usePagination(projects, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    requestMethod
      .get(`project/${selectedProjectID}`)
      .then((res) => {
        console.log("Selected Project Data", res.data);
        setSelectedProjectData(res.data);
      })
      .catch((err) => {
        console.log("err in catching selected project data", err);
      });

    console.log("Selected Project Data", selecteProjectData);
  }, [selectedProjectID]);
  // useEffect(() => {
  //   const temp = data.filter((p) => p.projectStatus === "open");
  //   // console.log("All data", temp);
  //   setProjects(temp);
  // }, []);
  // Slide Show Starts
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === "top" || anchor === "bottom"
            ? "auto"
            : { xs: "30rem", sm: "60rem" },
      }}
      // role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <Grid container display="flex" justifyContent={"center"} my={1}>
        <Grid
          item
          xs={11}
          sm={9.5}
          boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          marginBottom={"10px"}
          padding={1.5}
        >
          <Grid container>
            {/* First Box */}
            <Grid
              item
              xs={7}
              width={"100%"}
              paddingTop={2}
              paddingLeft={1}
              style={{
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
            >
              <UserNameP style={{ color: colors.becomePartnerGreen }}>
                {selecteProjectData.userName}
              </UserNameP>
              <TitleP>{selecteProjectData.title}</TitleP>
              <Grid container>
                <Grid item xs={6} sm={4}>
                  <SmallP>Price Type</SmallP>
                  <SmallPB>{selecteProjectData.pricingType}</SmallPB>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <SmallP>Duration</SmallP>
                  <SmallPB>{selecteProjectData.days} Days</SmallPB>
                </Grid>
              </Grid>
            </Grid>
            {/* Second Box */}
            <Grid item xs={2.5}>
              <CenterDiv>
                <p className="fw-bold fs-3 mb-1">
                  $ {selecteProjectData.budget}
                </p>
                <p>{selecteProjectData.days} Days</p>
              </CenterDiv>
            </Grid>
            {/* Third Box */}
            <Grid item xs={5} sm={2.5}>
              <CenterDiv>
                {/* Send Perposal */}
                {/* <div
                  // style={{ opacity: 0.1 }}
                  onClick={() => {
                    setSelectedProjectID(p._id);
                    console.log("Selected Project ID", selectedProjectID);
                  }}
                >
                  {["right"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button
                        onClick={toggleDrawer(anchor, true)}
                        variant="contained"
                        style={{
                          // width: "12rem",
                          backgroundColor: colors.becomePartnerGreen,
                          fontWeight: "700",
                        }}
                      >
                        Send Perposal
                      </Button>
                      <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                        PaperProps={{
                          sx: {
                            opacity: 1,
                            overflow: "hidden",
                          },
                        }}
                      >
                        {list(anchor)}
                      </SwipeableDrawer>
                    </React.Fragment>
                  ))}
                </div> */}
                <SmallP
                  className="mt-1 text-center"
                  style={{
                    color: colors.becomePartnerGreen,
                    fontWeight: "bold",
                  }}
                >
                  Posted on {selecteProjectData.projectPostDate}
                </SmallP>
              </CenterDiv>
            </Grid>
          </Grid>
          <DiscriptionBox
            className="mt-xs-4 flex-wrap"
            style={{
              whiteSpace: "pre-wrap",
              whiteSpace: "-moz-pre-wrap",
              whiteSpace: "-pre-wrap",
              whiteSpace: "-o-pre-wrap",
              wordWrap: "break-word",
            }}
          >
            <DiscriptionTitle>Description</DiscriptionTitle>
            {selecteProjectData.description}
          </DiscriptionBox>
        </Grid>
        {/* Last Box */}
        <Grid
          item
          xs={11}
          sm={2}
          marginLeft={{ sm: "10px" }}
          my={1.12}
          boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
        >
          {/* Project Closed */}
          {selecteProjectData.projectStatus === "closed" ? (
            <CenterDiv>
              <SmallP
                style={{
                  color: colors.becomePartnerGreen,
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Hired
              </SmallP>
              <Avatar
                alt="Remy Sharp"
                src={selecteProjectData.imageURL}
                sx={{ width: 50, height: 50 }}
              />
              <SmallP
                style={{
                  color: colors.becomePartnerGreen,
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                {selecteProjectData.userName}
              </SmallP>
            </CenterDiv>
          ) : (
            <CenterDiv>
              <PerposalsNo>{selecteProjectData.proposalCount}</PerposalsNo>
              <SmallP style={{ fontWeight: "bold" }}>Perposals</SmallP>
            </CenterDiv>
          )}
        </Grid>
      </Grid>
      {selectedProjectID}
    </Box>
  );
  // Slide Show Ends
  const getAllPendingProjects = async () => {
    await requestMethod
      .get("project/pending")
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: AvalibleProjects.jsx:77 ~ getAllPendingProjects ~ err",
          err
        );
      });
  };
  useEffect(() => {
    getAllPendingProjects();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {_DATA?.currentData().map((p) => (
        <Grid container display="flex" justifyContent={"center"} my={1}>
          <Grid
            item
            xs={11}
            sm={9.5}
            boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
            marginBottom={"10px"}
            padding={1.5}
          >
            <Grid container>
              {/* First Box */}
              <Grid
                item
                xs={7}
                width={"100%"}
                paddingTop={2}
                paddingLeft={1}
                style={{
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                <UserNameP style={{ color: colors.becomePartnerGreen }}>
                  {p.userName}
                </UserNameP>
                <TitleP>{p.title}</TitleP>
                <Grid container>
                  <Grid item xs={6} sm={4}>
                    <SmallP>Price Type</SmallP>
                    <SmallPB>{p.pricingType}</SmallPB>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <SmallP>Duration</SmallP>
                    <SmallPB>{p.days} Days</SmallPB>
                  </Grid>
                </Grid>
              </Grid>
              {/* Second Box */}
              <Grid item xs={2.5}>
                <CenterDiv>
                  <p className="fw-bold fs-3 mb-1">$ {p.budget}</p>
                  <p>{p.days} Days</p>
                </CenterDiv>
              </Grid>
              {/* Third Box */}
              <Grid item xs={5} sm={2.5}>
                <CenterDiv>
                  {/* Send Perposal */}
                  <div
                    // style={{ opacity: 0.1 }}
                    onClick={() => {
                      setSelectedProjectID(p._id);
                      console.log("Selected Project ID", selectedProjectID);
                    }}
                  >
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Button
                          onClick={toggleDrawer(anchor, true)}
                          variant="contained"
                          style={{
                            // width: "12rem",
                            backgroundColor: colors.becomePartnerGreen,
                            fontWeight: "700",
                          }}
                        >
                          Send Perposal
                        </Button>
                        <SwipeableDrawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                          onOpen={toggleDrawer(anchor, true)}
                          PaperProps={{
                            sx: {
                              opacity: 1,
                              overflow: "hidden",
                            },
                          }}
                        >
                          {list(anchor)}
                        </SwipeableDrawer>
                      </React.Fragment>
                    ))}
                  </div>
                  <SmallP
                    className="mt-1 text-center"
                    style={{
                      color: colors.becomePartnerGreen,
                      fontWeight: "bold",
                    }}
                  >
                    Posted on {p.projectPostDate}
                  </SmallP>
                </CenterDiv>
              </Grid>
            </Grid>
            <DiscriptionBox
              className="mt-xs-4 flex-wrap"
              style={{
                whiteSpace: "pre-wrap",
                whiteSpace: "-moz-pre-wrap",
                whiteSpace: "-pre-wrap",
                whiteSpace: "-o-pre-wrap",
                wordWrap: "break-word",
              }}
            >
              <DiscriptionTitle>Description</DiscriptionTitle>
              {p.description}
            </DiscriptionBox>
          </Grid>
          {/* Last Box */}
          <Grid
            item
            xs={11}
            sm={2}
            marginLeft={{ sm: "10px" }}
            boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          >
            {/* Project Closed */}
            {p.projectStatus === "closed" ? (
              <CenterDiv>
                <SmallP
                  style={{
                    color: colors.becomePartnerGreen,
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Hired
                </SmallP>
                <Avatar
                  alt="Remy Sharp"
                  src={p.imageURL}
                  sx={{ width: 50, height: 50 }}
                />
                <SmallP
                  style={{
                    color: colors.becomePartnerGreen,
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  {p.userName}
                </SmallP>
              </CenterDiv>
            ) : (
              <CenterDiv>
                <PerposalsNo>{p.proposalCount}</PerposalsNo>
                <SmallP style={{ fontWeight: "bold" }}>Perposals</SmallP>
              </CenterDiv>
            )}
          </Grid>
        </Grid>
      ))}
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            // color={colors.becomePartnerGreen}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const UserNameP = styled.p`
  font-size: 1rem;
  display: inline-block;
  font-weight: 500;
  line-height: 1rem;
  margin: 0px 0px 5px;
`;
const TitleP = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 20px;
  margin: 0px 0px 10px;
`;
const SmallP = styled.p`
  color: #6e727d;
  margin: 0px;
`;
const SmallPB = styled.p`
  font-weight: bold;
`;

const CenterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PerposalsNo = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.becomePartnerGreen};
`;
const DiscriptionTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0px 0px 5px;
`;
const DiscriptionBox = styled(Box)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  margin: 1rem;
  font-size: 1.2rem;
`;

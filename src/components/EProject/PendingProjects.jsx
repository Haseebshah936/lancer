import { Avatar, Box, Button, Drawer, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import usePagination from "./Pagination";
import { requestMethod } from "./../../requestMethod";

export default function PendingProjects({ data }) {
  const [perposalAgainstProjectById, setPerposalAgainstProjectById] = useState(
    []
  );
  const [drawerState, setDrawerState] = useState(false);
  const [pProjects, setPProjects] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const acceptPerposalFun = async (id) => {
    await requestMethod.put(`proposal/accept/${id}`).then((res) => {
      console.log(res.data);
    });
    drawerState(false);
  };

  const perposalsAgainstProjectByIdFun = async (id) => {
    await requestMethod
      .get(`proposal/active/${id}`)
      .then((res) => {
        console.log(res.data);
        setPerposalAgainstProjectById(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const temp = data;
    const temp2 = temp.filter((p) => p.approvalStatus === false);
    // console.log("Pending project data", temp2);
    setPProjects(temp2);
  }, []);
  const Listt = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overflowY: "scroll",
        // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
      }}
    >
      {perposalAgainstProjectById.map((p) => (
        <Grid
          Container
          boxShadow=" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          padding={2}
          my={1}
        >
          <Grid item xs={12} md={4.5}>
            <ProjectTitle className="text-Start">{p.title}</ProjectTitle>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={2}
                display="flex"
                justifyContent={{ md: "center" }}
                // backgroundColor="lightblue"
              >
                <Box display={"flex"} flexDirection="column">
                  <Box paddingLeft={{ md: "8px" }}>
                    <Avatar alt="Cindy Baker" src={p?.creatorId?.profilePic} />
                  </Box>
                  <UserName className="text-center">
                    &nbsp;{p.eUserName}&nbsp;
                  </UserName>
                  <Box className="border rounded text-center">
                    {p?.creatorId?.name}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2} display="flex" flexDirection="column">
                <SubTitle className="text-md-center mt-md-3">
                  {"Budget"}
                </SubTitle>
                <ColoredText className="text-md-center">
                  $ {p.budget}
                </ColoredText>
              </Grid>
              <Grid item xs={12} md={2}>
                <SubTitle className="text-md-center mt-md-3">
                  {"Job Type"}
                </SubTitle>
                <ColoredText className="text-md-center">
                  {"Fixed Price"}
                </ColoredText>
              </Grid>
              <Grid item xs={12} md={3}>
                <SubTitle className="text-md-center mt-md-3">
                  {"Duartion"}
                </SubTitle>
                <ColoredText className="text-md-center">
                  {p.duration}
                </ColoredText>
              </Grid>
              <Grid
                item
                xs={12}
                md={2.4}
                display="flex"
                justifyContent={"center"}
                flexDirection="column"
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.becomePartnerButtonGreen,
                    color: "white",
                    "&:hover": {
                      backgroundColor: colors.becomePartnerButtonGreen,
                    },
                  }}
                  onClick={() => {
                    acceptPerposalFun(p._id);
                  }}
                >
                  {"Accept"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box
              className="border rounded p-3"
              style={{ wordBreak: "break-all" }}
            >
              <SubTitle className="mt-md-2">Description</SubTitle>

              <PerposalDes>{p.description}</PerposalDes>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
  return (
    <div style={{ width: "100%" }}>
      <Drawer
        anchor="right"
        disableEnforceFocus
        // variant=""
        open={drawerState}
        onClose={() => setDrawerState(false)}
        onOpen={() => setDrawerState(true)}
        PaperProps={{
          sx: {
            opacity: 1,
            overflow: "hidden",
            width: { xs: "85%", sm: "45%" },
          },
        }}
      >
        <Listt></Listt>
      </Drawer>
      {_DATA.currentData().map((p) => (
        <Grid container display="flex" justifyContent={"center"} my={1}>
          <Grid
            item
            xs={11}
            sm={9.5}
            boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
            marginBottom={"10px"}
          >
            <Grid container>
              {/* First Box */}
              <Grid
                item
                xs={5.5}
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
                  <p className="fw-bold fs-3 mb-1">$ {p.budget}.00</p>
                  <p>{p.days} Days</p>
                </CenterDiv>
              </Grid>
              {/* Third Box */}
              <Grid item xs={5} sm={4}>
                <CenterDiv>
                  <Button
                    variant="contained"
                    style={{
                      width: { xs: "12rem", sm: "8rem", md: "12rem" },
                      backgroundColor: colors.becomePartnerGreen,
                      fontWeight: "700",
                    }}
                    onClick={() => {
                      perposalsAgainstProjectByIdFun(p._id);
                      setDrawerState(true);
                    }}
                  >
                    View Perposals
                  </Button>
                  <Box my={0.35}></Box>
                  <Button
                    variant="contained"
                    style={{
                      width: { xs: "12rem", sm: "8rem", md: "12rem" },
                      backgroundColor: colors.becomePartnerGreen,
                      fontWeight: "700",
                    }}
                  >
                    Cancel Project
                  </Button>
                </CenterDiv>
              </Grid>
            </Grid>
          </Grid>
          {/* Last Box */}
          <Grid
            item
            xs={11}
            sm={2}
            marginLeft={{ sm: "10px" }}
            boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          >
            <CenterDiv>
              <PerposalsNo>{p.proposalCount}</PerposalsNo>
              <SmallP style={{ fontWeight: "bold" }}>Perposals</SmallP>
            </CenterDiv>
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
  font-size: 1.2rem;
  display: inline-block;
  font-weight: 500;
  line-height: 19.5px;
  margin: 0px 0px 5px;
`;
const TitleP = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
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

const ProjectTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;
const UserName = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0;
`;
const ColoredText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.becomePartnerGreen};
`;
const DeleteP = styled.p`
  color: ${colors.googleRed};
  padding-top: 5px;
  font-weight: bold;
  font-size: 1.2rem;
  padding-left: 15px;
`;
const PerposalDes = styled.p`
  font-size: 1.2rem;
`;
const DialogP = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;
const DialogPSmall = styled.p`
  font-size: 1.2rem;
`;

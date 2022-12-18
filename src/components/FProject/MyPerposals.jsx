import React, { useEffect, useState } from "react";
import { Grid, Box, Avatar, Button, Pagination, Drawer } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import colors from "../../utils/colors";
import usePagination from "./Pagination";

export default function MyPerposals({ data }) {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  const PER_PAGE = 3;
  const count = Math.ceil(projects.length / PER_PAGE);
  const _DATA = usePagination(projects, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [drawerState, setDrawerState] = useState(false);
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
      Hello WWorld
    </Box>
  );

  useEffect(() => {
    const temp = data.filter((d) => d.perposalDes !== "");
    // console.log("My Perposal data", temp);
    setProjects(temp);
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {_DATA.currentData().map((p) => (
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
                  {"Budget Offered"}
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
              ></Grid>
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

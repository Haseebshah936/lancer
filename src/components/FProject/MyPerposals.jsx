import React, { useEffect, useState } from "react";
import { Grid, Box, Avatar, Button, Pagination } from "@mui/material";
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
                    <Avatar alt="Cindy Baker" src={p.eImageURL} />
                  </Box>
                  <UserName className="text-center">{p.eUserName}</UserName>
                  <Box className="border rounded text-center">Client</Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2} display="flex" flexDirection="column">
                <SubTitle className="text-md-center mt-md-3">
                  {"Client Price"}
                </SubTitle>
                <ColoredText className="text-md-center">{p.budget}</ColoredText>
              </Grid>
              <Grid item xs={12} md={2}>
                <SubTitle className="text-md-center mt-md-3">
                  {"Job Type"}
                </SubTitle>
                <ColoredText className="text-md-center">
                  {p.pricingType}
                </ColoredText>
              </Grid>
              <Grid item xs={12} md={3}>
                <SubTitle className="text-md-center mt-md-3">
                  {"Your Price"}
                </SubTitle>
                <ColoredText className="text-md-center">
                  $ {p.budget}
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
                  style={{
                    backgroundColor: colors.becomePartnerButtonGreen,
                    fontWeight: "bold",
                    height: "30px",
                    width: "12rem",
                  }}
                >
                  Edit&nbsp;Peroposal
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: colors.becomePartnerButtonGreen,
                    fontWeight: "bold",
                    marginTop: "10px",
                    height: "30px",
                    width: "12rem",
                  }}
                >
                  Edit&nbsp;Peroposal
                </Button>

                <DeleteP onClick={() => {}}>Delete Perposal</DeleteP>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className="border rounded p-3">
              <SubTitle className="mt-md-2">Description</SubTitle>

              <PerposalDes>{p.perposalDes}</PerposalDes>
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

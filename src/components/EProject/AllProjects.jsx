import { Avatar, Box, Button, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import usePagination from "./Pagination";
export default function AllProjects({ data }) {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(projects.length / PER_PAGE);
  const _DATA = usePagination(projects, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    // console.log("All data", data);
    setProjects(data);
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {_DATA.currentData().map((p) => (
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
                  <p className="fw-bold fs-3 mb-1">$ {p.budget}.00</p>
                  <p>{p.days} Days</p>
                </CenterDiv>
              </Grid>
              {/* Third Box */}
              <Grid item xs={5} sm={2.5}>
                <CenterDiv>
                  {p.projectStatus === "closed" ? (
                    <div>
                      <Button
                        variant="contained"
                        style={{
                          width: "12rem",
                          backgroundColor: colors.becomePartnerGreen,
                          fontWeight: "700",
                        }}
                      >
                        View Details
                      </Button>
                      <SmallP
                        className="mt-1 text-center"
                        style={{
                          color: colors.becomePartnerGreen,
                          fontWeight: "bold",
                        }}
                      >
                        Hired on {p.hiredOn}
                      </SmallP>
                    </div>
                  ) : (
                    <CenterDiv>
                      <Button
                        variant="contained"
                        style={{
                          width: "12rem",
                          backgroundColor: colors.becomePartnerGreen,
                          fontWeight: "700",
                        }}
                      >
                        View&nbsp;Perposals
                      </Button>
                      <Box my={0.35}></Box>
                      <Button
                        variant="contained"
                        style={{
                          width: "12rem",
                          backgroundColor: colors.becomePartnerGreen,
                          fontWeight: "700",
                        }}
                      >
                        Edit&nbsp;Jobs
                      </Button>
                    </CenterDiv>
                  )}
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
                <PerposalsNo>{p.noOfPerposals}</PerposalsNo>
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

import { Avatar, Box, Button, Grid, Pagination, Rating } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import usePagination from "./Pagination";
export default function CancelledProjects({ data }) {
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
    const temp = data.filter((item) => item.cancelledStatus === true);
    console.log("Complete Project data", temp);
    setProjects(temp);
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
                </CenterDiv>
              </Grid>
              {/* Third Box */}
              <Grid item xs={5} sm={2.5}>
                <CenterDiv>
                  <TitleP
                    style={{ color: colors.googleRed, fontWeight: "bold" }}
                  >
                    Cancelled
                  </TitleP>
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
            padding="5px"
            boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          >
            {/* Project Completed */}
            <CenterDiv>
              <Button
                variant="contained"
                style={{
                  width: "12rem",
                  backgroundColor: colors.becomePartnerGreen,
                  fontWeight: "700",
                }}
              >
                Repost
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  width: "12rem",
                  backgroundColor: colors.googleRed,
                  fontWeight: "700",
                }}
              >
                Delete
              </Button>
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

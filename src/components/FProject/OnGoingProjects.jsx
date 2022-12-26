import { Avatar, Grid, Box, Rating, Button, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import usePagination from "../FProject/Pagination";
import styled from "styled-components";
import colors from "../../utils/colors";
import { useNavigate } from "react-router-dom";

export default function OnGoingProjects({ data }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    const temp = data.filter((p) => p.perposalAcceptanceDate !== "");
    // console.log("Ongoing Projects data", temp);
    setProjects(temp);
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {_DATA.currentData().map((p) => (
        <Grid
          Container
          margin={1}
          padding={2}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
          borderRadius={1}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Grid Container>
              <Grid item xs={12}>
                <UserNameP>{p.eUserName}</UserNameP>
              </Grid>
              <Grid item xs={12}>
                <TitleP>{p.title}</TitleP>
              </Grid>
              <Grid item xs={12}>
                <ClientPriceP>{"Budget"}</ClientPriceP>
              </Grid>
              <Grid item xs={12} display="flex" flexDirection={"row"}>
                <ClientBudgetP>${p.budget}.00&nbsp;</ClientBudgetP>
                <PricingTypeP>&nbsp;(&nbsp;{p.pricingType}&nbsp;)</PricingTypeP>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} display="flex" alignItems={"center"}>
            <Box display="flex" flexDirection={"row"} alignItems="center">
              <Avatar src={p?.creatorId?.profilePic}></Avatar>
              <Box display="flex" flexDirection={"column"}>
                <UserNameP className="ps-3">{p?.creatorId?.name}</UserNameP>
                <DateP className="ps-3">{p?.creatorId?.badge}</DateP>
                <Rating
                  className="ps-2"
                  name="read-only"
                  value={p?.creatorId?.seller?.rating}
                  readOnly
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
            my={{ xs: 2, md: 0 }}
          >
            <Button
              variant="contained"
              style={{
                width: "12rem",
                height: "30px",
                backgroundColor: colors.becomePartnerGreen,
                fontWeight: "700",
              }}
              onClick={() => {}}
            >
              Chat
            </Button>
            <Button
              variant="contained"
              style={{
                width: "12rem",
                height: "30px",
                backgroundColor: colors.becomePartnerGreen,
                fontWeight: "700",
                marginTop: "6px",
              }}
              onClick={() =>
                navigate(`/orderStatus`, { state: { projectId: p._id } })
              }
            >
              View
            </Button>
            <ProjectAcceptaceDateP>Project Taken On</ProjectAcceptaceDateP>
            <ProjectAcceptaceDateP>
              {p?.hired?.createdAt.slice(0, 10)}
            </ProjectAcceptaceDateP>
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
  font-size: 1.15rem;
  color: ${colors.becomePartnerGreen};
  display: inline-block;
  font-weight: bold;
  line-height: 1rem;
  margin: 0px 0px 5px;
`;
const DateP = styled.p`
  font-size: 1.15rem;
  display: inline-block;
  font-weight: bold;
  line-height: 1rem;
  margin: 0px 0px 5px;
`;
const TitleP = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 20px;
  margin: 0px 0px 3px;
`;
const ClientPriceP = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 20px;
  margin: 10px 0px 3px;
`;
const ClientBudgetP = styled.p`
  font-size: 2.3rem;
  color: ${colors.becomePartnerGreen};
  font-weight: 600;
  line-height: 20px;
  margin: 0px 0px 5px;
`;
const PricingTypeP = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 20px;
  margin: 0px 0px 5px;
`;
const ProjectAcceptaceDateP = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 20px;
  margin: 0px 0px 0px;
`;

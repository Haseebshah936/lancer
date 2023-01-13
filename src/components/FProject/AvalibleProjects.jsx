import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  Radio,
  Drawer,
  TextField,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import * as Reactt from "react";
import Joi from "joi";
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
import { useRealmContext } from "../../db/RealmContext";
import { handleError } from "./../../utils/helperFunctions";
import { useNavigate } from "react-router-dom";

export default function AvalibleProjects({ data }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [activeGigs, setActiveGigs] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState("");
  const [selecteProjectData, setSelectedProjectData] = useState({});
  const [drawerState, setDrawerState] = useState(false);
  // Radios
  const [selectedValue, setSelectedValue] = React.useState("");
  const [perposlVar, setPerposlVar] = useState({
    description: "",
    price: "",
    days: "",
  });
  const [autoFocusVar, setAutoFocusVar] = useState({
    description: false,
    price: false,
    days: false,
  });
  const peropsalVarSchema = Joi.object({
    description: Joi.string().min(50).required(),
    price: Joi.number().min(10).required(),
    days: Joi.number().min(1).required(),
    Gig: Joi.string().required(),
  });
  const [perposalError, setPerposalError] = useState({});
  const ValidatePerposal = () => {
    const result = peropsalVarSchema.validate(
      {
        description: perposlVar.description,
        price: perposlVar.price,
        days: perposlVar.days,
        Gig: selectedValue,
      },
      { abortEarly: false }
    );
    if (!result.error) {
      setPerposalError({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setPerposalError(errors);
    return errors;
  };
  const { user } = useRealmContext();
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
    console.log("Selected Value", selectedValue);
  };
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

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
  const ref = useRef(null);

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
      {/* {selectedProjectID} */}
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={11}>
          {activeGigs.length === 0 ? (
            <div>
              <h3 className="text-center">Kindly Create a Gig</h3>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.becomePartnerGreen,
                  color: "white",
                  "&:hover": {
                    backgroundColor: colors.becomePartnerGreen,
                  },
                }}
                onClick={() => {
                  navigate("/f/Gigs");
                }}
              >
                Create Gig
              </Button>
            </div>
          ) : null}
        </Grid>
        {activeGigs.map((gig) => (
          <Grid
            container
            item
            xs={11}
            key={gig._id}
            mt={1}
            boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
            borderRadius="5px"
          >
            <Grid item xs={3}>
              <Box
                component={"img"}
                src={gig.images[0]}
                alt="gig Image"
                width={"100%"}
                height={"80px"}
              ></Box>
            </Grid>
            <Grid
              item
              xs={7}
              p={1}
              style={{ textOverflow: "ellipsis", overflow: "hidden" }}
            >
              <Box maxWidth={{ xs: "90px", sm: "260px" }}>
                <GigTitle>{gig.title}</GigTitle>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Radio
                checked={selectedValue === gig._id}
                // onChange={handleChange}
                value={gig._id}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                  console.log("Selected Value", selectedValue);
                }}
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid container mt={1} display={"flex"} justifyContent={"center"}>
        <Grid item xs={11} display="flex" justifyContent="center">
          {perposalError.Gig && (
            <div className="alert alert-danger">
              {"Select a Gig to send perposal"}
            </div>
          )}
        </Grid>
        <Grid item xs={11} mt={1} display="flex" justifyContent="center">
          <GreenTextField
            variant="outlined"
            value={perposlVar.price}
            onChange={(e) => {
              setAutoFocusVar({
                price: true,
                description: false,
                days: false,
              });
              setPerposlVar({
                ...perposlVar,
                price: e.target.value,
              });
            }}
            autoFocus={autoFocusVar.price}
            label="Budget"
            fullWidth
            type="number"
          ></GreenTextField>
        </Grid>
        <Grid item xs={11} mt={1} display="flex" justifyContent="center">
          {perposalError.price && (
            <div className="alert alert-danger">{perposalError.price}</div>
          )}
        </Grid>
        <Grid item xs={11} mt={1} display="flex" justifyContent="center">
          <GreenTextField
            variant="outlined"
            value={perposlVar.days}
            onChange={(e) => {
              setAutoFocusVar({
                price: false,
                description: false,
                days: true,
              });
              setPerposlVar({
                ...perposlVar,
                days: e.target.value,
              });
            }}
            label="No. of Days"
            fullWidth
            autoFocus={autoFocusVar.days}
            type="number"
          ></GreenTextField>
        </Grid>
        <Grid item xs={11} mt={1} display="flex" justifyContent="center">
          {perposalError.days && (
            <div className="alert alert-danger">{perposalError.days}</div>
          )}
        </Grid>
        <Grid item xs={11} mt={1} display="flex" justifyContent="center">
          <GreenTextField
            variant="outlined"
            value={perposlVar.description}
            onChange={(e) => {
              // scroll to ref={ref} when something is typed
              setAutoFocusVar({
                price: false,
                description: true,
                days: false,
              });
              setPerposlVar({
                ...perposlVar,
                description: e.target.value,
              });
            }}
            label="Description"
            multiline
            rows={4}
            fullWidth
            autoFocus={autoFocusVar.description}
            onFocus={(e) => {
              var temp_value = e.target.value;
              e.target.value = "";
              e.target.value = temp_value;
            }}
          ></GreenTextField>
        </Grid>
        <Grid item xs={11} mt={1} display="flex" justifyContent="center">
          {perposalError.description && (
            <div className="alert alert-danger">
              {perposalError.description}
            </div>
          )}
        </Grid>
      </Grid>

      <Grid container mt={1} display={"flex"} justifyContent={"center"}>
        <Grid item xs={11} display="flex" justifyContent="center">
          <GreenButton
            variant="contained"
            width="90px"
            sx={{
              backgroundColor: colors.becomePartnerButtonGreen,
              "&:hover": {
                backgroundColor: colors.becomePartnerButtonGreen,
              },
            }}
            onClick={() => {
              let v = ValidatePerposal();
              if (v) {
                console.log("Perposal Error", perposalError);
              } else {
                sendPerposalFunc();
              }
            }}
            mb={2}
          >
            Send Perposal
          </GreenButton>
        </Grid>
      </Grid>
    </Box>
  );

  // const paginationFun = () => {};
  // useEffect(() => {
  //   _DATA = usePagination(projects, PER_PAGE);
  // }, [projects]);
  // Slide Show Ends
  // const getAllPendingProjects = async () => {
  //   await requestMethod
  //     .get("project/pending")
  //     .then((res) => {
  //       console.log(res.data);
  //       setProjects(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(
  //         "🚀 ~ file: AvalibleProjects.jsx:252 ~ getAllPendingProjects ~ err",
  //         err
  //       );
  //     });
  // };
  useEffect(() => {
    // getAllPendingProjects();
    requestMethod
      .get(`product/byUserId/${user?._id}`)
      .then((response) => {
        // const aGigs = response.data.map((gig) => {
        //   if (gig.state === "live") {
        //     return gig;
        //   }
        // });
        const aGigs = response.data.filter((gig) => gig.state === "live");
        setActiveGigs(aGigs);
        console.log("all gigs", aGigs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log("values changed", perposlVar);
  }, [perposlVar]);
  const sendPerposalFunc = async () => {
    let data = {
      projectId: selectedProjectID,
      creatorId: user?._id,
      productId: selectedValue,
      description: perposlVar.description,
      budget: perposlVar.price,
      duration: perposlVar.days,
    };
    console.log("data", data);
    requestMethod
      .post("proposal", data)
      .then((res) => {
        console.log(res.data);
        setDrawerState(false);
        setPerposlVar({
          price: "",
          days: "",
          description: "",
        });
        setAutoFocusVar({
          price: false,
          description: false,
          days: false,
        });
      })
      .catch((err) => {
        handleError(err);
      });
  };
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
              <Grid
                item
                xs={0}
                sm={2}
                md={0}
                display={{ xs: "flex", sm: "none" }}
              ></Grid>
              <Grid item xs={5} sm={6} md={2.5} display={"flex"}>
                <CenterDiv>
                  {/* Send Perposal */}
                  <div
                    // style={{ opacity: 0.1 }}
                    onClick={() => {
                      setSelectedProjectID(p._id);
                      console.log("Selected Project ID", selectedProjectID);
                    }}
                  >
                    <Button
                      onClick={() => setDrawerState(true)}
                      variant="contained"
                      style={{
                        // width: "12rem",
                        backgroundColor: colors.becomePartnerGreen,
                        fontWeight: "700",
                      }}
                    >
                      Send Perposal
                    </Button>
                  </div>
                  <SmallP
                    className="mt-1 text-center"
                    style={{
                      color: colors.becomePartnerGreen,
                      fontWeight: "bold",
                    }}
                  >
                    Posted on
                  </SmallP>
                  <SmallP
                    className="mt-1 text-center"
                    style={{
                      color: colors.becomePartnerGreen,
                      fontWeight: "bold",
                    }}
                  >
                    {p.createdAt.substring(0, 10)}
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
const GigTitle = styled.p`
  font-size: 1.5rem;
  margin: 0px 0px 5px;
`;
const GreenTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${colors.becomePartnerGreen};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.becomePartnerGreen};
    }
  
`;
const GreenButton = styled(Button)`
  background-color: ${colors.becomePartnerButtonGreen};
  color: white;
  "&:hover": {
    background-color: ${colors.becomePartnerButtonGreen};
    color: white;
  }
`;

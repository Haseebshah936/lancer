import {
  ExpandCircleDownOutlined,
  ExpandMore,
  MenuBookOutlined,
  PeopleOutlined,
  QuestionAnswerOutlined,
  Report,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Card from "../../components/CustomerSupport/Card";
import ReportModal from "../../components/CustomerSupport/ReportModal";
import Footer from "../../components/Footer";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import colors from "../../utils/colors";

const InputField = ({
  label,
  onChange,
  value,
  styles,
  type,
  placeholder,
  id,
  name,
  ...props
}) => {
  return (
    <CustomInput
      id={id}
      type={type}
      fullWidth
      placeholder={placeholder}
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      style={{ ...styles }}
      {...props}
    />
  );
};

export default function CustomerSupport() {
  const [terms, setTerms] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    setTerms(e);
  };

  const handleSubmit = (search) => {};

  const handleOpenReport = () => {
    setToggle(true);
  };

  const handleCloseReport = () => {
    setToggle(false);
  };

  return (
    <>
      <MainContainer>
        <HeaderLoggedIn />
        <Content>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            mobile={12}
          >
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              mobile={12}
              sx={{ mt: 5 }}
            >
              <MainHeading>
                How can we{" "}
                <MainHeading
                  sx={{
                    display: "inline",
                    textDecoration: "underline",
                    textDecorationColor: colors.textGreen,
                  }}
                >
                  help you?
                </MainHeading>{" "}
              </MainHeading>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              mobile={12}
            >
              <SearchContainer>
                <div style={{ width: "10%" }}>
                  <IconButton onClick={() => handleSubmit(terms)}>
                    <SearchOutlined sx={{ fontSize: "3rem" }} />
                  </IconButton>
                </div>
                <form
                  style={{ width: "90%" }}
                  onSubmit={(e) => {
                    handleSubmit(terms);
                    e.preventDefault();
                  }}
                >
                  {" "}
                  <InputField
                    value={terms}
                    styles={{
                      width: "100%",
                      backgroundColor: "transparent",
                      paddingLeft: "10px",
                    }}
                    placeholder={"Start typing your search..."}
                    type="text"
                    onChange={(e) => {
                      handleChange(e.target.value);
                    }}
                  />
                </form>
              </SearchContainer>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              mobile={12}
              sx={{ py: 5 }}
            >
              <MoreText>
                Or{" "}
                <MoreText
                  sx={{
                    color: colors.textGreen,
                    display: "inline",
                    fontWeight: "bold !important",
                  }}
                >
                  choose
                </MoreText>{" "}
                an option from below
              </MoreText>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-evenly"
              alignItems="center"
              mobile={12}
            >
              <Card
                title={"Guides"}
                description={"How to do's for using Lancer"}
                Icon={
                  <MenuBookOutlined
                    sx={{ fontSize: "10rem", color: colors.textGreen }}
                  />
                }
              />
              <Card
                title={"FAQ"}
                description={"Questions and answers about Lancer"}
                Icon={
                  <QuestionAnswerOutlined
                    sx={{ fontSize: "10rem", color: colors.textGreen }}
                  />
                }
              />
              <Card
                onClick={handleOpenReport}
                style={{ cursor: "pointer" }}
                title={"Report"}
                description={"Do you want to Report a person?"}
                Icon={
                  <Report sx={{ fontSize: "10rem", color: colors.textGreen }} />
                }
              />
            </Grid>
          </Grid>
          <ReportModal toggleClose={handleCloseReport} toggle={toggle} />
          <Grid
            item
            container
            mobile={12}
            sx={{ mt: 5 }}
            justifyContent="center"
            alignItems="center"
          >
            <SubHeading>Getting Started</SubHeading>
          </Grid>

          <Grid
            item
            container
            mobile={12}
            justifyContent="center"
            alignItems="center"
          >
            <SubTitle>
              Some quick Frequently Asked Questions to get you started
            </SubTitle>
          </Grid>

          <Grid item container mobile={12} sx={{ mt: 4 }}>
            <Accordion
              sx={{ width: "100%", mx: 5, "&.Mui-expanded": { mx: 5 } }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandCircleDownOutlined
                    sx={{ color: colors.textGreen, fontSize: "2.5rem" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "2.0rem", color: colors.textGreen }}
                >
                  General Questions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1.5rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item container mobile={12} sx={{ mt: 1 }}>
            <Accordion
              sx={{ width: "100%", mx: 5, "&.Mui-expanded": { mx: 5 } }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandCircleDownOutlined
                    sx={{ color: colors.textGreen, fontSize: "2.5rem" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "2.0rem", color: colors.textGreen }}
                >
                  General Questions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1.5rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item container mobile={12} sx={{ mt: 1 }}>
            <Accordion
              sx={{ width: "100%", mx: 5, "&.Mui-expanded": { mx: 5 } }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandCircleDownOutlined
                    sx={{ color: colors.textGreen, fontSize: "2.5rem" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "2.0rem", color: colors.textGreen }}
                >
                  General Questions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1.5rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Content>
        <Footer />
      </MainContainer>
    </>
  );
}

const MainHeading = styled(Typography)({
  color: colors.black,
  fontSize: "5rem !important",
  fontweight: "bold",
});

const SubHeading = styled(Typography)({
  color: colors.black,
  fontSize: "4rem !important",
  fontweight: "bold",
});

const SubTitle = styled(Typography)({
  color: "#404145",
  fontSize: "1.3rem !important",
  fontweight: "bold",
});

const MoreText = styled(Typography)({
  color: "#404145",
  fontSize: "1.8rem !important",
});

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  padding-inline: 7%;
`;

const SearchContainer = styled.div`
  box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
  :hover {
    background-color: #eee;
  }
  border: 1px solid #dfe1e5;
  margin-top: 15px;
  height: 65px;
  border-radius: 34px;
  color: #212121;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 10px;
  width: 55ch;
  z-index: 10;
  @media (max-width: 700px) {
    display: none;
  } ;
`;

const CustomInput = styled.input`
  outline: none;
  border: 0px;
`;

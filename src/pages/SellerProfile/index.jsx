import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SellerProfileInfo from "../../components/SellerProfileInfo";
import { miniTablet, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";
import SellerProfileTabs from "./SellerProfileTabs";

function index(props) {
  return (
    <Wrapper>
      <Header />
      <Container>
        <SellerProfileInfo
          style={{ minWidth: "25rem", flex: 0.2 }}
          showExtraInfo={true}
        />
        <SellerProfileTabsWrapper>
          <SellerProfileTabs />
        </SellerProfileTabsWrapper>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default index;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  flex-grow: 1;
  padding-inline: 7%;
  margin-top: 3rem;
  justify-content: space-between;
  ${miniTablet({
    flexDirection: "column",
  })}
`;

const SellerProfileTabsWrapper = styled.div`
  flex: 0.7;
  min-width: 30rem;
  ${tablet({
    flex: 0.78,
  })}
  ${miniTablet({
    flex: 1,
  })}
`;

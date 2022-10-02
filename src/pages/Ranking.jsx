import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";

function Ranking(props) {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ];
  return (
    <Wrapper>
      <Header />
      <Container>
        <Heading>Top Sellers This Month</Heading>
        <ProfileContainer>
          {a.map((c) => (
            // <div className="col-xxl-3 col-lg-4 col-md-6 col-xs-1">
            <ProfileComponent count={c} />
            // </div>
          ))}
        </ProfileContainer>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default Ranking;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 7%;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
`;

const Heading = styled.h2`
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  margin-bottom: 3rem;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  align-items: center;
  @media (max-width: 2400px) {
    /* justify-content: space-around; */
  }
  justify-content: flex-start;
  max-width: 120rem;
`;

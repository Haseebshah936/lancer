import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/NewsLetterComponent";
import ProfileComponent from "../components/ProfileComponent";
import { requestMethod } from "../requestMethod";

function Ranking(props) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    requestMethod
      .get("user/rankedUsers")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        <Heading>Top Sellers This Month</Heading>
        <ProfileContainer>
          {users.map((c, i) => (
            // <div className="col-xxl-3 col-lg-4 col-md-6 col-xs-1">
            <ProfileComponent
              key={i}
              count={i + 1}
              url={c?.profilePic}
              name={c?.name}
              currency="$"
              onClick={() => navigate(`/profile/${c?._id}`)}
            />
            // </div>
          ))}
        </ProfileContainer>
      </Container>
      <Newsletter />
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
`;

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

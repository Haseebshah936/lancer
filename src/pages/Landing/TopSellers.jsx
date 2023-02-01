import { Button } from "@mui/material";
import styled from "styled-components";
import ProfileComponent from "../../components/ProfileComponent";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { requestMethod } from "../../requestMethod";
import { useEffect, useState } from "react";

function TopSellers(props) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    requestMethod
      .get("user/rankedUsers?limit=12")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <HeadingContainer>
        <Heading>Top Sellers This Month</Heading>

        <TagLine>
          Join Our mailing list to stay in the loop of our newest feature
          releases, tips and tricks.
        </TagLine>
      </HeadingContainer>

      <ProfileContainer>
        {users.map((user, i) => (
          // <div className="col-xxl-3 col-lg-4 col-md-6 col-xs-1">
          <ProfileComponent
            key={i}
            count={i + 1}
            url={user?.profilePic}
            name={user?.name}
            currency="$"
            orders={user?.seller?.completedOrders}
          />
          // </div>
        ))}
      </ProfileContainer>

      <Button
        onClick={() => navigate("/ranking")}
        variant="contained"
        sx={{
          borderRadius: "2rem",
          color: "white",
          marginLeft: "1.5rem",
          fontSize: "1rem",
          padding: "1rem 2rem",
          minWidth: "1rem",
          background: " linear-gradient(130deg, #172f33, #43856b) border-box",
          marginTop: "5rem",
          textTransform: "capitalize",
        }}
      >
        Go to Ranking
      </Button>
    </Container>
  );
}

export default TopSellers;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 7%;
  align-items: center;
  margin-top: 10rem;
`;

const HeadingContainer = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;
const Heading = styled.h2`
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TagLine = styled.p`
  position: absolute;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  align-self: center;
  top: 5;
  line-height: 2rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  align-items: center;
  @media (max-width: 2400px) {
    justify-content: space-around;
  }
  justify-content: flex-start;
  max-width: 120rem;
`;

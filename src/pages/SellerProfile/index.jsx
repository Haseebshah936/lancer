import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { User } from "realm-web";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import SellerProfileInfo from "../../components/SellerProfileInfo";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import { miniPc, miniTablet, mobile, tablet } from "../../responsive";
import colors from "../../utils/colors";
import { handleError } from "../../utils/helperFunctions";
import SellerProfileTabs from "./SellerProfileTabs";

function SellerProfile(props) {
  const { user, currentUser } = useRealmContext();
  const queryParams = useParams();
  const [userData, setUserData] = useState(null);
  const { activeProfile } = useCustomContext();
  const [aboutSeller, setAboutSeller] = useState({
    educationalBackground: [],
    experience: [],
    skills: [],
    achivements: [],
  });

  // eslint-disable-next-line no-restricted-globals
  console.log("Query Params", queryParams);
  const getUserData = async () => {
    const response = await requestMethod.get(`/user/getUser/${queryParams.id}`);
    return response.data;
  };

  useEffect(() => {
    setUserData([]);
  }, []);

  useEffect(() => {
    if (user && queryParams.id === user?._id) {
      setUserData(user);
      if (user.seller) {
        setAboutSeller({
          educationalBackground: user.seller.education,
          experience: user.seller.experience,
          skills: user.seller.skills,
          achivements: user.seller.achivements,
        });
      }
    }
    if (user && queryParams.id !== user?._id) {
      console.log("user id here");
      getUserData()
        .then((data) => {
          console.log("Data", data);
          setUserData(data);
          if (data.seller) {
            setAboutSeller({
              educationalBackground: data.seller.education,
              experience: data.seller.experience,
              skills: data.seller.skills,
              achivements: data.seller.achivements,
            });
          }
        })
        .catch((err) => {
          console.log("Error", err);
          handleError(err);
        });
    }
  }, [user, currentUser, queryParams.id]);

  useEffect(() => {
    console.log("User Data", userData);
  }, [userData]);

  return (
    <Wrapper>
      <HeaderLoggedIn />
      <Container>
        {userData && (
          <SellerProfileInfo
            style={{ minWidth: "25rem", flex: 0.2 }}
            showExtraInfo={
              user?._id === queryParams.id
                ? activeProfile === "seller"
                  ? true
                  : false
                : userData.seller
                ? activeProfile === "seller"
                  ? false
                  : true
                : false
            }
            languages={[""]}
            city=""
            country="Paksitan"
            englishLevel="Intermediate"
            profilePic={userData.profilePic}
            rating={userData.stars}
            reviews={userData.reviews}
            views={userData?.views ? userData?.views : 0}
            saved={
              user?._id === queryParams.id
                ? true
                : user?.follower?.includes(userData?._id)
            }
            name={userData.name}
            approved={userData.emailVerified}
            description={
              userData.seller ? userData.seller.about : userData.about
            }
            {...aboutSeller}
          />
        )}
        <SellerProfileTabsWrapper>
          {userData && (
            <SellerProfileTabs
              showProductsTab={
                user?._id === queryParams.id
                  ? activeProfile === "seller"
                    ? true
                    : false
                  : userData?.seller
                  ? true
                  : false
              }
              {...aboutSeller}
            />
          )}
        </SellerProfileTabsWrapper>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default SellerProfile;

const Wrapper = styled.div`
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${miniPc({
    minHeight: "130vh",
  })}
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

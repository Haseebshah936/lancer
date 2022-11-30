import { ChatBubbleOutline, TaskAlt } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { memo } from "react";
import styled from "styled-components";
import AboutSeller from "../AboutSeller/AboutSeller";
import { miniTablet, mobile } from "../../responsive";
import colors from "../../utils/colors";
import ProfileReviewInfo from "../ProfileReviewsInfo";

function SellerProfileInfo({
  languages = [],
  city = "",
  country = "",
  englishLevel = "",
  profilePic = "https://api.lorem.space/image/face?w=100&h=100&hash=w7ejlc5z",
  rating = "N/A",
  reviews = "N/A",
  views = "N/A",
  saved = false,
  handleSave,
  name = "Haseeb",
  approved = false,
  description = "N/A",
  style,
  showExtraInfo = false,
  skills = [],
  educationalBackground = [],
  experience = [],
  achivements = [],
  isSame = false,
}) {
  return (
    <Container style={{ ...style, maxHeight: showExtraInfo ? "100%" : "30vh" }}>
      <Wrapper>
        <Image src={profilePic} />
        <Name>
          {name}{" "}
          <TaskAlt
            sx={{
              fontSize: "1rem",
              color: approved
                ? colors.becomePartnerButtonGreen
                : colors.googleRed,
            }}
          />
        </Name>
        <GigDescription>{description}</GigDescription>
        <ProfileReviewInfo
          size={1}
          rating={rating}
          reviews={reviews}
          views={views}
          saved={saved}
          handleSave={handleSave}
        />
        <SubHeading>Location:</SubHeading>
        <Text>
          {city} {country}
        </Text>
        {languages.length > 0 && (
          <>
            <SubHeading>Languages:</SubHeading>
            <Text>{languages.join(", ")}</Text>
          </>
        )}
        {englishLevel && (
          <>
            <SubHeading>English level:</SubHeading>
            <Text>{englishLevel}</Text>
          </>
        )}
        {!isSame && showExtraInfo && (
          <CustomIconButton variant="contained">
            <ChatBubbleOutline />
            &nbsp;&nbsp;Contact to this seller
          </CustomIconButton>
        )}
      </Wrapper>
      <AboutContainer>
        {showExtraInfo && (
          <AboutSeller
            skills={skills}
            experience={experience}
            educationalBackground={educationalBackground}
            achievements={achivements}
          />
        )}
      </AboutContainer>
    </Container>
  );
}

export default memo(SellerProfileInfo);

const Container = styled.div`
  width: 100%;
  background-color: ${colors.white};
  padding-inline: 24px;
  padding-bottom: 24px;
  padding-top: 7rem;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  min-height: 46rem;
  ${miniTablet({
    marginRight: "3rem",
    boxShadow: "none",
  })}
  ${mobile({
    marginRight: "0rem",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  position: absolute;
  top: -5rem;
`;
const Name = styled.h3`
  font-size: 1.3rem;
  color: ${colors.becomePartnerButtonGreen};
`;

const GigDescription = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const SubHeading = styled.h3`
  color: #808080b8;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const CustomIconButton = styled(Button)`
  align-self: center;
  margin-top: 2rem !important;
  margin-bottom: 2.5rem !important;
  color: ${colors.white} !important;
  background-color: ${colors.textGreen} !important;
  width: 100%;
  padding-block: 1rem !important;
  text-transform: none !important;
  font-weight: bold !important;
`;

const AboutContainer = styled.div`
  ${miniTablet({
    display: "none",
  })}
`;

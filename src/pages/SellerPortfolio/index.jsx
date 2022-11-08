import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { miniPc, miniTablet, mobile, tablet } from "../../responsive";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PricingPlan from "../../components/PricingPlan";
import Gallery from "../../components/Gallery";
import SellerProfileInfo from "../../components/SellerProfileInfo";
import OtherServices from "./OtherServices";
import Reviews from "../../components/ReviewsComponent";
import { packages, sellerSliderData } from "../../utils/dummyData";
import ProfileReviewInfo from "../../components/ProfileReviewsInfo";

function SellerPortfolio(props) {
  const title =
    "Get your premium quality product logo designing and | rebranding material in very low price";
  const rating = 5.0;
  const reviews = 20;
  const views = 10000;

  const [save, setSave] = useState(false);

  const handleSave = () => setSave(!save);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <SubContainer1>
            <Heading>{title}</Heading>
            <ProfileReviewInfo
              rating={rating}
              reviews={reviews}
              views={views}
              saved={save}
              handleSave={handleSave}
            />
            <Gallery items={sellerSliderData} />
            <Description>
              Laboris id laborum irure in amet anim ad laboris reprehenderit
              nostrud quis. Lorem proident sint voluptate sit incididunt
              pariatur. Esse qui quis dolore tempor quis aute qui duis irure
              amet. Laboris nostrud dolore excepteur excepteur cupidatat laboris
              non labore officia aute. Id anim amet proident Lorem exercitation
              elit ullamco id Lorem. Incididunt veniam do velit nostrud elit
              proident aliqua reprehenderit magna. Sint do eiusmod enim
              reprehenderit proident enim commodo sit minim nulla. Sint do dolor
              est officia ut aliquip commodo adipisicing ullamco consequat.
              Dolore ullamco sit non ipsum cupidatat consectetur qui do. Aliqua
              in ad quis veniam nulla sint aliqua. Labore enim qui officia
              ullamco cupidatat cupidatat consequat ut sit Lorem. Nostrud elit
              consectetur laboris consequat excepteur magna elit nulla. Aliqua
              nulla et cupidatat quis magna fugiat ipsum et minim anim
              exercitation reprehenderit. Lorem labore est cupidatat quis
              voluptate non. Tempor pariatur voluptate magna sit quis labore
              sint Lorem nostrud tempor Lorem. Sint veniam consectetur laboris
              magna laborum velit voluptate cupidatat fugiat pariatur dolor
              labore. Dolor culpa reprehenderit commodo excepteur ad consequat
              Lorem. Dolore deserunt adipisicing velit est minim excepteur in
              tempor ea deserunt id aliqua. Sit nisi ipsum ad ea ad officia
              deserunt. Deserunt exercitation aliquip proident laborum ea
              ullamco tempor ad officia in proident minim velit.
              <br />
              <br />
              Laboris id laborum irure in amet anim ad laboris reprehenderit
              nostrud quis. Lorem proident sint voluptate sit incididunt
              pariatur. Esse qui quis dolore tempor quis aute qui duis irure
              amet. Laboris nostrud dolore excepteur excepteur cupidatat laboris
              non labore officia aute. Id anim amet proident Lorem exercitation
              elit ullamco id Lorem. Incididunt veniam do velit nostrud elit
              proident aliqua reprehenderit magna. Sint do eiusmod enim
              reprehenderit proident enim commodo sit minim nulla. Sint do dolor
              est officia ut aliquip commodo adipisicing ullamco consequat.
              Dolore ullamco sit non ipsum cupidatat consectetur qui do. Aliqua
              in ad quis veniam nulla sint aliqua. Labore enim qui officia
              ullamco cupidatat cupidatat consequat ut sit Lorem. Nostrud elit
              consectetur laboris consequat excepteur magna elit nulla. Aliqua
              nulla et cupidatat quis magna fugiat ipsum et minim anim
              exercitation reprehenderit. Lorem labore est cupidatat quis
              voluptate non. Tempor pariatur voluptate magna sit quis labore
              sint Lorem nostrud tempor Lorem. Sint veniam consectetur laboris
              magna laborum velit voluptate cupidatat fugiat pariatur dolor
              labore. Dolor culpa reprehenderit commodo excepteur ad consequat
              Lorem. Dolore deserunt adipisicing velit est minim excepteur in
              tempor ea deserunt id aliqua. Sit nisi ipsum ad ea ad officia
              deserunt. Deserunt exercitation aliquip proident laborum ea
              ullamco tempor ad officia in proident minim velit.
            </Description>
          </SubContainer1>
          <SubContainer2>
            <PricingPlan pakages={packages} />
            <SellerProfileInfo handleSave={handleSave} saved={save} />
          </SubContainer2>
        </Wrapper>
        <DetailsContainer>
          <SubHeading>More Services</SubHeading>
          <OtherServices />
          <SubHeading>{reviews} Client Reviews</SubHeading>
          <Reviews />
        </DetailsContainer>
      </Container>

      <Footer />
    </>
  );
}

export default SellerPortfolio;

const Container = styled.div`
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  padding-inline: 7%;
  ${miniPc({
    marginTop: "0rem",
  })}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${miniTablet({
    flexDirection: "column",
  })}
`;

const DetailsContainer = styled.div`
  width: 65%;
  ${miniPc({
    width: "60%",
  })}
  ${miniTablet({
    width: "100%",
  })}
`;

const SubContainer1 = styled.div`
  width: 65%;
  margin-right: 4rem;
  ${miniPc({
    width: "60%",
    flexDirection: "column",
  })}
  ${miniTablet({
    width: "100%",
    marginRight: 0,
    flexDirection: "column",
  })}
`;
const Heading = styled.h1`
  text-align: justify;
  margin-right: 4rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.7rem;
  ${tablet({
    fontSize: "1.8rem",
    marginRight: "0rem",
  })}
`;

const SubContainer2 = styled.div`
  width: 40%;
  max-width: 30rem;

  ${miniTablet({
    display: "flex",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    marginBlock: "4rem",
  })}
  ${mobile({
    marginLeft: 0,
    display: "flex",
    flexDirection: "column",
  })}
`;

const Description = styled.p`
  text-align: justify;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const SubHeading = styled.h2`
  font-weight: 600;
  font-size: 1.6rem;
  margin-block: 2rem;
`;

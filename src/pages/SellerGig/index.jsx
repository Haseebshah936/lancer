import React, { useState } from "react";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import { miniPc, miniTablet, mobile, tablet } from "../../responsive";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import colors from "../../utils/colors";
import GigPricePlanMini from "./GigPricePlanMini";
import Review from "../../components/Review";
import Gallery from "./Gallery";
import ProfileReviewDetails from "./ProfileReviewDetails";
import SellerProfileBox from "./SellerProfileBox";
import OtherServices from "./OtherServices";

const images = [
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "video",
  },
];

function SellerGig(props) {

  const rating = 5.0;
  const reviews = 20;
  const views = 10000;

  const [save, setSave] = useState(false)

  const packages = [
    {
      name: "Starter",
      cost: 250,
      details: "",
      features: {
        logoTransparency: true,
        highResolution: true,
        vectorFile: false,
        noOfinitialConcept: 2,
        noOfRevisions: 2,
        deliveryTime: {
          time: 2,
          addditionalCost: 0,
        },
        fastDelivery: {
          time: 1,
          additionalCost: 100,
        },
      },
      additionalFeatures: {
        additionalRevision: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        includedSocialKit: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        contentUpload: {
          details: "This requires 1 more days to complete",
          additionalCost: 50,
        },
        stationaryDesign: {
          details: "This requires 2 more days to complete",
          additionalCost: 80,
        },
        hugeSizeFile: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        additionalLogoConcept: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        include3DVision: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        bussinessCard: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
      },
    },
    {
      name: "Popular Plan",
      cost: 450,
      details: "",
      features: {
        logoTransparency: true,
        highResolution: true,
        vectorFile: true,
        noOfinitialConcept: 2,
        noOfRevisions: 5,
        deliveryTime: {
          time: 3,
          addditionalCost: 0,
        },
        fastDelivery: {
          time: 1,
          additionalCost: 350,
        },
      },
      additionalFeatures: {
        additionalRevision: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        includedSocialKit: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        contentUpload: {
          details: "This requires 1 more days to complete",
          additionalCost: 50,
        },
        stationaryDesign: {
          details: "This requires 2 more days to complete",
          additionalCost: 80,
        },
        hugeSizeFile: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        additionalLogoConcept: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        include3DVision: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        bussinessCard: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
      },
    },
    {
      name: "Premium Plan",
      cost: 900,
      details: "",
      features: {
        logoTransparency: true,
        highResolution: true,
        vectorFile: true,
        noOfinitialConcept: 4,
        noOfRevisions: "unlimited",
        deliveryTime: {
          time: 3,
          addditionalCost: 0,
        },
        fastDelivery: {
          time: 1,
          additionalCost: 500,
        },
      },
      additionalFeatures: {
        additionalRevision: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        includedSocialKit: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        contentUpload: {
          details: "This requires 1 more days to complete",
          additionalCost: 50,
        },
        stationaryDesign: {
          details: "This requires 2 more days to complete",
          additionalCost: 80,
        },
        hugeSizeFile: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        additionalLogoConcept: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        include3DVision: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
        bussinessCard: {
          details: "This requires 2 more days to complete",
          additionalCost: 100,
        },
      },
    },
  ];

  const handleSave = () => setSave(!save)

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <SubContainer1>
            <Heading>
              Get your premium quality product logo designing and | rebranding
              material in very low price
            </Heading>
            <ProfileReviewDetails rating={rating} reviews={reviews} views={views} saved={save} handleSave={handleSave}/>
            <Gallery items={images} />
            
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
            <SubHeading>More Services</SubHeading>
            <OtherServices />
            <SubHeading>{reviews} Client Reviews</SubHeading>
            <ReviewContainer>
              <Review />
              <Review />
              <Review reply="Thanks for your trust and belive."/>
              <Review />
              <Review />
              <Review />
            </ReviewContainer>
            
          </SubContainer1>
          <SubContainer2>
            <GigPricePlanMini />
            <SellerProfileBox handleSave={handleSave} saved={save}/>
          </SubContainer2>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}

export default SellerGig;

const Container = styled.div`
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  padding-inline: 15%;
  ${miniPc({
    paddingInline: "10%",
    marginTop: "0rem",
  })}
  ${tablet({
    paddingInline: "7%",
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
  ${tablet({
    paddingInline: 0,
  })}
  ${mobile({
    marginLeft: 0,
    display: "none",
  })}
`;

const Description = styled.p`
  text-align: justify;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const ReviewContainer = styled.div``;

const SubHeading = styled.h2`
  font-weight: 600;
  font-size: 1.6rem;
  margin-block: 2rem;
`;

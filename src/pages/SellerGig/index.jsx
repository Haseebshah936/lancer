import React from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { miniTablet, mobile, tablet } from "../../responsive";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { IconButton } from "@mui/material";
import { FavoriteBorder, StarRate, Visibility } from "@mui/icons-material";
import colors from "../../utils/colors";
import GigPricePlanMini from "./GigPricePlanMini";

const images = [
  {
    original: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
  },
  {
    original: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
  },
  {
    original: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
  },
  {
    original: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    embedUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

function SellerGig({
  rating = 5.0,
  items = images,
  reviews = 20,
  views = 10000,
}) {
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

  return (
    <>
      <Header />
      <Container>
        <SubContainer1>
          <Heading>
            Get your premium quality product logo designing and | rebranding
            material in very low price
          </Heading>
          <ReviewContainer>
            <IconButton disableRipple>
              <StarRate htmlColor={colors.gold} />
              <ButtonText style={{ fontWeight: "bold" }}>
                &nbsp;{parseFloat(rating).toFixed(1)}
              </ButtonText>
              <ButtonText>{"(" + reviews + ")"}</ButtonText>
            </IconButton>
            <IconButton disableRipple>
              <Visibility htmlColor={colors.gray} />
              <ButtonText style={{ fontWeight: "bold" }}>
                &nbsp;{views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </ButtonText>
            </IconButton>
            <IconButton>
              <FavoriteBorder htmlColor={colors.googleRed} />
              <ButtonText
                style={{ fontWeight: "bold", color: colors.googleRed }}
              >
                &nbsp;Save
              </ButtonText>
            </IconButton>
          </ReviewContainer>
          <ImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            items={items}
            additionalClass="imageGallery"
          />
        </SubContainer1>
        <SubContainer2>
          <GigPricePlanMini />
        </SubContainer2>
      </Container>
      <Footer />
    </>
  );
}

export default SellerGig;

const Container = styled.div`
  display: flex;
  margin-top: 5rem;
  padding-inline: 15%;
  box-sizing: border-box;
  overflow-x: hidden;
  img .image-gallery-slide .image-gallery-image {
    height: 100%;
    border: 0px;
  }
  ${tablet({
    padding: "7%",
    marginTop: "0rem",
  })}
  ${miniTablet({
    flexDirection: "column",
  })}
`;

const SubContainer1 = styled.div`
  flex: 1.3;
  flex-grow: 1;
  height: 60rem;
  /* background-color: aliceblue; */
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
const ReviewContainer = styled.div`
  display: flex;
`;
const ButtonText = styled.p`
  margin-block: 0.5rem;
  color: ${colors.black};
  font-size: 1.2rem;
`;

const SubContainer2 = styled.div`
  flex: 0.6;
  background-color: antiquewhite;
  margin-left: 5rem;
  ${tablet({
    paddingInline: 0,
  })}
  ${mobile({
    marginLeft: 0,
  })}
`;

const Wrapper = styled.div``;

const pakageContainer = styled.div``;

const description = styled.p``;

const reviewContainer = styled.div``;

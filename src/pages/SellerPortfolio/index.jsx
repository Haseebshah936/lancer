import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { miniPc, miniTablet, mobile, tablet } from "../../responsive";
import HeaderLoggedIn from "../../components/HeaderLoggedIn";
import Footer from "../../components/Footer";
import PricingPlan from "../../components/PricingPlan";
import Gallery from "../../components/Gallery";
import SellerProfileInfo from "../../components/SellerProfileInfo";
import OtherServices from "./OtherServices";
import Reviews from "../../components/ReviewsComponent";
import { packages, sellerSliderData } from "../../utils/dummyData";
import ProfileReviewInfo from "../../components/ProfileReviewsInfo";
import { useParams } from "react-router-dom";
import { requestMethod } from "../../requestMethod";
import { handleError } from "../../utils/helperFunctions";
import { useRealmContext } from "../../db/RealmContext";
import { Box } from "@mui/system";
import colors from "../../utils/colors";
import { CircularProgress, Grid } from "@mui/material";

function SellerPortfolio(props) {
  const title =
    "Get your premium quality product logo designing and | rebranding material in very low price";
  const rating = 5.0;
  const views = 10000;
  const { id } = useParams();
  const [isSameUser, setIsSameUser] = useState(true);
  const [productData, setProductData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [productMedia, setProductMedia] = useState([]);
  const descriptionRef = useRef();
  const [save, setSave] = useState(false);
  const { user } = useRealmContext();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadMore, setLoadMore] = useState(true);

  const getSellerReviews = async (id, skip) => {
    const response = await requestMethod.get(
      `review/sellerReviews/${id}?skip=${skip}`
    );
    return response.data;
  };

  const handleLoadMoreReviews = async (id, skip) => {
    setLoadingReviews(true);
    getSellerReviews(id, skip)
      .then((res) => {
        if (res.length === 0) setLoadMore(false);
        setReviews((prev) => [...prev, ...res]);
        setLoadingReviews(false);
      })
      .catch((err) => {
        setLoadingReviews(false);
        handleError(err);
      });
  };

  const handleSave = () => setSave(!save);
  const getProduct = async (id) => {
    const response = await requestMethod.get("product/" + id);
    return response.data;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getProduct(id)
      .then((data) => {
        // console.log(data);
        handleLoadMoreReviews(data.owner._id._id, 0);
        setSellerData({
          name: data.owner._id.name,
          profilePic: data.owner._id.profilePic,
          badge: data.owner._id.badge,
          country: data.owner._id.country,
          emailVerified: data.owner._id.emailVerified,
          ...data.owner._id.seller,
          _id: data.owner._id._id,
        });
        setProductData(data);
        const media = [];
        data.images.map((image) => {
          media.push({
            url: image,
            type: "image",
            thumbnail: image,
          });
        });
        {
          data.videos[0] &&
            media.push({
              url: data.videos[0],
              type: "video",
              thumbnail: data.videos[0],
            });
        }
        setProductMedia(media);
        descriptionRef.current.innerHTML = data.description;
      })
      .catch((err) => {
        // console.log(err);
        handleError(err);
      });
  }, []);

  useEffect(() => {
    if (!sellerData) return;
    // console.log(sellerData);
    if (user?._id === sellerData?._id) {
      // console.log("Is same ", user._id, sellerData._id);
      setIsSameUser(true);
      return;
    } else if (user?._id !== sellerData?._id) {
      setIsSameUser(false);
    }
  }, [user, sellerData]);

  return (
    <>
      <HeaderLoggedIn />
      {productData ? (
        <Container>
          <Wrapper>
            <SubContainer1>
              <Heading>{productData.title}</Heading>
              <ProfileReviewInfo
                rating={sellerData?.rating}
                reviews={sellerData?.reviews}
                views={0}
                saved={save}
                handleSave={handleSave}
              />
              <Gallery items={productMedia} />
              <SubHeading>About this product</SubHeading>
              <Description ref={descriptionRef} />
            </SubContainer1>
            <SubContainer2>
              <PricingPlan pakages={productData?.packages} />
              {!isSameUser && (
                <SellerProfileInfo
                  name={sellerData?.name}
                  achivements={sellerData?.achivements}
                  profilePic={sellerData?.profilePic}
                  badge={sellerData?.badge}
                  rating={sellerData?.rating}
                  reviews={sellerData?.reviews}
                  description={sellerData?.about}
                  languages={sellerData?.languages}
                  showExtraInfo={false}
                  isSame={isSameUser}
                  country={sellerData?.country}
                  educationalBackground={sellerData?.education}
                  experience={sellerData?.experience}
                  englishLevel={sellerData?.englishLevel}
                  approved={sellerData?.emailVerified}
                  handleSave={handleSave}
                  showButton={true}
                  saved={save}
                  skills={sellerData?.skills}
                  userId={sellerData?._id}
                />
              )}
            </SubContainer2>
          </Wrapper>
          <DetailsContainer>
            <SubHeading>More Services</SubHeading>
            <OtherServices seller={sellerData} />
            <SubHeading>{sellerData?.reviews} Client Reviews</SubHeading>
            <Reviews
              loadMore={loadMore}
              reviews={reviews}
              getMoreReviews={(skip) =>
                handleLoadMoreReviews(sellerData._id, skip)
              }
            />
          </DetailsContainer>
          <SubHeading>Tags</SubHeading>
          <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"}>
            {productData?.tags?.map((skill, index) => (
              <Box
                p={".5rem 1rem"}
                border={`1px solid ${colors.lightGrey}`}
                borderRadius={"8%"}
                fontSize={"1.2rem"}
                color={colors.gray}
                component={"p"}
                key={index}
                maxWidth="50rem"
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Container>
      ) : (
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <CircularProgress
            sx={{
              "&.MuiCircularProgress-root": {
                color: colors.textGreen,
              },
            }}
          />
        </Grid>
      )}

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
  margin-bottom: 2rem;
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
  min-height: 40vh;
`;

const SubHeading = styled.h2`
  font-weight: 600;
  font-size: 1.6rem;
  margin-block: 2rem;
`;

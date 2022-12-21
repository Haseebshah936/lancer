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
import {
  Checkbox,
  CircularProgress,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  AttachMoneyOutlined,
  Check,
  CheckOutlined,
  Close,
} from "@mui/icons-material";
import CartDrawer from "./CartDrawer";
import { UserState } from "realm-web";

const GigDiscription = ({ value, onChange, styles }) => {
  return (
    <CustomTextArea
      fullWidth
      id="outlined-multiline-static"
      placeholder="Enter Description"
      value={value}
      onChange={onChange}
      style={{ ...styles, padding: "1rem 0.5rem" }}
    />
  );
};
const InputField = ({
  label,
  onChange,
  value,
  styles,
  type,
  placeholder,
  id,
  name,
}) => {
  return (
    <CustomInput
      id={id}
      type={type}
      fullWidth
      placeholder={placeholder}
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      style={{ ...styles, padding: "1rem 0.5rem" }}
    />
  );
};
const CheckBox = ({ onChange, checked, label, error }) => {
  return (
    <Checkbox
      icon={<Close />}
      checkedIcon={<Check />}
      checked={checked}
      disableRipple
      onChange={onChange}
      sx={{
        cursor: "default",
        "& .MuiSvgIcon-root": {
          fontSize: "2rem",
        },
        color: colors.googleRed,
        "&.Mui-checked": {
          color: colors.textGreen,
        },
      }}
    />
  );
};

function SellerPortfolio(props) {
  const title =
    "Get your premium quality product logo designing and | rebranding material in very low price";
  const rating = 5.0;
  const views = 10000;
  const { id } = useParams();
  const [isSameUser, setIsSameUser] = useState(true);
  const [productData, setProductData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [basicPlan, setBasicPlan] = useState({});
  const [standardPlan, setStandardPlan] = useState({});
  const [premiumPlan, setPremiumPlan] = useState({});
  const [categoryFeatures, setCategoryFeatures] = useState([]);
  const [subCategoryFeatures, setSubCategoryFeatures] = useState([]);

  const [productMedia, setProductMedia] = useState([]);
  const descriptionRef = useRef();
  const [save, setSave] = useState(false);
  const { user } = useRealmContext();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadMore, setLoadMore] = useState(true);

  const [gigQuantity, setGigQuantity] = useState(1);

  const IncGigQuantity = () => {
    setGigQuantity(gigQuantity + 1);
  };

  const DecGigQuantity = () => {
    if (gigQuantity > 1) {
      setGigQuantity(gigQuantity - 1);
    }
  };

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

  const getSubCategory = async (id) => {
    const response = await requestMethod.get("category/subCategory/" + id);
    return response.data;
  };

  useEffect(() => {
    console.log("Category Features: ", categoryFeatures);
    console.log("SubCategory Features: ", subCategoryFeatures);
  }, [categoryFeatures, subCategoryFeatures]);

  useEffect(() => {
    if (productData) {
      getSubCategory(productData.category).then((object) => {
        setCategoryFeatures(object.category.features);
        setSubCategoryFeatures(object.features);

        console.log("Product Data, ", productData);
      });
    }
  }, [productData]);

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

        console.log("Product Data ", productData);
        const { _id: id1, ...package1 } = data.packages[0];
        const { _id: id2, ...package2 } = data.packages[1];
        const { _id: id3, ...package3 } = data.packages[2];
        setBasicPlan(package1);
        setStandardPlan(package2);
        setPremiumPlan(package3);
        console.log("Basic Plan", basicPlan);
        console.log("Standard Plan", standardPlan);
        console.log("Premium Plan", premiumPlan);
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
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: {
              laptop: 1024,
              tablet: 640,
              mobile: 0,
              desktop: 1280,
            },
          },
        })}
      >
        <CartDrawer
          gigQuantity={gigQuantity}
          IncGigQuantity={IncGigQuantity}
          DecGigQuantity={DecGigQuantity}
          Extras={productData ? productData.additionalFeatures : []}
          productData={productData}
        />
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
                <SubHeading>Compare Packages</SubHeading>
                {/* StartPackage */}

                <Grid container className="border">
                  <Grid
                    item
                    container
                    mobile={3}
                    className="border"
                    sx={{ backgroundColor: "#F5F5F5" }}
                  ></Grid>
                  <Grid
                    item
                    container
                    mobile={3}
                    className="border"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      className="border-bottom"
                      sx={{
                        backgroundColor: "#F5F5F5",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: " center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                      >
                        BASIC
                      </Typography>
                    </Box>
                    <Box className="border-bottom" sx={{ width: "100%" }}>
                      <Box className="border-bottom">
                        <InputField
                          placeholder="Enter Title"
                          styles={{
                            backgroundColor: "white",
                            mb: 1,
                            paddingInline: "",
                          }}
                          label="BasicPlanTitle"
                          value={basicPlan.name}
                        />
                      </Box>

                      <GigDiscription
                        styles={{
                          backgroundColor: "white",
                          mb: 1,
                        }}
                        value={basicPlan.description}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <InputField
                        styles={{
                          width: "100%",
                          backgroundColor: "white",
                        }}
                        placeholder="Delivery Days"
                        type="number"
                        min="0"
                        step="1"
                        value={basicPlan.delivery}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    container
                    mobile={3}
                    className="border"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      className="border-bottom"
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: " center",
                        backgroundColor: "#F5F5F5",
                        display: "flex",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                      >
                        STANDARD
                      </Typography>
                    </Box>
                    <Box className="border-bottom" sx={{ width: "100%" }}>
                      <Box className="border-bottom">
                        <InputField
                          placeholder="Enter Title"
                          styles={{
                            backgroundColor: "white",
                            mb: 1,
                            paddingInline: "",
                          }}
                          label="Package Title"
                          value={standardPlan.name}
                        />
                      </Box>

                      <GigDiscription
                        styles={{
                          backgroundColor: "white",
                          mb: 1,
                        }}
                        value={standardPlan.description}
                      />
                    </Box>

                    <Box sx={{ width: "100%", mt: 1 }}>
                      <InputField
                        styles={{
                          width: "100%",
                          backgroundColor: "white",
                        }}
                        placeholder="Delivery Days"
                        type="number"
                        value={standardPlan.delivery}
                        min="0"
                        step="1"
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    container
                    mobile={3}
                    className="border"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      className="border-bottom"
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        backgroundColor: "#F5F5F5",
                        alignItems: " center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                      >
                        PREMIUM
                      </Typography>
                    </Box>
                    <Box className="border-bottom" sx={{ width: "100%" }}>
                      <Box className="border-bottom">
                        <InputField
                          placeholder="Enter Title"
                          styles={{
                            backgroundColor: "white",
                            mb: 1,
                            paddingInline: "",
                          }}
                          label="Package Title"
                          value={premiumPlan.name}
                        />
                      </Box>

                      <GigDiscription
                        styles={{
                          backgroundColor: "white",
                          mb: 1,
                        }}
                        value={premiumPlan.description}
                      />
                    </Box>

                    <Box sx={{ width: "100%", mt: 1 }}>
                      <InputField
                        styles={{
                          width: "100%",
                          backgroundColor: "white",
                        }}
                        placeholder="Delivery Days"
                        type="number"
                        min="0"
                        step="1"
                        value={premiumPlan.delivery}
                      />
                    </Box>
                  </Grid>
                  {categoryFeatures.map((feature, i) => {
                    return (
                      <>
                        <Grid container mobile={12} sx={{ height: "50px" }}>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="flex-start"
                            mobile={3}
                            className="border"
                            sx={{ backgroundColor: "#F5F5F5" }}
                          >
                            <Typography variant="h6" sx={{ pl: 1 }}>
                              {feature.title}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="center"
                            mobile={3}
                            className="border border-bottom border-end"
                          >
                            {feature.quantityBased && (
                              <InputField
                                name={feature.title}
                                styles={{ width: "100%" }}
                                placeholder={`Enter ${feature.title}`}
                                value={
                                  basicPlan.features[
                                    i + subCategoryFeatures.length
                                  ].quantity
                                    ? basicPlan.features[
                                        i + subCategoryFeatures.length
                                      ].quantity
                                    : ""
                                }
                                type="number"
                                min="0"
                                step="1"
                              />
                            )}
                            {feature.quantityBased === false && (
                              <CheckBox
                                checked={
                                  basicPlan.features[
                                    i + subCategoryFeatures.length
                                  ].active
                                }
                              />
                            )}
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="center"
                            mobile={3}
                            className="border border-bottom border-end"
                          >
                            {feature.quantityBased && (
                              <InputField
                                styles={{ width: "100%" }}
                                value={
                                  standardPlan.features[
                                    i + subCategoryFeatures.length
                                  ].quantity
                                    ? standardPlan.features[
                                        i + subCategoryFeatures.length
                                      ].quantity
                                    : ""
                                }
                                placeholder={`Enter ${feature.title}`}
                                type="number"
                                min="0"
                                step="1"
                              />
                            )}
                            {feature.quantityBased === false && (
                              <CheckBox
                                checked={
                                  standardPlan.features[
                                    i + subCategoryFeatures.length
                                  ].active
                                }
                              />
                            )}
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="center"
                            mobile={3}
                            className="border border-top border-bottom"
                          >
                            {feature.quantityBased && (
                              <InputField
                                value={
                                  premiumPlan.features[
                                    i + subCategoryFeatures.length
                                  ].quantity
                                    ? premiumPlan.features[
                                        i + subCategoryFeatures.length
                                      ].quantity
                                    : ""
                                }
                                styles={{ width: "100%" }}
                                placeholder={`Enter ${feature.title}`}
                                type="number"
                                min="0"
                                step="1"
                              />
                            )}
                            {feature.quantityBased === false && (
                              <CheckBox
                                checked={
                                  premiumPlan.features[
                                    i + subCategoryFeatures.length
                                  ].active
                                }
                              />
                            )}
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  {subCategoryFeatures.map((feature, i) => {
                    return (
                      <>
                        <Grid
                          container
                          mobile={12}
                          sx={{ height: "50px" }}
                          // alignItems="center"
                          // justifyContent="center"
                        >
                          <Grid
                            item
                            container
                            mobile={3}
                            className="border"
                            alignItems="center"
                            justifyContent="flex-start"
                            sx={{ backgroundColor: "#F5F5F5" }}
                          >
                            <Typography variant="h6" sx={{ pl: 1 }}>
                              {feature.title}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="center"
                            mobile={3}
                            className="border border-end border-bottom"
                          >
                            {feature.quantityBased && (
                              <InputField
                                value={
                                  basicPlan.features[i].quantity === 0
                                    ? ""
                                    : basicPlan.features[i].quantity
                                }
                                styles={{ width: "100%" }}
                                placeholder={`Enter ${feature.title}`}
                                type="number"
                                min="0"
                                step="1"
                              />
                            )}
                            {feature.quantityBased === false && (
                              <CheckBox
                                checked={basicPlan.features[i].active}
                              />
                            )}
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="center"
                            mobile={3}
                            className="border border-end border-bottom"
                          >
                            {feature.quantityBased && (
                              <InputField
                                value={
                                  standardPlan.features[i].quantity
                                    ? standardPlan.features[i].quantity
                                    : ""
                                }
                                styles={{ width: "100%" }}
                                placeholder={`Enter ${feature.title}`}
                                type="number"
                                min="0"
                                step="1"
                              />
                            )}
                            {feature.quantityBased === false && (
                              <CheckBox
                                checked={standardPlan.features[i].active}
                              />
                            )}
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            justifyContent="center"
                            mobile={3}
                            className="border border-top border-bottom"
                          >
                            {feature.quantityBased && (
                              <InputField
                                value={
                                  premiumPlan.features[i].quantity
                                    ? premiumPlan.features[i].quantity
                                    : ""
                                }
                                styles={{ width: "100%" }}
                                placeholder={`Enter ${feature.title}`}
                                type="number"
                                min="0"
                                step="1"
                              />
                            )}
                            {feature.quantityBased === false && (
                              <CheckBox
                                checked={premiumPlan.features[i].active}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  <Grid container mobile={12} sx={{ height: "50px" }}>
                    <Grid
                      item
                      container
                      mobile={3}
                      className="border"
                      alignItems="center"
                      justifyContent="flex-start"
                      sx={{ backgroundColor: "#F5F5F5" }}
                    >
                      <Typography variant="h6" sx={{ pl: 1 }}>
                        Price
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="center"
                      mobile={3}
                      className="border border-end border-bottom"
                    >
                      <Grid item container direction="row" alignItems="center">
                        <InputField
                          styles={{
                            width: "90%",
                            backgroundColor: "white",
                          }}
                          placeholder="Enter Price"
                          type="number"
                          min="0"
                          step="1"
                          value={basicPlan.cost}
                        />
                        <AttachMoneyOutlined
                          sx={{
                            color: colors.textGreen,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="center"
                      mobile={3}
                      className="border border-end border-bottom"
                    >
                      <Grid item container direction="row" alignItems="center">
                        <InputField
                          styles={{
                            width: "90%",
                            backgroundColor: "white",
                          }}
                          placeholder="Enter Price"
                          type="number"
                          min="0"
                          step="1"
                          value={standardPlan.cost}
                        />
                        <AttachMoneyOutlined
                          sx={{
                            color: colors.textGreen,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="center"
                      mobile={3}
                      className="border border-top border-bottom"
                    >
                      <Grid item container direction="row" alignItems="center">
                        <InputField
                          styles={{
                            width: "90%",
                            backgroundColor: "white",
                          }}
                          placeholder="Enter Price"
                          type="number"
                          min="0"
                          step="1"
                          value={premiumPlan.cost}
                        />
                        <AttachMoneyOutlined
                          sx={{
                            color: colors.textGreen,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* End Package */}
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
      </ThemeProvider>
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

const CustomTextArea = styled.textarea`
  height: 60px;
  outline: none;
  border: 0px;
`;

const CustomInput = styled.input`
  outline: none;
  cursor: default;
  border: 0px;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus {
    color: transparent;
    text-shadow: 0px 0px 0px #000000;
  }
`;

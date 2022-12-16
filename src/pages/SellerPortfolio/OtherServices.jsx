import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { mobile } from "../../responsive";
import PortfolioCard from "../../components/PortfolioCard";
import { teamImg } from "../../assets";
import colors from "../../utils/colors";
import { requestMethod } from "../../requestMethod";
import { useEffect } from "react";
import { handleError } from "../../utils/helperFunctions";

function OtherServices({ seller }) {
  const ref = useRef();
  const GigRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const getProducts = async (id) => {
    const response = await requestMethod.get(`/product/byUserId/${id}`);
    return response.data;
  };

  useEffect(() => {
    setLoading(true);
    if (seller?._id) {
      // console.log(seller);
      getProducts(seller._id)
        .then((res) => {
          // console.log(res);
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log(err);
          handleError(err);
        });
    }
  }, [seller]);

  return (
    <BuyerListContainer>
      <ButtonContainer>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "2rem",
            color: "black",
            borderColor: "#0000009e",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "#0000009e",
            },
            marginRight: "1.5rem",
            fontSize: "1rem",
            padding: ".7rem 2rem",
            minWidth: "1rem",
            textTransform: "capitalize",
            minWidth: "1rem",
          }}
          onClick={() => scroll(-GigRef.current.offsetWidth)}
        >
          <ArrowBackIcon fontSize="medium" />
        </Button>
      </ButtonContainer>
      <BuyerContainer ref={ref}>
        {data.map((c, i) => (
          <div key={i} ref={GigRef}>
            <PortfolioCard
              style={{ marginRight: 0 }}
              key={c._id}
              hideProfileInfo={false}
              count={c}
              GigImage={c.images[0]}
              Avatar={c.owner._id.profilePic}
              SellerName={c.owner._id.name}
              SellerLevel={c.owner._id.badge}
              GigTitle={c.title}
              SellerRating={c.owner._id.seller.rating}
              GigReviewsTotal={c.owner._id.seller.reviews}
              GigStartPrice={c.cost}
              ownerId={c.owner._id._id}
              productId={c._id}
            />
          </div>
        ))}
      </BuyerContainer>
      <ButtonContainer>
        <Button
          variant="contained"
          sx={{
            borderRadius: "2rem",
            color: "white",
            marginLeft: "1.5rem",
            fontSize: "1rem",
            padding: ".7rem 2rem",
            minWidth: "1rem",
            background: " linear-gradient(130deg, #172f33, #43856b) border-box",
            textTransform: "capitalize",
          }}
          onClick={() => scroll(GigRef.current.offsetWidth)}
        >
          <ArrowForwardIcon fontSize="medium" />
        </Button>
      </ButtonContainer>
      <MobileButtonContainer>
        <Button
          variant="contained"
          sx={{
            borderRadius: "2rem",
            color: "white",
            marginLeft: "1.5rem",
            fontSize: "1rem",
            padding: ".7rem 2rem",
            minWidth: "1rem",
            background: ` linear-gradient(130deg, #172f33, ${colors.primaryGreen}) border-box`,
            marginTop: "5rem",
            textTransform: "capitalize",
          }}
          onClick={() => scroll(GigRef.current.offsetWidth)}
        >
          <ArrowForwardIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "2rem",
            color: "black",
            borderColor: "#0000009e",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "#0000009e",
            },
            marginLeft: "1.5rem",
            fontSize: "1rem",
            padding: ".7rem 2rem",
            minWidth: "1rem",
            textTransform: "capitalize",
            minWidth: "1rem",
            marginTop: "1rem",
          }}
          onClick={() => scroll(-GigRef.current.offsetWidth)}
        >
          <ArrowBackIcon fontSize="medium" />
        </Button>
      </MobileButtonContainer>
    </BuyerListContainer>
  );
}

export default OtherServices;

const BuyerListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  align-self: center;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const BuyerContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  overflow-x: scroll;
  scroll-snap-type: x proximity !important;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  scroll-behavior: smooth;
`;

const ButtonContainer = styled.div`
  ${mobile({ display: "none" })};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileButtonContainer = styled.div`
  ${mobile({ display: "flex" })};
  display: none;
  flex-direction: column;
  justify-content: center;
`;

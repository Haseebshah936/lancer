import { Button } from "@material-ui/core";
import React, { memo } from "react";
import styled from "styled-components";
import Review from "../ReviewComponent";
import colors from "../../utils/colors";
// import { reviews } from "../../utils/dummyData";

function Reviews({
  loadMore = false,
  showReplies = true,
  reviews = [],
  getMoreReviews,
}) {
  return (
    <ReviewContainer>
      {reviews.map((e, i) => (
        <Review
          key={i}
          reply={showReplies ? e?.reply : null}
          img={e.buyerId?.profilePic}
          rating={e.rating}
          text={e.comment}
          userImg={e.sellerId?.profilePic}
        />
      ))}
      {reviews.length > 9 && loadMore && (
        <CustomButton
          variant="contained"
          onClick={() => getMoreReviews(reviews.length)}
        >
          &nbsp;&nbsp;Load More Reviews
        </CustomButton>
      )}
    </ReviewContainer>
  );
}

export default memo(Reviews);

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomButton = styled.button`
  align-self: center;
  margin-top: 2rem !important;
  margin-bottom: 2.5rem !important;
  color: ${colors.white} !important;
  width: 50%;
  min-width: 20rem !important;
  font-size: 1.2rem !important;
  background-color: ${colors.textGreen} !important;
  padding-block: 1rem !important;
  text-transform: none !important;
  font-weight: bold !important;
  border: none !important;
`;

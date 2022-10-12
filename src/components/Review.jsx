import { StarRate } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../utils/colors";

function Review({
  rating = 5,
  img = "https://api.lorem.space/image/face?w=100&h=100&hash=qecd5c51",
  text = "Realy appreciate his work he is fast indeed",
  time,
}) {
  return (
    <Container>
      <ReviewImage src={img} />
      <ReviewSubContainer>
        <ReviewTextContainer>
          <ReviewText>{text}</ReviewText>
          <ReviewTime></ReviewTime>
        </ReviewTextContainer>
        <IconButton style={{ padding: "0px" }} disableRipple>
          <StarRate htmlColor={colors.gold} />
          <ButtonText style={{ fontWeight: "500" }}>
            &nbsp;{parseFloat(rating).toFixed(1)}
          </ButtonText>
        </IconButton>
      </ReviewSubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.lightGrey};
`;

const ReviewImage = styled.img`
  height: 4rem;
  width: 4rem;
`;

const ReviewSubContainer = styled.div`
  padding: 0rem 1rem;  
`;

const ReviewTextContainer = styled.div`
  display: flex;
`;

const ReviewText = styled.h4`
  font-size: 1.2rem;
`;

const ReviewTime = styled.p`
  font-size: 1.2rem;
`;

const ButtonText = styled.p`
  margin-block: 0.5rem;
  color: ${colors.black};
  font-size: 1.2rem;
`;

export default Review;

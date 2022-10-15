import { StarRate } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../utils/colors";

function Review({
  rating = 5,
  img = "https://api.lorem.space/image/face?w=100&h=100&hash=qecd5c51",
  text = "Realy appreciate his work he is fast indeed. Realy appreciate his work he is fast indeed",
  time,
  reply = "",
  userImg = "https://api.lorem.space/image/face?w=100&h=100&hash=qecd5c51",
}) {
  return (
    <Wrapper>
      <Container>
        <ReviewImage src={img} />
        <ReviewSubContainer>
          <ReviewTextContainer>
            <ReviewText>{text}</ReviewText>
            <ReviewTime></ReviewTime>
          </ReviewTextContainer>
          <CustomIconButton style={{ padding: "0px" }} disableRipple>
            <StarRate htmlColor={colors.gold} />
            <ButtonText style={{ fontWeight: "500" }}>
              &nbsp;{parseFloat(rating).toFixed(1)}
            </ButtonText>
          </CustomIconButton>
        </ReviewSubContainer>
      </Container>
      {reply && (
        <ReplyContainer>
          <ReviewImage src={userImg} />
          <ReviewSubContainer>
            <ReviewTextContainer>
              <ReviewText>{reply}</ReviewText>
              <ReviewTime></ReviewTime>
            </ReviewTextContainer>
            <CustomIconButton style={{ padding: "0px" }} disableRipple>
              <StarRate htmlColor={colors.gold} />
              <ButtonText style={{ fontWeight: "500" }}>
                &nbsp;{parseFloat(rating).toFixed(1)}
              </ButtonText>
            </CustomIconButton>
          </ReviewSubContainer>
        </ReplyContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${colors.lightGrey};
  padding-bottom: 1.5rem;
  margin-top: 1rem;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewImage = styled.img`
  height: 4rem;
  width: 4rem;
  align-self: flex-start;
`;

const ReviewSubContainer = styled.div`
  padding: 0rem 1rem;
`;

const ReviewTextContainer = styled.div`
  display: flex;
`;

const ReviewText = styled.h4`
  font-size: 1.2rem;
  margin-bottom: .2rem;
`;

const ReviewTime = styled.p`
  font-size: 1.2rem;
`;

const CustomIconButton = styled(IconButton)`
  padding-left: 0px!important; 
  padding-block: 0px!important; 
  align-items: center!important;
  display: flex!important;
`

const ButtonText = styled.p`
  color: ${colors.black};
  font-size: 1.2rem;
  margin-bottom: 0px!important;
  align-self: flex-end!important;
`;

const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15%;
  margin-top: .5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.lightGrey};
`;

export default Review;

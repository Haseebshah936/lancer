import { Favorite, FavoriteBorder, StarRate, Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';

function ProfileReviewInfo({rating, reviews, views, size=1.2, saved, handleSave= () => {}}) {
    return (
        <ReviewDetailsContainer>
              <CustomIconButton disableRipple>
                <StarRate htmlColor={colors.gold} />
                <ButtonText size={size} style={{ fontWeight: "bold" }}>
                  &nbsp;{parseFloat(rating).toFixed(1)}
                </ButtonText>
                <ButtonText size={size}>{"(" + reviews + ")"}</ButtonText>
              </CustomIconButton>
              <CustomIconButton disableRipple>
                <Visibility htmlColor={colors.gray} />
                <ButtonText size={size} style={{ fontWeight: "bold" }}>
                  &nbsp;{views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </ButtonText>
              </CustomIconButton>
              <CustomIconButton onClick={handleSave}>
                {saved?<Favorite htmlColor={colors.googleRed} />:<FavoriteBorder htmlColor={colors.googleRed} />}
                <ButtonText size={size}
                  style={{ fontWeight: "bold", color: colors.googleRed }}
                >
                  &nbsp;{saved?"Saved":"Save"}
                </ButtonText>
              </CustomIconButton>
            </ReviewDetailsContainer>
    );
}

export default ProfileReviewInfo;

const ReviewDetailsContainer = styled.div`
  display: flex;
`;

const CustomIconButton = styled(IconButton)`
  padding-left: 0px!important; 
  padding-top: 0px!important; 
`

const ButtonText = styled.p`
  margin-block: 0.5rem;
  color: ${colors.black};
  font-size: ${(props) => props.size}rem;
`;
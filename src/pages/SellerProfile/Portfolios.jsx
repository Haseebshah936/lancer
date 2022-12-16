import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { teamImg } from "../../assets";
import PortfolioCard from "../../components/PortfolioCard";
import { miniTablet } from "../../responsive";

function Portfolios({
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
}) {
  return (
    <Container>
      {data.map((c, i) => (
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
      ))}
    </Container>
  );
}

export default Portfolios;

const Container = styled.div`
  display: flex;
  ${miniTablet({ alignItems: "center", justifyContent: "center" })}
  flex-wrap: wrap;
  gap: 3rem;
`;

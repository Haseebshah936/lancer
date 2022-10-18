import Button from "@mui/material/Button";
import styled from "styled-components";
import Category from "../../components/Category";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";
import colors from "../../utils/colors";

function Categories(props) {
  const a = [1, 2, 3, 4, 5, 6];
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const categoryRef = useRef();

  return (
    <Container>
      <HeadingContainer>
        <Heading>Popular Categories</Heading>

        <TagLine>
          Join Our mailing list to stay in the loop of our newest feature
          releases, tips and tricks.
        </TagLine>
      </HeadingContainer>
      <CategoryListContainer>
        <CategoryContainer ref={ref}>
          {a.map((c) => (
            <div ref={categoryRef}>
              <Category count={c} />
            </div>
          ))}
        </CategoryContainer>
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
              background: ` linear-gradient(130deg, #172f33, ${colors.primaryGreen}) border-box`,
              marginTop: "5rem",
              textTransform: "capitalize",
            }}
            onClick={() => scroll(categoryRef.current.offsetWidth)}
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
            onClick={() => scroll(-categoryRef.current.offsetWidth)}
          >
            <ArrowBackIcon fontSize="medium" />
          </Button>
        </ButtonContainer>
      </CategoryListContainer>

      <Button
        variant="contained"
        sx={{
          borderRadius: "2rem",
          color: "white",
          marginLeft: "1.5rem",
          fontSize: "1rem",
          padding: "1rem 2rem",
          minWidth: "1rem",
          background: ` linear-gradient(130deg, #172f33, ${colors.primaryGreen}) border-box`,
          marginTop: "4rem",
          textTransform: "capitalize",
        }}
      >
        View All
      </Button>
    </Container>
  );
}

export default Categories;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 7%;
  align-items: center;
  margin-top: 10rem;
`;

const HeadingContainer = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;
const Heading = styled.h2`
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TagLine = styled.p`
  position: absolute;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  align-self: center;
  top: 5;
  line-height: 2rem;
`;

const CategoryListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 95%;
  align-self: center;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  scroll-behavior: smooth;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

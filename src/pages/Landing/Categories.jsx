import Button from "@mui/material/Button";
import styled from "styled-components";
import Category from "../../components/Category";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";
import colors from "../../utils/colors";

function Categories(props) {
  const a = [
    {
      name: "App Development",
      url: "https://img.freepik.com/free-vector/app-development-concept-with-programming-languages_23-2148688949.jpg?w=1380&t=st=1675272702~exp=1675273302~hmac=5571bcff6c5ca5e1fd81a6e0f3d9556af5e2e5a37432f9617bf8f479c3dad858",
    },
    {
      name: "Web Development",
      url: "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?w=1380&t=st=1675271789~exp=1675272389~hmac=394b214a4fd6d0cf218a64b002536e1b78f616ef4d92d92f1716b0a4a14c5058",
    },
    {
      name: "Search Engine Optimization",
      url: "https://img.freepik.com/free-vector/seo-concept-illustration_114360-5576.jpg?w=1380&t=st=1675272555~exp=1675273155~hmac=268d45731858a629e4d8630550f3ecb826eb1e21accbbd9b227a3097b649eab3",
    },
    {
      name: "Social Media Marketing",
      url: "https://img.freepik.com/free-vector/mobile-marketing-concept-illustration_114360-1478.jpg?w=1380&t=st=1675272349~exp=1675272949~hmac=b22d47c03fe037f7727733a64028e0b570f3ec7b1e0e64ec01a4711f67c1a8ff",
    },
    {
      name: "Video & Animation",
      url: "https://img.freepik.com/free-vector/influencer-recording-new-video_23-2148527130.jpg?w=2000&t=st=1675273177~exp=1675273777~hmac=09d7852adf7b62f67516350dc0d11b8c2fa0654e68bf8bba0f2e138b9a453317",
    },
  ];
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
          {a.map((c, i) => (
            <div key={i} ref={categoryRef}>
              <Category name={c.name} url={c.url} />
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

      {/* <Button
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
      </Button> */}
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

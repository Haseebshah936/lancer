import { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { miniMobile, miniPc, miniTablet, mobile, pc, tablet } from "../../responsive";
import colors from "../../utils/colors";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Gallery({ items = [] }) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const categoryRef = useRef();
 

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  

  useEffect(() => {
    const videos = [];
    const images = [];
    items.forEach((e) => {
      e.type === "video" ? videos.push(e) : images.push(e);
    });

    setImages(images);
    setVideos(videos);
    
  }, []);

  return (

    <GalleryContainer>
      <CarouselNew indicators={false} activeIndex={index} onSelect={handleSelect}  interval={60000000}>
        {images.map((e,i) => {
          return (
            <Carousel.Item id={i}>
              <Image src={e?.url} />
            </Carousel.Item>
          );
        })}
        {videos.map((e, i) => {
          return (
            <Carousel.Item id={i+images.length}>
              <Video controls>
                <source
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </Video>
            </Carousel.Item>
          );
        })}
      </CarouselNew>

      <IndicatorContainer>
        <Indicator ref={ref}>
        {
          images.map((e,i) => {
            return <IndicatorImage ref={categoryRef} className={index === i ? "active": ""} id={i} onClick={() => {
              setIndex(i)
            }} src={e.thumbnail}/>
          })
        }
        {
          videos.map((e,i) => {
            return <IndicatorImage ref={categoryRef} className={index === i+images.length ? "active": ""} onClick={() => {
              setIndex(i+images.length)
            }} id={i+images.length} src={e.thumbnail}/>
          })
        }
        </Indicator>
        <ButtonContainer>
          <Button
            variant="contained"
            sx={{
              borderRadius: "2rem",
              color: "white",
              marginLeft: "1rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              background: ` linear-gradient(130deg, #172f33, ${colors.primaryGreen}) border-box`,
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
              marginLeft: "1rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              textTransform: "capitalize",
              minWidth: "1rem",
              marginTop: "1rem"
            }}
            onClick={() => scroll(-categoryRef.current.offsetWidth)}
          >
            <ArrowBackIcon fontSize="medium" />
          </Button>
        </ButtonContainer>
      </IndicatorContainer>

    </GalleryContainer>
  );
}

export default Gallery;

const GalleryContainer = styled.div`
  width: 100%;
`

const CarouselNew = styled(Carousel)`
    
  .carousel-control-prev-icon{
    width: 4rem;
    height: 4rem;
  }
  .carousel-control-next-icon{
    width: 4rem;
    height: 4rem;
  }

  .carousel-control-next, .carousel-control-prev{
    height: 50%;
    top:25%
  }
`;

const Video = styled.video`
    width: 100%;
    object-fit: cover;
    height: 50rem;
    ${pc({height: "45rem"})}
    ${miniPc({height: "40rem"})};
    ${tablet({height: "35rem"})};
    ${miniTablet({height: "40rem"})};
    ${mobile({height: "30rem"})};
    ${miniMobile({height: "20rem"})};
`

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    height: 50rem;
    ${pc({height: "45rem"})}
    ${miniPc({height: "40rem"})};
    ${tablet({height: "35rem"})};
    ${miniTablet({height: "40rem"})};
    ${mobile({height: "30rem"})};
    ${miniMobile({height: "20rem"})};
`

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  box-sizing: border-box;
  align-items: center;
`;

const Indicator = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  scroll-behavior: smooth;
  align-self: flex-end;
`;

const IndicatorImage = styled.img`
  width: 12rem;
  height: 7rem;
  cursor: pointer;
  margin-right: 1rem;
  &.active{
    border: .5rem solid ${colors.becomePartnerGreen};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 1.5rem;
`;

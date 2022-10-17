import { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { miniMobile, miniPc, miniTablet, mobile, pc, tablet } from "../../../responsive";
import colors from "../../../utils/colors";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import usePrevious from "../../../Hooks/usePrevious";

function Gallery({
  items = [],
  miniScroller = true,
  carouselIndicator = false,
  scrollInterval = 600000000,
  style,
  miniScrollBorderColor = colors.becomePartnerGreen,
  leftButtonVarient,
  leftButton=(props) => <LeftButton {...props} />,
  leftButtonStyle,
  rightButtonVarient,
  rightButton= (props) => <RightButton {...props}/>,
  rightButtonStyle,
}) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const prevIndex = usePrevious(index);
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const categoryRef = useRef();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    scroll(categoryRef.current?.offsetWidth * (index - prevIndex));
  }, [index]);

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
    <GalleryContainer style={style}>
      <CarouselNew
        indicators={carouselIndicator}
        activeIndex={index}
        onSelect={handleSelect}
        interval={scrollInterval}
        
      >
        {images.map((e, i) => {
          return (
            <Carousel.Item id={i}>
              <Image  src={e?.url} alt={e?.alt ? e?.alt : ""} />
            </Carousel.Item>
          );
        })}
        {videos.map((e, i) => {
          return (
            <Carousel.Item id={i + images.length}>
              <Video  controls>
                <source
                  src={e?.url}
                  type={e?.videoType ? e?.videoType : "video/mp4"}
                />
              </Video>
            </Carousel.Item>
          );
        })}
      </CarouselNew>

      {miniScroller && (
        <IndicatorContainer >
          <Indicator  ref={ref}>
            {images.map((e, i) => {
              return (
                <IndicatorImage
                  
                  borderColor={miniScrollBorderColor}
                  ref={categoryRef}
                  className={index === i ? "active" : ""}
                  id={i}
                  onClick={() => {
                    setIndex(i);
                  }}
                  src={e?.thumbnail}
                  alt={e?.alt ? e?.alt : ""}
                />
              );
            })}
            {videos.map((e, i) => {
              return (
                <IndicatorImage
                  
                  borderColor={miniScrollBorderColor}
                  ref={categoryRef}
                  className={index === i + images.length ? "active" : ""}
                  onClick={() => {
                    setIndex(i + images.length);
                  }}
                  id={i + images.length}
                  src={e?.thumbnail}
                  alt={e?.alt ? e?.alt : ""}
                />
              );
            })}
          </Indicator>
          <ButtonContainer >
            {leftButton({onClick:() => scroll(-categoryRef.current.offsetWidth), varient: leftButtonVarient,
            style: leftButtonStyle})}
            {rightButton({onClick:() => scroll(categoryRef.current.offsetWidth),
              varient: rightButtonVarient, style: rightButtonStyle})}
          </ButtonContainer>
        </IndicatorContainer>
      )}
    </GalleryContainer>
  );
}

export default Gallery;

const GalleryContainer = styled.div`
  width: 100%;
`;

const CarouselNew = styled(Carousel)`
  .carousel-control-prev-icon {
    width: 4rem;
    height: 4rem;
  }
  .carousel-control-next-icon {
    width: 4rem;
    height: 4rem;
  }

  .carousel-control-next,
  .carousel-control-prev {
    height: 50%;
    top: 25%;
  }
`;

const Video = styled.video`
  width: 100%;
  object-fit: cover;
  height: 50rem;
  background-color: ${colors.black};
  ${pc({ height: "45rem" })};
  ${miniPc({ height: "40rem" })};
  ${tablet({ height: "35rem" })};
  ${miniTablet({ height: "40rem" })};
  ${mobile({ height: "30rem" })};
  ${miniMobile({ height: "20rem" })};
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 50rem;
  background-color: ${colors.black};
  ${pc({ height: "45rem" })};
  ${miniPc({ height: "40rem" })};
  ${tablet({ height: "35rem" })};
  ${miniTablet({ height: "40rem" })};
  ${mobile({ height: "30rem" })};
  ${miniMobile({ height: "20rem" })};
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
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
  &.active {
    border: .4rem solid ${(props) => props.borderColor};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 1.5rem;
`;

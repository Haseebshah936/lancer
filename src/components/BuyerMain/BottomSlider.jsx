import React from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { social } from "../../assets";
import { css } from "styled-components";
import colors from "../../utils/colors";

const BottomSlider = () => {
  return (
    <div>
      <Container>
        <Carousel style={{ height: "200px", width: "100%" }}>
          <Carousel.Item>
            <img className="d-block w-100" src={social} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={social} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={social} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default BottomSlider;

const Container = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  margin-top: 10rem;
  margin-inline: 7%;
  position: relative;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px -1px 13px -1px rgba(161, 161, 161, 0.75);
  -webkit-box-shadow: 0px -1px 13px -1px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 0px -1px 13px -1px rgba(161, 161, 161, 0.75);
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

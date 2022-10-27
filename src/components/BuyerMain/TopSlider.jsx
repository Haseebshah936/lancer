import React from "react";
import styled from "styled-components";
import CustomFilledButton from "../CustomFilledButton";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { social } from "../../assets";

const TopSlider = () => {
  return (
    <Container>
      <FirstSection>
        <h2>Hi Noob</h2>
        <p style={{ marginTop: "5px" }}>
          Get matched with sellers <br /> for your project
        </p>
        <CustomFilledButton
          title={"Post a Request"}
          style={{ margin: "5px 0px 0px 0px" }}
        ></CustomFilledButton>
      </FirstSection>
      <SecondSection>
        <Carousel style={{ height: "200px" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={social}
              alt="First slide"
              style={{ objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h3>APP DEVELOPMENT</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={social}
              alt="Second slide"
              style={{ objectFit: "contain" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              // style={{ sizes: "contain" }}
              src={social}
              alt="Third slide"
              style={{ objectFit: "contain" }}
            />
          </Carousel.Item>
        </Carousel>
      </SecondSection>
    </Container>
  );
};

export default TopSlider;

const Container = styled.div`
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 20rem;
  margin-inline: 7%;
  position: relative;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px -1px 13px -1px rgba(161, 161, 161, 0.75);
  -webkit-box-shadow: 0px -1px 13px -1px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 0px -1px 13px -1px rgba(161, 161, 161, 0.75);
`;

const FirstSection = styled.div`
  display: flex;
  height: 100%;
  width: 45%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #ffffff;
`;

const SecondSection = styled.div`
  width: 55%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */
  clip-path: polygon(25% 0, 100% 0%, 100% 100%, 0% 100%);
`;

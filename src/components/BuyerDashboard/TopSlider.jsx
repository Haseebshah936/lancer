import React from "react";
import styled from "styled-components";
import CustomFilledButton from "../CustomFilledButton";

// container;
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
      <Line></Line>
      <SecondSection>
        {" "}
        <h4>asd</h4>
      </SecondSection>
    </Container>
  );
};

export default TopSlider;

const Container = styled.div`
  /* padding-inline: 7%; */
  /* width: 100%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 200px;
  margin-top: 1rem;
  margin-inline: 7%;
  position: relative;
  border-radius: 5px;
  background-color: #605d5df1;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 2%;
`;

const Line = styled.div`
  width: 1000px;
  transform: rotate(-45deg);
  transform-origin: center center;
  border-top: 1px solid white;
  position: absolute;
  box-sizing: border-box;
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

const SecondSection = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

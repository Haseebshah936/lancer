import React from "react";
import MPGigSlider from "../components/BuyerMain/MPGigSlider";
import Header from "../components/BuyerMain/Header";
import TopSlider from "../components/BuyerMain/TopSlider";
import GigsYML from "../components/BuyerMain/GigsYML";
import GigsRPS from "../components/BuyerMain/GigsRPS";
import Footer from "../components/Footer";
import BottomSlider from "../components/BuyerMain/BottomSlider";
import SearchResults from "./SearchResults";

const BuyerMain = () => {
  return (
    <>
      <Header />
      <TopSlider />
      <MPGigSlider />
      <GigsYML />
      <GigsRPS />
      <BottomSlider />
      <Footer />
    </>
  );
};

export default BuyerMain;

import React from "react";
import MPGigSlider from "../components/BuyerDashboard/MPGigSlider";
import Header from "../components/BuyerDashboard/Header";
import TopSlider from "../components/BuyerDashboard/TopSlider";
import GigsYML from "../components/BuyerDashboard/GigsYML";
import GigsRPS from "../components/BuyerDashboard/GigsRPS";
import Footer from "../components/Footer";
import BottomSlider from "../components/BuyerDashboard/BottomSlider";

const BuyerDashboard = () => {
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

export default BuyerDashboard;

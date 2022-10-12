import React from "react";
import MPGigSlider from "../components/BuyerDashboard/MPGigSlider";
import Header from "../components/BuyerDashboard/Header";
import TopSlider from "../components/BuyerDashboard/TopSlider";
import GigsYML from "../components/BuyerDashboard/GigsYML";
import GigsRPS from "../components/BuyerDashboard/GigsRPS";

const BuyerDashboard = () => {
  return (
    <div>
      <Header></Header>
      <TopSlider></TopSlider>
      <MPGigSlider></MPGigSlider>
      <GigsYML></GigsYML>
      <GigsRPS></GigsRPS>
    </div>
  );
};

export default BuyerDashboard;

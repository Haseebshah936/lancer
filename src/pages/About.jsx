import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Greetings from "../components/Greetings";
import BecomePartner from "../components/BecomePartner";
import OurProfessionals from "../components/OurProfessionals";

function About(props) {
  return (
    <>
      <Header />
      <Greetings />
      <BecomePartner />
      {/* <OurProfessionals /> */}
      <Footer />
    </>
  );
}

export default About;

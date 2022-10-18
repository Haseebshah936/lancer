import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Greetings from "./Greetings";
import BecomePartner from "./BecomePartner";
import OurProfessionals from "./OurProfessionals";

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

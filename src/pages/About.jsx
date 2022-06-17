import React from "react";
import Header from "../compontents/Header";
import Footer from "../compontents/Footer";
import Greetings from "../compontents/Greetings";
import BecomePartner from "../compontents/BecomePartner";
import OurProfessionals from "../compontents/OurProfessionals";

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

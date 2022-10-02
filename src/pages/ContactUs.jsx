/* eslint-disable jsx-a11y/iframe-has-title */
import {
  HeadsetMicOutlined,
  Language,
  MailOutline,
  PublicOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import CustomFilledButton from "../components/CustomFilledButton";
import DetailsCard from "../components/DetailsCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { miniTablet, mobile } from "../responsive";
import colors from "../utils/colors";

function ContactUs(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const sx = {
    height: "2.5rem",
    width: "2.5rem",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }


  return (
    <Container>
      <Header />
      <DetailsCardContainer>
        <DetailsCard Icon={<PublicOutlined sx={sx} />} />
        <DetailsCard
          heading="infolancer@gmail.com"
          subheading="Official Mail"
          Icon={<MailOutline sx={sx} />}
          backgroundColor={{
            background: "rgb(255,129,143)",
            background:
              "linear-gradient(27deg, rgba(255,129,143,1) 34%, rgba(254,169,115,1) 100%)",
          }}
        />
        <DetailsCard
          heading="+923404010309"
          subheading="Official Phone"
          Icon={<HeadsetMicOutlined sx={sx} />}
          backgroundColor={{
            background: "rgb(100,104,242)",
            // eslint-disable-next-line no-dupe-keys
            background:
              "linear-gradient(27deg, rgba(100,104,242,1) 34%, rgba(195,104,255,1) 100%)",
          }}
        />
      </DetailsCardContainer>
      <SubContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Get In Touch</Heading>
          <NameContainer>
            <Input style={{width: "48%"}} name="firstName" onChange={handleChange} value={formData.firstName} placeholder="First Name" />
            <Input style={{width: "48%"}} name="lastName" onChange={handleChange} value={formData.lastName} placeholder="Last Name" />
          </NameContainer>
          <Input type={"email"} value={formData.email} name="email" onChange={handleChange} placeholder="Email address" />
          <Input value={formData.subject} name="subject" onChange={handleChange} placeholder="Subject" />
          <Input value={formData.message} name="message" onChange={handleChange} placeholder="Your Message" />
          <CustomFilledButton title={"Send Message"} style={{
            alignSelf: "center",
          }}/>
        </Form>
        <Iframe
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=COMSTAS&amp;t=p&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </SubContainer>
      <Footer />
    </Container>
  );
}

export default ContactUs;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const DetailsCardContainer = styled.div`
  display: flex;
  justify-content: center;
  ${miniTablet({ flexDirection: "column" })}
  margin-top: 5rem;
  padding-inline: 7%;
`;

const SubContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 7rem;
  padding-inline: 7%;
  margin-bottom: 7rem;
  ${miniTablet({ flexDirection: "column", marginTop: "1rem" })}
`;

const Form = styled.form`
  background-color: ${colors.white};
  box-shadow: 0.5px 0.5px 8px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0.5px 0.5px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  padding: 5rem 4rem;
  width: 38rem;
  max-width: 38rem;
  height: 48rem;
  max-height: 48rem;
  margin-right: 3rem;
  ${miniTablet({ width: "32rem" ,marginBottom: "2rem", marginRight: "0rem" })}
`;

const Heading = styled.h3`
  color: ${colors.black};
  font-size: 2rem;
  font-weight: 600;
  align-self: center;
  margin-bottom: 5rem;
`;
const Input = styled.input`
  margin-bottom: 2rem;
  border: 0rem;
  border-bottom: .5px solid rgba(0,0,0, 0.1);
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 3.5rem;
  ::placeholder {
    color: rgba(0,0,0, 0.7);
  }
  :focus {
    outline: none;
  }
`;

const NameContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: space-between;
`;

const Iframe = styled.iframe`
  width: 38rem;
  max-width: 38rem;
  height: 48rem;
  border: 0;
  background-color: ${colors.white};
  box-shadow: 0.5px 0.5px 8px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0.5px 0.5px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2%;
  ${miniTablet({ width: "32rem" })}
`
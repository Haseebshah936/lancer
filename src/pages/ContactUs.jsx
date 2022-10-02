/* eslint-disable jsx-a11y/iframe-has-title */
import {
  HeadsetMicOutlined,
  Language,
  MailOutline,
  PublicOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import DetailsCard from "../components/DetailsCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { miniTablet, mobile } from "../responsive";
import colors from "../utils/colors";

function ContactUs(props) {
  const sx = {
    height: "2.5rem",
    width: "2.5rem",
  };
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
        <Form>
          <Heading>Get In Touch</Heading>
          <NameContainer>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </NameContainer>
          <Input placeholder="Email address" />
          <Input placeholder="Subject" />
          <Input placeholder="Your Message" />
        </Form>
        <iframe
          width="560"
          height="315"
          frameborder="0"
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
  padding-inline: 7%;
  ${miniTablet({ flexDirection: "column" })}
  margin-top: 7rem;

`;

const SubContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 7rem;
`;

const Form = styled.form`
  background-color: ${colors.white};
  box-shadow: 0.5px 0.5px 8px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0.5px 0.5px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Heading = styled.h3`
  color: ${colors.black};
  font-size: 2rem;
  font-weight: 500;
  align-self: center;
`;
const Input = styled.input`
  margin-top: 2rem;
  border: 0rem;
  border-bottom: 1px solid rgba(0,0,0, 0.1);
  margin-right: 1rem;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 3.5rem;
  ::placeholder {
    color: rgba(0,0,0, 0.7);
  }
`;

const NameContainer = styled.div`
  display: flex;
`;

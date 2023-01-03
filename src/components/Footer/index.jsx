import {
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { NavLink } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

function Footer(props) {
  return (
    <Container>
      <Left>
        <Logo>Lancer</Logo>
        <Desc>
          Our freelance marketplace connects talented professionals with
          businesses and individuals looking for their expertise. Whether you're
          a graphic designer, writer, or developer, you can find opportunities
          to showcase your skills and grow your career. Our platform is easy to
          use, and we offer a range of tools to help you find the perfect fit
          for your talent and experience. Whether you're just starting out or an
          experienced professional, we welcome you to join our community and
          take control of your working life.
        </Desc>
        <SocialContainer>
          <SocialIcon
            href="https://www.facebook.com/campaign/landing.php?campaign_id=825696414251398&keyword=WXbGPmop5DEaW5M0Gy2RMGoo4DMKbMZ3ES2SMhQvmjIcL5sxGi%2BXNBgthGxKecdxEVnDYEl9zWxHQPVmTn7Scwp80GAfLZ8yFC2XOhQtlzP%2BUAAAACwfogM%3D&extra_2=PK&placement=100&creative=bookmark"
            color="3178F1"
          >
            <FacebookRoundedIcon color="white" htmlColor="white" />
          </SocialIcon>
          <SocialIcon href="https://www.instagram.com/" color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon href="https://twitter.com/@TechTrop" color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon href="https://www.pinterest.com/" color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <NavLink to="/home">Home</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/about">About</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/contactus">Contact&nbsp;Us</NavLink>
          </ListItem>
          {/* <ListItem>
            <NavLink to="/howitwork">How&nbsp;it&nbsp;Works</NavLink>
          </ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "1rem", fontSize: "2rem" }} />
          25 COMSATS LAHORE
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "1rem", fontSize: "2rem" }} />
          +923404010309
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "1rem", fontSize: "2rem" }} />
          infolancer@gmail.com
        </ContactItem>
        <img
          src="https://res.cloudinary.com/dj46ttbl8/image/upload/v1655318185/lancer/hd-visa-mastercard-paypal-payment-methods-logos-png-21635415866zngy8aj06k-removebg-preview_acqk7w.png"
          alt="Payment options"
        />
      </Right>
    </Container>
  );
}

export default Footer;
const Container = styled.div`
  display: flex;
  background-color: black;
  justify-content: space-evenly;
  margin-top: 10rem;
  ${mobile({ marginTop: "0rem", flexDirection: "column" })}
  color: white;
  width: 100%;
  padding-inline: 7%;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 2rem 0rem;
  text-align: justify;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.a`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const Center = styled.div`
  flex: 0.5;
  padding: 2rem;
  ${mobile({
    display: "none",
  })}
`;
const Title = styled.h3`
  margin-bottom: 3rem;
  font-size: 1.6rem;
`;
const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  a {
    text-decoration: none;
    color: #ffffff;
    margin-block: 1rem;
    width: 10rem;
    font-size: 1.2rem;
  }
  a:hover {
    color: #7d7d7d;
  }
  a.active {
    color: #ffd900;
  }
`;
const ListItem = styled.li`
  width: 100%;
  margin-bottom: 0.8rem;
  cursor: pointer;
`;
const Right = styled.div`
  padding: 2rem;
  flex: 1;
  img {
    width: 70%;
    max-width: 25rem;
  }
`;
const ContactItem = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
`;

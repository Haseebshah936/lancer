import {
  FacebookRounded,
  FavoriteBorderOutlined,
  Google,
  SearchOutlined,
  ShoppingCartOutlined,
  Twitter,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import styled from "styled-components";

function ProfessionalProfile({ item }) {
  return (
    <Container style={{ marginLeft: item.id == 1 ? "0rem" : ".5rem" }}>
      <Image
        src={
          "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655447061/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview__1_-removebg-preview_usk3cd.png"
        }
        alt={"haseeb"}
      />
      <Info>
        <Icon>
          <FacebookRounded style={{ fontSize: "1.5rem" }} htmlColor="#3178F1" />
        </Icon>
        <Icon>
          <Google
            style={{ fontSize: "1.5rem" }}
            htmlColor=" rgba(229,61,55,1) "
          />
        </Icon>
        <Icon>
          <Twitter style={{ fontSize: "1.5rem" }} htmlColor="#55ACEE" />
        </Icon>
      </Info>
    </Container>
  );
}

export default ProfessionalProfile;
const Info = styled.div`
  opacity: 0;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 3;
`;
const Container = styled.div`
  flex: 1;
  margin: 0.5rem;
  margin-right: 0rem;
  max-width: 22rem;
  min-width: 22rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;
  transition: all 0.5s ease;
  &:hover ${Info} {
    opacity: 1;
  }
  cursor: pointer;
  background-color: #cacdce;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  z-index: 2;
  padding-top: 2rem;
`;

const Icon = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  background-color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 1rem;
  transition: all 0.2s ease;
  color: black;
  &:hover {
    transform: scale(1.1);
    background-color: #e9f5f5;
    color: tomato;
  }
  cursor: pointer;
`;

import { Google } from "@mui/icons-material";
import styled from "styled-components";

import colors from "../utils/colors";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { handleError } from "../utils/helperFunctions";
import { Button } from "@mui/material";
import { requestMethod } from "../requestMethod";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Meeting1(props) {
  const googleAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post("http://localhost:3003/api/meeting", {
          code,
        });
        return response;
      } catch (error) {
        handleError(error);
      }
    },
    redirect_uri: "http://localhost:3000/home",
  });

  return (
    <Container>
      <SocialIcon
        onClick={async () => {
          console.log("clicked", googleAuth());
        }}
        c={colors.googleRed}
      >
        <Google htmlColor={colors.googleRed} />
      </SocialIcon>
    </Container>
  );
}

export default Meeting1;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5% 15% 3% 15%;
  @media (max-width: 450px) {
    padding: 0 0%;
  }
`;
const SocialIcon = styled(Button)`
  align-self: center;
  margin-right: 1.5rem !important;
  padding: 1rem 2rem !important;
  cursor: pointer;
  margin-block: 0.5rem !important;
  opacity: 0.8;
  margin-top: 1rem !important;
  border-radius: 50px !important;
  color: black !important;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 2px solid transparent;
    background: ${(props) => props.c};
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  &:hover {
    opacity: 1.5;
    background-color: #fff !important;
  }
`;

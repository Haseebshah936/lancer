import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import {
  FacebookTwoTone,
  Google,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import colors from "../utils/colors";

function Login({ toggleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!(email === "" || password === "")) {
    //   const auth = getAuth(firebaseApp);
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //       if (!user.emailVerified) {
    //         sendEmailVerification(auth.currentUser).then(() => {
    //           alert(
    //             "A verification link was sent to you Please verify your Email"
    //           );
    //         });
    //         setLogin(false);
    //       } else {
    //         setLogin(user);
    //         setLoaded(false);
    //       }
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       alert(errorCode.substring(5, errorCode.length).replaceAll("-", " "));
    //     });
    // }
  };

  return (
    <Wrap>
      <ClickAwayListener onClickAway={toggleClose}>
        <Form onSubmit={handleSubmit}>
          <Heading>Login</Heading>
          <Input
            type="email"
            name="email"
            onChange={(text) => setEmail(text.target.value)}
            placeholder="Enter your Email"
            autoFocus={true}
          />
          <Input
            type="password"
            name="password"
            className="box"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Btn type={"submit"}>
            <BtnText>Login</BtnText>
          </Btn>
          <SocialContainer>
            <SocialIcon c={colors.twitterBlue}>
              <Twitter htmlColor={colors.twitterBlue} />
            </SocialIcon>
            <SocialIcon c={colors.facebookBlue}>
              <FacebookTwoTone htmlColor={colors.facebookBlue} />
            </SocialIcon>
            <SocialIcon c={colors.googleRed}>
              <Google htmlColor={colors.googleRed} />
            </SocialIcon>
          </SocialContainer>
          <Container>
            <Link color="black" to="/signup">
              Register Now
            </Link>
            <Link color="black" to="/forgotPassword">
              Forgot Password
            </Link>
          </Container>
        </Form>
      </ClickAwayListener>
    </Wrap>
  );
}

export default Login;

const Wrap = styled.div`
  min-height: 100vh !important;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  margin: 2rem;
  padding: 4rem 3rem;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 38rem;
  height: 48rem;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5rem 1rem;
  margin-block: 1rem !important;
  font-size: 1.4rem;
  margin: 0.6rem 0;
  border: 0.2rem solid rgba(0, 0, 0, 0.26);
  text-transform: none;
  outline: none;
  border-radius: 2.5rem;
  :focus {
    border: 0.2rem solid ${colors.primaryGreen};
  }
  ::placeholder {
    color: rgba(0,0,0, 0.7);
  }
`;

const Heading = styled.h2`
  font-size: 3rem;
  color: #020202;
  align-self: center;
  margin-block: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Btn = styled(Button)`
  align-self: center;
  padding: 1rem 2rem !important;
  cursor: pointer;
  margin-block: 1rem !important;
  opacity: 0.6;
  margin-top: 2.5rem;
  border-radius: 50px !important;
  width: 70%;
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
    background: linear-gradient(45deg, #050505, ${colors.borderGreen}) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  &:hover {
    opacity: 1;
    background-color: #fff !important;
  }
`;

const BtnText = styled.div`
  font-size: 1.5rem;
  text-transform: capitalize;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SocialIcon = styled(Button)`
  align-self: center;
  padding: 1rem 2rem !important;
  cursor: pointer;
  margin-block: 1rem !important;
  opacity: 0.8;
  margin-top: 2.5rem;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
  align-items: center;
  a {
    color: black;
    font-size: 1.2rem;
    margin: 0.3rem 0;
    text-decoration: underline;
  }
  a:visited {
    color: black;
  }
`;

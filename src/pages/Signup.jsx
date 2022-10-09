import { FacebookTwoTone, Google, Twitter } from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useCustomContext } from "../Hooks/useCustomContext";
import colors from "../utils/colors";
import { useGoogleLogin } from "@react-oauth/google";
import * as joi from "joi";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import * as queryString from "query-string";
import { signup } from "../assets";

const schema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(8).required(),
});

function Signup(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const { setOpen } = useCustomContext();

  useEffect(() => {
    setOpen(false);
  }, []);

  const googleAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      const tokens = await axios.post("http://localhost:3003/api/auth/google", {
        // http://localhost:3001/auth/google backend that will exchange the code
        code,
      });

      console.log(tokens);
    },
    redirect_uri: "http://localhost:3000/home",
  });

  // const facebookAuth = async () => {
  const stringifiedParams = queryString.stringify({
    client_id: "881136853269267",
    redirect_uri: "https://localhost:3000",
    scope: ["email", "user_friends", "public_profile"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const facebookLoginUrl = `https://www.facebook.com/v15.0/dialog/oauth?${stringifiedParams}`;
  // }

  const responseFacebook = async (res) => {
    console.log(res)
    const {accessToken,id} = res;
    const response = await axios.post("http://localhost:3003/api/auth/facebook/", {
      id,
      accessToken
    })
    console.log("Response From facebook", response);
  }

  const handleChange = ({ target }) => {
    const newData = {
      ...user,
    };
    newData[target.name] = target.value;
    setUser(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(user, { abortEarly: false });
    if (error) {
      const { details } = error;
      console.log(details);
      details.map((e) => {
        console.log(e.path[0], e.message);
      });
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3003/api/auth/signup",
          {
            ...user,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <SubContainer>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "50%",
              color: "black",
              borderColor: "#ffffff",
              marginLeft: "1.5rem",
              fontSize: "1rem",
              padding: "1rem 1rem",
              minWidth: "1rem",
              textTransform: "capitalize",
              minWidth: "1rem",
              alignSelf: "flex-start",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "#ffffff",
              },
            }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon fontSize="large" />
          </Button>
          <Form onSubmit={handleSubmit}>
            <Heading>Sign Up to Lancer</Heading>
            <SocialContainer>
              <SocialIcon c={colors.twitterBlue}>
                <Twitter htmlColor={colors.twitterBlue} />
              </SocialIcon>
              {/* <a href={facebookLoginUrl}> */}
                <FacebookLogin 
                appId="881136853269267"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => <SocialIcon onClick={renderProps.onClick} c={colors.facebookBlue}>
                <FacebookTwoTone htmlColor={colors.facebookBlue} />
              </SocialIcon>}
                />
                 {/* <SocialIcon c={colors.facebookBlue}>
                <FacebookTwoTone htmlColor={colors.facebookBlue} />
              </SocialIcon> */}
              {/* </a> */}
              <SocialIcon
                onClick={async () => {
                  googleAuth();
                  // await axios.post("http://localhost:3003/api/auth/google")
                }}
                c={colors.googleRed}
              >
                <Google htmlColor={colors.googleRed} />
              </SocialIcon>
            </SocialContainer>
            <Tagline>or do via email</Tagline>

            <Input
              type="email"
              name="email"
              onChange={(text) => handleChange(text)}
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              className="box"
              placeholder="Password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <ButtonContainer>
              <RemberMeContainer>
                <input
                  type="checkbox"
                  id="check"
                  name="check"
                  onChange={(e) => setCheck(e.target.value)}
                  value={check}
                />
                <label htmlFor="check">
                  <RememberMeText>Remember me?</RememberMeText>
                </label>
              </RemberMeContainer>
              <Btn type={"submit"}>
                <BtnText>Sign up</BtnText>
              </Btn>
            </ButtonContainer>
          </Form>
          <Baseline>
            Have an account?{" "}
            <Link to="/" onClick={() => setOpen(true)}>
              Sign in
            </Link>
          </Baseline>
        </SubContainer>
        <Image />
      </Wrapper>
    </Container>
  );
}

export default Signup;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7% 15%;
  @media (max-width: 450px) {
    padding: 0 0%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 80vh;
  background-color: #fdfdfd;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.986);
  -webkit-box-shadow: 3px 2px 16px 5px rgb(240, 240, 240);
  -moz-box-shadow: 3px 2px 16px 5px rgb(240, 240, 240);
  position: relative;
  @media (max-width: 450px) {
    height: 70vh;
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.986);
    -webkit-box-shadow: 0px 0px 0px 0px rgb(255, 254, 254);
    -moz-box-shadow: 0px 0px 0px 0px rgb(255, 254, 254);
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #000000;
  align-self: center;
  margin-block: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const Tagline = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 2rem;
  text-align: justify;
  opacity: 0.6;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 1.5rem 1.5rem;
  margin-block: 0.5rem !important;
  background-color: #f1f1f165;
  font-size: 1.4rem;
  min-width: 28rem;
  margin: 0.6rem 0;
  border: 0.2rem solid rgba(0, 0, 0, 0.26);
  text-transform: none;
  outline: none;
  border-radius: 2.5rem;
  :focus {
    border: 0.2rem solid ${colors.primaryGreen};
  }
`;

const Baseline = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  margin-left: 2rem;
  line-height: 2rem;
  text-align: justify;
  opacity: 0.8;
  a {
    color: #3178f1;
    margin-left: 0.5rem;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28rem;
`;

const RemberMeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RememberMeText = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-left: 0.7rem;
  line-height: 2rem;
  text-align: justify;
  opacity: 0.6;
`;

const Btn = styled(Button)`
  align-self: center;
  padding: 0.8rem 1.6rem !important;
  cursor: pointer;
  margin-block: 1rem !important;
  opacity: 0.6;
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
    background: linear-gradient(45deg, #050505, ${colors.borderGreen})
      border-box;
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
  font-size: 1rem;
  text-transform: capitalize;
`;

const Image = styled.div`
  flex: 1;
  background: url(${signup});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 768px) {
    display: none;
  }
`;

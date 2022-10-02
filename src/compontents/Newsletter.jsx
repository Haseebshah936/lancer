import { Button } from "@mui/material";
import styled from "styled-components";
import { mobile } from "../responsive";

function Newsletter(props) {
  return (
    <Container>
      <Wrapper>
        <HeadingContainer>
          <Heading>Join Our Newsletter</Heading>
          <TagLine>
            Stay updated with our latest news. We promise not to Spam.
          </TagLine>
        </HeadingContainer>
        <InputContainer>
          <Input placeholder="Your email" />
          <Button
            variant="contained"
            sx={{
              borderRadius: "2rem",
              color: "black",
              marginLeft: "1.5rem",
              fontSize: "1rem",
              padding: ".8rem 2rem",
              minWidth: "1rem",
              background:
                " linear-gradient(130deg, #ffffff, #ffffff) border-box",
              textTransform: "capitalize",
            }}
          >
            Send
          </Button>
        </InputContainer>
      </Wrapper>
    </Container>
  );
}

export default Newsletter;

const Container = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  background: linear-gradient(130deg, #172f33, #43856b) border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem 15rem;
  border-radius: 5rem;
  ${mobile({borderRadius: "0rem", width: "100%", padding: "3rem 7rem"})}
`;

const HeadingContainer = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;
const Heading = styled.h2`
  font-size: 3rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  color: #ffffff;
`;

const TagLine = styled.p`
  color: #ffffff;
  position: absolute;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  align-self: center;
  padding-inline: 1rem;
  top: 5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 2rem;
`;

const InputContainer = styled.div`
  margin-top: 1rem;
  align-self: center;
  display: flex;
  justify-items: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.4rem 0.4rem 2rem;
  border-radius: 2rem;
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  ${mobile({
    marginTop: "2rem",
  })}
`;

const Input = styled.input`
  background-color: transparent;
  color: #ffffff;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 100;
  outline: none;
  border: 0px;
  min-width: 15rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ffffff;
    opacity: 0.7; /* Firefox */
  }
`;

import { FormControlLabel, Radio } from "@mui/material";
import styled from "styled-components";
import colors from "../../utils/colors";

function AvatarRadio({ url, name, value }) {
  return (
    <Container>
      <Wrapper>
        <Image src={url} />
        <DetailsContainer>
          <NameText>{name}</NameText>
        </DetailsContainer>
      </Wrapper>

      <FormControlLabel
        value={value}
        control={
          <Radio
            sx={{
              color: colors.textGreen,
              "&.Mui-checked": {
                color: colors.textGreen,
              },
            }}
          />
        }
      />
    </Container>
  );
}

export default AvatarRadio;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 4rem 2.5rem 0;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  width: 100%;
  min-width: 25em;
  justify-content: space-between;
  flex: 1;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  min-height: 4rem;
  height: 4rem;
  margin-right: 1rem;
  min-width: 4rem;
  width: 4rem;
  border-radius: 2.5rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

const NameText = styled.h3`
  margin-bottom: 0rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
`;

const Badge = styled.div`
  background-color: #e7f5ee;
  padding: 0.5rem 1.5rem;
  border-radius: 45%;
  color: #5ec480;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

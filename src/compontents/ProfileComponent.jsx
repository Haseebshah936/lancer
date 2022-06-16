import styled from "styled-components";

function ProfileComponent({ count = 1 }) {
  return (
    <Container>
      <Wrapper>
        <CountText>{count}</CountText>
        <Image src={`https://picsum.photos/200/300?random=${count}`} />
        <DetailsContainer>
          <NameText>Haseeb</NameText>
          <EarnedContainer>
            <p>$</p> <Amount>3526</Amount>
          </EarnedContainer>
        </DetailsContainer>
      </Wrapper>
      <Badge>
        <Text>Orders</Text>
        <Text>500</Text>
      </Badge>
    </Container>
  );
}

export default ProfileComponent;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 4rem 2.5rem 0;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  max-width: 25em;
  min-width: 25em;
  justify-content: space-between;
  flex: 1;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const CountText = styled.h3`
  margin-right: 1.5rem;
  font-size: 1rem;
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

const EarnedContainer = styled.div`
  display: flex;
`;

const Amount = styled.p`
  opacity: 0.6;
  margin-bottom: 0rem;
  margin-left: 0.2rem;
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

const Text = styled.p`
  font-size: 0.7rem;
  margin-bottom: 0rem;
  margin-top: 0rem;
`;

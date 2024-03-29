import styled from "styled-components";

function ProfileComponent({
  url = `https://api.lorem.space/image/face?w=200&h=200&hash=hc9era4i`,
  count = 1,
  name = "Haseeb",
  currency = "$",
  earning = 3526,
  orders = 500,
  style,
  ordersBoxTitle = "Orders",
  orderBoxStyle,
  component,
  onClick = () => {},
  ...props
}) {
  return (
    <Container style={style} {...props}>
      <Wrapper onClick={onClick}>
        {count && <CountText>{count}</CountText>}
        <Image src={url} />
        <DetailsContainer>
          <NameText>{name}</NameText>
          {/* {earning && (
            <EarnedContainer>
              <p>{currency}</p> <Amount>{earning}</Amount>
            </EarnedContainer>
          )} */}
        </DetailsContainer>
      </Wrapper>
      {/* {orders && (
        <Badge style={orderBoxStyle}>
          <Text>{ordersBoxTitle}</Text>
          <Text>{orders}</Text>
        </Badge>
      )} */}
      {component}
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
  max-height: 3.5rem;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  /* width: 50%; */
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
  object-fit: cover;
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
  border-radius: 50%;
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

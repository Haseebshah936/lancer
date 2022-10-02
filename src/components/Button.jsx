import styled from "styled-components";

function Button({ title = "", background = "black", color = "black" }) {
  return (
    <Btn
      style={{
        background,
      }}
    >
      <BtnText
        style={{
          color,
        }}
      >
        {title}
      </BtnText>
      <IconContainer></IconContainer>
    </Btn>
  );
}

export default Button;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 1.2rem 2rem;
  cursor: pointer;
  border-radius: 50px;
  margin-top: 2.5rem;
  &:hover {
    opacity: 0.9;
  }
`;

const BtnText = styled.p`
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: 100;
`;
const IconContainer = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.2rem;
  transform: rotate(45deg);
`;

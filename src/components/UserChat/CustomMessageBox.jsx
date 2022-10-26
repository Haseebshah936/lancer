import React from "react";
import { Avatar, MessageBox } from "react-chat-elements";
import styled from "styled-components";
import AutoLinkText from "react-autolink-text2";
import colors from "../../utils/colors";

function CustomMessageBox({ position, text, title, type, ...props }) {
  return (
    <Container>
      {position === "left" && (
        <Avatar
          src="https://avatars.githubusercontent.com/u/80540635?v=4"
          alt="avatar"
          size="small"
          type="circle"
        />
      )}
      <Wrapper
        style={{
          marginRight: position === "right" ? "1.5rem" : 0,
          marginLeft: position === "left" ? "1.5rem" : 0,
        }}
      >
        <MessageBox
          position={position}
          type={type}
          title={title}
          text={<AutoLinkText text={text} />}
          {...props}
        />
        <Triangle position={position} />
      </Wrapper>
      {position === "right" && (
        <Avatar
          src="https://avatars.githubusercontent.com/u/80540635?v=4"
          alt="avatar"
          size="small"
          type="circle"
        />
      )}
    </Container>
  );
}

export default CustomMessageBox;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 2rem;
  margin-inline: 1rem;
`;

const Wrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Triangle = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) =>
    props.position === "left"
      ? colors.becomePartnerButtonGreen
      : colors.userChatMessageBackground};
  position: absolute;
  bottom: 20%;
  left: ${(props) => (props.position === "left" ? "-1rem" : "97.5%")};
  clip-path: polygon(
    0 ${(props) => (props.position === "left" ? "100%" : "0")},
    100% ${(props) => (props.position === "left" ? "0" : "100%")},
    100% 100%,
    0 100%
  );
`;

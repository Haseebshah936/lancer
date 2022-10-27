import React from "react";
import { Avatar, MessageBox } from "react-chat-elements";
import styled from "styled-components";
import AutoLinkText from "react-autolink-text2";
import colors from "../../utils/colors";

function CustomMessageBox({ position, title, type, ...props }) {
  const handleDownload = (e) => {
    alert("Download", e);
  };
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
          text={props?.text && <AutoLinkText text={props?.text} />}
          data={props?.data}
          {...props}
          onDownload={() => handleDownload(props?.data?.uri)}
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
  margin-block: 2.5rem;
  margin-inline: 1rem;
  .rce-mbox-photo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0.1rem;
    width: 100%;
  }
  .rce-mbox-photo img {
    width: 100%;
  }
  .rce-mbox--clear-padding {
    padding-bottom: 1.5rem;
  }
  .rce-mbox-video {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    width: 100%;
  }
  .rce-mbox-video.padding-time {
    padding-bottom: 0rem;
  }
  video {
    float: left;
    align-self: flex-start;
  }
  .rce-mbox-audio {
    padding-bottom: 0;
  }
  audio {
    background-color: #090080;
    width: 100%;
  }
  .rce-mbox-text {
    margin: 0;
    text-align: justify;
  }
  .rce-mbox-text::after {
    display: none;
  }
  .rce-mbox-time-block {
    display: none;
  }
  .rce-mbox-file > button {
    background-color: transparent;
    width: 100%;
  }
  .rce-avatar-container.default.default {
    display: none;
  }
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
  bottom: 2rem;
  left: ${(props) => (props.position === "left" ? "-1rem" : "97.5%")};
  clip-path: polygon(
    0 ${(props) => (props.position === "left" ? "100%" : "0")},
    100% ${(props) => (props.position === "left" ? "0" : "100%")},
    100% 100%,
    0 100%
  );
`;

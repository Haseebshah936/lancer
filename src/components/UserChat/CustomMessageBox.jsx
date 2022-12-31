import React, { memo } from "react";
import {
  Avatar,
  MeetingItem,
  MeetingLink,
  MessageBox,
  SystemMessage,
} from "react-chat-elements";
import styled from "styled-components";
import AutoLinkText from "react-autolink-text2";
import colors from "../../utils/colors";
import { miniMobile, mobile } from "../../responsive";
import "react-chat-elements/dist/main.css";
import { toast } from "react-toastify";

function CustomMessageBox({
  position,
  inverted = true,
  title,
  type,
  avatar,
  ...props
}) {
  const handleDownload = (e) => {
    // console.log("Download", e);
    window.open(e);
  };

  const MessageWrapper = ({ children }) => {
    return (
      <Container position={position} inverted={inverted}>
        {children}
      </Container>
    );
  };

  const UniversalMessage = () => {
    return (
      <MessageWrapper>
        {position === "left" && (
          <CustomAvatar
            position={position}
            src={avatar}
            alt="avatar"
            size="small"
            type="circle"
          />
        )}
        <Wrapper position={position}>
          <MessageBox
            position={position}
            type={type}
            title={title}
            text={props?.text && <AutoLinkText text={props?.text} />}
            data={props?.data}
            {...props}
            onDownload={() => handleDownload(props?.data?.uri)}
            onMeetingLinkClick={() => handleDownload(props?.data?.uri)}
            // onClick={() => handleDownload(props?.data?.uri)}
          />
          <Triangle position={position} />
        </Wrapper>
      </MessageWrapper>
    );
  };

  const MeetingMessage = () => {
    return (
      <MessageWrapper>
        <Wrapper position={position}>
          <MeetingItem
            subject={props?.text}
            title={title}
            {...props}
            // avatars={[{ src: avatar }]}
            onMeetingClick={() => handleDownload(props?.data?.uri)}
            onShareClick={() => {
              toast.success("Meeting Link Copied");
              navigator.clipboard.writeText(props?.data?.uri);
            }}
          />
        </Wrapper>
      </MessageWrapper>
    );
  };

  const SystemMessageWrapper = () => {
    if (position === "right") {
      return null;
    }
    return (
      <MessageWrapper>
        <Wrapper>
          <SystemMessage
            text={`${props?.text} ${position === "left" ? title : ""}`}
          />
        </Wrapper>
      </MessageWrapper>
    );
  };

  switch (type) {
    case "meetingItem":
      return <MeetingMessage />;
    case "system":
      return <SystemMessageWrapper />;
    default:
      return <UniversalMessage />;
  }
}

export default memo(CustomMessageBox);
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-end;
  overflow: hidden;
  transform: ${(props) =>
    props.inverted ? `rotateX(180deg)` : `rotateX(0deg)`};
  margin-block: 2.5rem;
  margin-top: ${(props) => (props.inverted ? `2.5rem` : `0rem`)};

  .rce-mbox-photo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0.1rem;
    width: 100%;
  }
  .rce-mbox-photo img {
    width: 100%;
    object-fit: contain;
    height: auto;
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
    outline: none;
  }
  .rce-mbox-audio {
    padding-bottom: 0;
  }
  audio {
    background-color: ${colors.audioBox};
    width: 100%;
    height: 4rem;
    min-width: 25rem;
  }
  .rce-mbox-text {
    margin: 0;
    margin-top: 1rem;
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
  .rce-mbox-file > button > * {
    padding: 0rem 0.5rem;
  }

  .rce-mtitem-button {
    background-color: ${colors.becomePartnerButtonGreen};
  }
  .rce-mtitem-share {
    color: ${colors.becomePartnerButtonGreen};
  }

  ${miniMobile({
    ".rce-mbox-file>button>*": {
      padding: "0rem .4rem",
    },
    ".rce-mbox-file--text": {
      fontSize: "1.2rem",
    },
  })}
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
  left: -1rem;
  clip-path: polygon(
    0 ${(props) => (props.position === "left" ? "100%" : "0")},
    100% ${(props) => (props.position === "left" ? "0" : "100%")},
    100% 100%,
    0 100%
  );
  display: ${(props) => (props.position === "left" ? "block" : "none")};
`;

const CustomAvatar = styled(Avatar)`
  margin-inline: ${(props) =>
    props.position === "left" ? "1rem 1.5rem" : "0rem"};
`;

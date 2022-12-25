import { ButtonBase } from "@material-ui/core";
import { ExitToApp, Report } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import { Button, CircularProgress, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRealmContext } from "../../db/RealmContext";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";
import { handleError } from "../../utils/helperFunctions";
import CustomIconButton from "../CustomIconButton";
import CustomReportModal from "../CustomReportModal";
import ProfileComponent from "../ProfileComponent";
import MorePopper from "./MorePoper";

function ChatInfo({ drawer, removeChatroom }) {
  const { activeChatroom: active, setActiveChatroom } = useCustomContext();
  const { user } = useRealmContext();
  const [description, setDescription] = useState({
    text: "",
    showMore: false,
  });
  const [participants, setParticipants] = useState({
    data: [],
    loading: true,
  });
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeParticipant, setActiveParticipant] = useState(null);
  const [participantDetails, setParticipantDetails] = useState({
    ordersCount: 0,
  });
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const handleOpenReport = () => {
    setToggle(true);
  };

  const handleCloseReport = () => {
    setToggle(false);
  };

  const expandDescription = () => {
    setDescription({
      text: active.description,
      showMore: false,
    });
  };

  const getParticipants = () => {
    requestMethod
      .get("/chatroom/participants/" + active.id)
      .then((res) => {
        console.log("Participants ", res);
        setParticipants({
          data: res.data,
          loading: false,
        });
        const isAdmin = res.data.filter((participant) => {
          return (
            participant._id === active.userParticipantId && participant?.isAdmin
          );
        });
        if (isAdmin.length > 0) {
          console.log("Is Admin", isAdmin);
          setIsAdmin(true);
        }
      })
      .catch((err) => {
        handleError(err);
        setParticipants({
          data: [],
          loading: false,
        });
      });
  };

  const getParticipantDetails = () => {
    requestMethod
      .get(
        `/project/projectBetween/${active?.participantId}/${active?.userParticipantId}`
      )
      .then((res) => {
        console.log(res);
        setParticipantDetails({
          ordersCount: res.data.count,
        });
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const removeParticipant = (userId, i) => {
    requestMethod
      .put(`/chatroom/removeParticipant/${active?.id}`, {
        userId,
      })
      .then((res) => {
        const newParticipants = [...participants.data];
        newParticipants.splice(i, 1);
        setParticipants((prev) => {
          return {
            ...prev,
            data: newParticipants,
          };
        });
        setActiveParticipant(null);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const makeAdmin = (participantId, i) => {
    requestMethod
      .put(`/chatroom/makeAdmin/${active?.id}`, {
        participantId,
      })
      .then((res) => {
        // console.log(res);
        const newParticipants = [...participants.data];
        newParticipants[i].isAdmin = true;
        setParticipants((prev) => {
          return {
            ...prev,
            data: newParticipants,
          };
        });
        setActiveParticipant(null);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const removeAdmin = (userId, i) => {
    requestMethod
      .put(`/chatroom/removeAdmin/${active?.id}`, {
        userId,
      })
      .then((res) => {
        const newParticipants = [...participants.data];
        newParticipants[i].isAdmin = false;
        setParticipants((prev) => {
          return {
            ...prev,
            data: newParticipants,
          };
        });
        setActiveParticipant(null);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const leaveGroup = () => {
    removeParticipant();
    requestMethod
      .put(`/chatroom/removeParticipant/${active?.id}`, {
        userId: active?.userParticipantId,
      })
      .then((res) => {
        removeChatroom(active?.id);
        setActiveChatroom(null);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const resetState = () => {
    setActiveParticipant(null);
    setParticipants({
      data: [],
      loading: true,
    });
    setDescription({
      text: "",
      showMore: false,
    });
  };

  useEffect(() => {
    console.log(active);
    if (active?.description && active.description.length > 200) {
      setDescription((prev) => {
        return {
          text: active.description.slice(0, 200) + "...",
          showMore: true,
        };
      });
    } else {
      setDescription({
        text: active.description,
        showMore: false,
      });
    }
    if (active && drawer && active?.isGroup) getParticipants();
    if (active && drawer && !active?.isGroup) getParticipantDetails();
    return () => {
      resetState();
    };
  }, [active, drawer]);

  return (
    <Container>
      <Details>
        <ImageContainer>
          <Image src={active.avatar} />
        </ImageContainer>
        <Title
          onClick={() => {
            if (!active?.isGroup) {
              navigate(`/profile/${active?.participantId}`);
            }
          }}
          isGroup={active.isGroup}
        >
          {active.title}
        </Title>
        <Description>
          {description.text}
          {description?.showMore && (
            <ShowMore onClick={expandDescription}>Show More</ShowMore>
          )}
        </Description>
      </Details>
      {active?.isGroup ? (
        <Participants>
          {participants?.loading ? (
            <CircularProgress color="success" size={20} />
          ) : (
            participants.data.map((participant, i) => (
              <ProfileComponent
                key={participant?._id}
                style={{
                  margin: "1rem 0rem",
                }}
                count={null}
                name={participant?.userId?.name}
                url={participant?.userId?.profilePic}
                earning={null}
                ordersBoxTitle=""
                orders={participant?.isAdmin ? "Admin" : "Participant"}
                onClick={() => {
                  navigate(`/profile/${participant?.userId?._id}`);
                }}
                component={
                  isAdmin &&
                  participant?._id !== active?.userParticipantId &&
                  participant?._id !== user._id ? (
                    <MorePopper
                      onClick={() => {
                        setActiveParticipant(participant?._id);
                      }}
                      isActive={participant?._id === activeParticipant}
                      removeParticipant={() =>
                        removeParticipant(participant?._id, i)
                      }
                      makeAdmin={() => makeAdmin(participant?._id, i)}
                      isAdmin={participant?.isAdmin}
                      removeAdmin={() => removeAdmin(participant?._id, i)}
                    />
                  ) : null
                }
              />
            ))
          )}
        </Participants>
      ) : (
        <ParticipantDetail>
          <ParticipantOrderDetails>
            <OrderTitle>Orders</OrderTitle>
            <OrderCount>{participantDetails?.ordersCount}</OrderCount>
          </ParticipantOrderDetails>
        </ParticipantDetail>
      )}

      {active.isGroup && (
        <CustomIconButton
          style={buttonStyles}
          text={"Exit Group"}
          leftIcon={
            <Logout
              sx={{
                transform: "rotate(180deg)",
              }}
            />
          }
          onClick={leaveGroup}
        />
      )}
      <CustomIconButton
        style={{
          ...buttonStyles,
          backgroundColor: colors.black,
          marginBottom: "2rem",
        }}
        text={`Report ${active?.isGroup ? " Group" : " Chat"}`}
        leftIcon={<Report />}
        onClick={handleOpenReport}
      />
      <CustomReportModal
        chatroomId={active?.id}
        toggleClose={handleCloseReport}
        toggle={toggle}
      />
    </Container>
  );
}

export default ChatInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const ImageContainer = styled(Paper)`
  width: 10rem;
  height: 10rem;
  border-radius: 5rem !important;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-block: 1rem;
  &:hover {
    cursor: ${(props) => (!props.isGroup ? "pointer" : "default")};
    text-decoration: ${(props) => (!props.isGroup ? "underline" : "default")};
  }
`;

const Description = styled.p`
  text-transform: capitalize;
  text-align: justify;
`;

const ShowMore = styled.p`
  cursor: pointer;
  color: dodgerblue;
`;

const Participants = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
  margin-bottom: 2rem;
  flex: 1;
`;

const ParticipantDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
  margin-bottom: 2rem;
  flex: 1;
`;

const ParticipantOrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-inline: 2rem;
`;

const OrderTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
`;

const OrderCount = styled.p`
  font-size: 1rem;
`;

const buttonStyles = {
  marginTop: "0rem",
  marginBottom: "1rem",
  backgroundColor: colors.gray,
  width: "50%",
};

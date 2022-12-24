import { ExitToApp, Report } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import { Button, CircularProgress, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useCustomContext } from "../../Hooks/useCustomContext";
import { requestMethod } from "../../requestMethod";
import colors from "../../utils/colors";
import { handleError } from "../../utils/helperFunctions";
import CustomIconButton from "../CustomIconButton";
import ProfileComponent from "../ProfileComponent";
import MorePopper from "./MorePoper";

function ChatInfo({ drawer }) {
  const { activeChatroom: active } = useCustomContext();
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
        console.log(res);
        setParticipants({
          data: res.data,
          loading: false,
        });
        const isAdmin = res.data.filter((participants) => {
          participants._id === active.userParticipantId && setIsAdmin(true);
        });
        if (isAdmin.length > 0) {
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

  useEffect(() => {
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
    return () => {
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
  }, [active, drawer]);

  return (
    <Container>
      <Details>
        <ImageContainer>
          <Image src={active.avatar} />
        </ImageContainer>
        <Title>{active.title}</Title>
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
                component={
                  isAdmin && participant?._id !== active?.userParticipantId ? (
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
        <ParticipantDetail></ParticipantDetail>
      )}

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
        onClick={() => removeParticipant(active?.userParticipantId)}
      />
      <CustomIconButton
        style={buttonStyles}
        text={"Report Group"}
        leftIcon={<Report />}
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

const buttonStyles = {
  marginTop: "0rem",
  marginBottom: "1rem",
  backgroundColor: colors.googleRed,
  width: "50%",
};

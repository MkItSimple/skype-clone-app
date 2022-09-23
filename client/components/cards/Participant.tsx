interface ContactCardProps {
  user: User;
  handleFunction: () => void;
}

const Participant = ({ user, handleFunction }: ContactCardProps) => {
  const imageHTML = `<img src='${user.avatarImage.url}' />`;
  return (
    <ParticipantContainer onClick={handleFunction}>
      {user.avatarImage.url ? (
        <div
          className="image__container"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(imageHTML) }}
        ></div>
      ) : (
        <div className="name__avatar__container">{AvatarName(user)}</div>
      )}
      <div className="participant__name">
        {user.firstname} {user.lastname}{" "}
        <div
          className={`status ${
            user.status ? user.status.replace(/\s/g, "__").toLowerCase() : ""
          }`}
        ></div>
      </div>
      <div className="add__icon">
        <AddIcon />
      </div>
    </ParticipantContainer>
  );
};

export default Participant;
import DOMPurify from "dompurify";
import styled from "styled-components";
import { AvatarName } from "../../utils/customFunctions";
import { User } from "../../utils/types";
import { AddIcon } from "../svg/Icons";
const ParticipantContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.3em 2em;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    background-color: var(--sky50);
    opacity: 1;
  }

  .add__icon {
    height: 25px;
    width: 25px;
    background-color: var(--color300);
    position: relative;
    border-radius: 50%;
    svg {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0px;
      right: 0px;
      color: white;
    }
  }

  .image__container {
    height: 35px;
    width: 35px;
    overflow: hidden;
    position: relative;
    border-radius: 50%;

    img {
      height: 130%;
      width: 100%;
      object-fit: fill;
    }
  }
  .name__avatar__container {
    height: 35px;
    width: 35px;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 2px;
    background-image: linear-gradient(to bottom, var(--sky50), var(--sky300));
    color: var(--sky700);
    font-weight: 700;
    font-size: 12px;
  }
  .participant__name {
    flex: 1;
    padding: 0em 0.5em;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: start;

    .status {
      height: 11px;
      width: 11px;
      border-radius: 50%;
      background-color: var(--statusOnline);
      margin-left: 1em;
      vertical-align: middle;
    }
    .status.do__not__disturb {
      background-color: var(--red500);
    }
    .status.away {
      background-color: var(--statusAway);
    }
  }
`;

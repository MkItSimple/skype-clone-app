import Image from "next/image";
import styled from "styled-components";
import { OtherMixin } from "../../public/GlobalStyles";
import { AvatarName } from "../../utils/customFunctions";
import { AvatarUser } from "../../utils/types";

type SIZE_TYPE = { height: string; width: string };
interface AvatarProps {
  user: AvatarUser;
  size?: SIZE_TYPE;
  myId: string;
}

const AvatarMessage = ({ user, size, myId }: AvatarProps) => {
  let styling = { height: "40px", width: "40px" };
  if (size) styling = size;

  const DisplayAvatar = () => {
    if (user.avatarImage.url !== "")
      return (
        <Image
          src={user.avatarImage.url}
          height="100%"
          width="100%"
          alt=""
          objectFit="cover"
        />
      );
    return <div className="name__avatar">{AvatarName(user)}</div>;
  };

  return (
    <AvatarMessageContainer>
      <div
        className={`image_container ${user._id !== myId ? "other" : ""}`}
        style={styling}
      >
        <DisplayAvatar />
      </div>
    </AvatarMessageContainer>
  );
};

export default AvatarMessage;
const AvatarMessageContainer = styled.div`
  .image_container {
    margin-top: 0.5em;
    position: relative;
    border: 1px solid var(--sky50);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to bottom, var(--sky50), var(--sky200));
    &:hover {
      cursor: pointer;
    }
  }
  img {
    border-radius: 50%;
  }

  .status {
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background-color: var(--statusOnline);
    border: 1px solid white;
    position: absolute;
    bottom: 0px;
    right: 0px;
    &:hover {
      cursor: pointer;
    }
  }

  .status.do__not__disturb {
    background-color: var(--red500);
  }
  .status.away {
    background-color: var(--statusAway);
  }
  .status.invisible {
    display: none;
  }
  .status.menu {
    &:hover {
      background-color: #bbf7d0;
    }
  }
  .name__avatar {
    border-radius: 50%;
    color: var(--sky600);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
  }
  ${OtherMixin}
`;

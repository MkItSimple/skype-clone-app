import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useApp } from "../../context/AppContext";
import { AvatarName } from "../../utils/customFunctions";
import { AvatarUser, SelectedChatUser } from "../../utils/types";
import { OtherMixin } from "../../public/GlobalStyles";

type SIZE_TYPE = { height: string; width: string };
interface AvatarProps {
  menu?: boolean;
  user: SelectedChatUser;
  size?: SIZE_TYPE;
  onClickFunction?: () => void;
  myId: string;
}

const Avatar = ({ menu, user, size, onClickFunction, myId }: AvatarProps) => {
  const { onlineUsers } = useApp();
  const [offline, setOffline] = useState(false);
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

  const isOfflineHandler = useCallback(() => {
    const array = onlineUsers.filter((ou: any) => ou._id === user._id);
    array.length === 0 ? setOffline(true) : setOffline(false);
  }, [onlineUsers, user]);
  useEffect(() => {
    isOfflineHandler();
  }, [isOfflineHandler]);
  useEffect(() => {
    console.log("onlineUsers offline? ", onlineUsers);
  }, [onlineUsers]);

  return (
    <AvatarContainer>
      <div
        className={`image_container ${user._id !== myId ? "other" : ""}`}
        style={styling}
      >
        <DisplayAvatar />
        <div
          className={`status ${
            user.status ? user.status.replace(/\s/g, "__").toLowerCase() : ""
          } ${menu ? "menu" : ""} ${offline ? "offline" : ""}`}
          onClick={onClickFunction}
        ></div>
      </div>
    </AvatarContainer>
  );
};

export default Avatar;
const AvatarContainer = styled.div`
  .image_container {
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
  .name__avatar {
    border-radius: 50%;
    color: var(--sky700);
    font-size: 14px;
    font-weight: 700;
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
  .status.offline {
    display: none;
  }
  .status.menu {
    &:hover {
      background-color: #bbf7d0;
    }
  }
  ${OtherMixin}
`;

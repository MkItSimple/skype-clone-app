import Image from "next/image";
import styled from "styled-components";
import { useApp } from "../../context/AppContext";
import { GroupChatName } from "../../utils/customFunctions";

interface AvatarProps {
  chat: any;
}

const AvatarGroup = ({ chat }: AvatarProps) => {
  const { setOpenModalUpdate } = useApp();

  const DisplayAvatar = () => {
    if (chat.groupAdmin.avatarImage.url !== "")
      return (
        <Image
          src={chat.groupAdmin.avatarImage.url}
          height="100%"
          width="100%"
          alt=""
          objectFit="cover"
        />
      );
    return (
      <div className="avatar">
        {chat.groupAdmin.firstname.split("")[0].toUpperCase()}
        {chat.groupAdmin.lastname.split("")[0].toUpperCase()}
      </div>
    );
  };

  return (
    <AvatarGroupContainer>
      <div className="image_container">
        <div className="chat__name" onClick={() => setOpenModalUpdate(true)}>
          {GroupChatName(chat.chatName)}
        </div>
        <div className="smaller__image__container">
          <DisplayAvatar />
        </div>
      </div>
    </AvatarGroupContainer>
  );
};

export default AvatarGroup;
const AvatarGroupContainer = styled.div`
  .image_container {
    height: 40px;
    width: 40px;
    position: relative;
    border: 1px solid var(--sky50);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
      to bottom,
      var(--green50),
      var(--green200)
    );
    &:hover {
      cursor: pointer;
    }
  }

  img {
    border-radius: 50%;
  }
  .avatar {
    border-radius: 50%;
    height: 100%;
    color: var(--sky700);
    background-image: linear-gradient(to bottom, var(--sky50), var(--sky200));
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chat__name {
    color: var(--green700);
    font-weight: 700;
    font-size: 14px;
  }
  .smaller__image__container {
    position: absolute;
    bottom: -5px;
    right: -5px;
    height: 20px;
    width: 20px;
    background-color: var(--green200);
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
`;

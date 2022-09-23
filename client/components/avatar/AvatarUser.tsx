import Image from "next/image";
import styled from "styled-components";
import { User } from "../../utils/types";

type SIZE_TYPE = { height: string; width: string };
interface AvatarProps {
  menu?: boolean;
  user: User;
  size?: SIZE_TYPE;
  onClickFunction?: () => void;
  openModal?: () => void;
}

const AvatarUser = ({
  user,
  size,
  onClickFunction,
  openModal,
}: AvatarProps) => {
  let styling = { height: "40px", width: "40px" };
  if (size) styling = size;

  const DisplayAvatar = () => {
    // return (
    //   <div className="avatar" onClick={openModal}>
    //     {user.firstname.split("")[0].toUpperCase()}
    //     {user.lastname.split("")[0].toUpperCase()}
    //   </div>
    // );
    if (!user.avatarImage.url)
      return (
        <div className="avatar" onClick={openModal}>
          {user.firstname.split("")[0].toUpperCase()}
          {user.lastname.split("")[0].toUpperCase()}
        </div>
      );
    return (
      <Image
        src={user.avatarImage.url}
        height="100%"
        width="100%"
        alt=""
        objectFit="cover"
        onClick={openModal}
      />
    );
  };

  return (
    <AvatarContainer>
      <div className="image_container" style={styling}>
        <DisplayAvatar />
        <div
          className={`status ${
            user.status ? user.status.replace(/\s/g, "__").toLowerCase() : ""
          }`}
          onClick={onClickFunction}
        ></div>
      </div>
    </AvatarContainer>
  );
};

export default AvatarUser;
const AvatarContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
  .image_container {
    position: relative;
    border: 1px solid var(--sky50);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to bottom, var(--sky50), var(--sky200));
  }
  img {
    border-radius: 50%;
  }
  .avatar {
    border-radius: 50%;
    color: var(--sky700);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
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
      background-color: var(--green100);
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

  .status.do__not__disturb,
  .status.away {
    &:hover {
      background-color: var(--green100);
    }
  }

  .status.menu {
    &:hover {
      background-color: #bbf7d0;
    }
  }
`;

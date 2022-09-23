interface ContactCardProps {
  isAdmin?: boolean;
  canDelete?: boolean;
  user: User;
  handleFunction: () => void;
}

const SUser = ({
  isAdmin,
  canDelete,
  user,
  handleFunction,
}: ContactCardProps) => {
  const imageHTML = `<img src='${user.avatarImage.url}' />`;
  return (
    <SUserContainer>
      {user.avatarImage.url ? (
        <div
          className="image__container"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(imageHTML) }}
        ></div>
      ) : (
        <div className="name__avatar__container">{AvatarName(user)}</div>
      )}
      <div className="name">
        {user.firstname} <br />
      </div>
      {!isAdmin ? (
        canDelete ? (
          <ExitIcon
            onClickFunction={handleFunction}
            customClass="remove__selected"
          />
        ) : (
          ""
        )
      ) : (
        <div className="admin">Admin</div>
      )}
    </SUserContainer>
  );
};

export default SUser;
import DOMPurify from "dompurify";
import styled from "styled-components";
import { AvatarName } from "../../utils/customFunctions";
import { User } from "../../utils/types";
import { ExitIcon } from "../svg/Icons";
const SUserContainer = styled.div`
  margin-right: 0.5em;
  position: relative;
  .image__container {
    height: 40px;
    width: 40px;
    overflow: hidden;
    position: relative;
    border-radius: 50%;

    img {
      height: 135%;
      width: 100%;

      object-fit: contain;
      object-position: 50% 20%;
    }
  }
  .name__avatar__container {
    height: 40px;
    width: 40px;
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
  }

  .name {
    font-size: 10px;
    text-align: center;
    letter-spacing: 1px;
  }

  .remove__selected {
    position: absolute;
    height: 15px;
    width: 15px;
    top: 0px;
    right: 0px;

    color: white;

    background-color: var(--red500);
    border-radius: 50%;
    border: 2px solid white;

    &:hover {
      cursor: pointer;
    }
  }
  .admin {
    position: absolute;
    height: 15px;
    width: 15px;
    top: -11px;
    padding: 2px;
    font-size: 8px;
    font-weight: 700;
    background-color: var(--sky50);
    color: var(--sky700);
    width: 100%;
    text-align: center;
    letter-spacing: 1px;
    border-radius: 3px;
    text-transform: uppercase;
  }
`;

import Avatar from "../avatar/Avatar";

interface ContactCardProps {
  isAdmin?: boolean;
  user: User;
  handleFunction: () => void;
}

const SelectedUserCard = ({
  isAdmin,
  user,
  handleFunction,
}: ContactCardProps) => {
  return (
    <ContactCardContainer>
      <div className="wrapper" onClick={handleFunction}>
        <div className="selected__user__avatar__container">
          <Avatar user={user} />
        </div>
        <div className="selected__user__name">{user.firstname}</div>
        {!isAdmin && (
          <div className="remove__container">
            <ExitIcon onClickFunction={handleFunction} />
          </div>
        )}
      </div>
    </ContactCardContainer>
  );
};

export default SelectedUserCard;
import styled from "styled-components";
import { User } from "../../utils/types";
import { ExitIcon } from "../svg/Icons";
const ContactCardContainer = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-right: 0.5em;
  }
  .selected__user__avatar__container {
    position: relative;
  }
  .selected__user__name {
    display: block;
    font-size: 10px;
    font-weight: 400;
  }
  .remove__container {
    position: absolute;
    top: -5px;
    right: -10px;

    svg {
      height: 20px;
      width: 20px;
      padding: 2px;
      background-color: var(--red500);
      color: white;
      border-radius: 2em;
      border: 2px solid white;
    }
  }
`;

import React from "react";
interface Props {
  contact: any;
  clickFunction: () => void;
}

const ContactCard2 = ({ contact, clickFunction }: Props) => {
  return (
    <ContactCard2Container>
      <div className="wrapper" onClick={clickFunction}>
        <div className="avatar__container">
          <Avatar user={contact} />
        </div>
        <div className="name__container">
          {contact.firstname} {contact.lastname}
        </div>
      </div>
    </ContactCard2Container>
  );
};

export default ContactCard2;
import styled from "styled-components";
import Avatar from "../avatar/Avatar";
const ContactCard2Container = styled.div`
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5em 0.5em 0.2em 0.5em;
    border-radius: 0.3em;
    &:hover {
      background-color: var(--sky50);
    }
  }

  .avatar__container {
    width: fit-content;
    margin-right: 0.7em;
  }
  .name__container {
    flex: 1;
  }
`;

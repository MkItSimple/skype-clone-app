import React from "react";

type Props = {
  clickFunction: () => void;
};
const CreateGoupChatButton = ({ clickFunction }: Props) => {
  return (
    <CreateGoupChatButtonContainer onClick={clickFunction}>
      <div className="new__group__chat">New Group Chat</div>
    </CreateGoupChatButtonContainer>
  );
};

export default CreateGoupChatButton;
import styled from "styled-components";
const CreateGoupChatButtonContainer = styled.div`
  padding: 0.4em 0.3em;
  &:hover {
    cursor: pointer;
  }

  .new__group__chat {
    width: fit-content;
    border: 1px solid var(--color200);
    border-radius: 2em;
    color: var(--color600);
    font-size: 13px;
    padding: 0.5em 1.7em 0.7em 1.7em;
  }
`;

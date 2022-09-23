import React from "react";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useApp } from "../context/AppContext";
import Welcome from "./Welcome";
const RightContent = () => {
  const { user, selectedChat } = useApp();

  return (
    <RightContainer>
      {selectedChat ? <SingleChat /> : <Welcome name={user.firstname} />}
    </RightContainer>
  );
};

export default RightContent;
const RightContainer = styled.div`
  flex: 1;
  padding: 0em;
  position: relative;
  box-shadow: -2px 7px 7px -1px rgba(0, 0, 0, 0.12);
`;

import React from "react";
import { useApp } from "../../context/AppContext";

const BackDrop = () => {
  const { closeModals } = useApp();
  return <BackDropContainer onClick={closeModals}></BackDropContainer>;
};

export default BackDrop;
import styled from "styled-components";
const BackDropContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 5;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.3);
`;

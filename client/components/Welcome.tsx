import Image from "next/image";
import React from "react";

const Welcome = ({ name }: { name: string }) => {
  return (
    <WelcomeContainer>
      <div className="image_container">
        <Image
          src={"/emoji/emoji_smile_gif.png"}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
      <h1>Welcome {name} !</h1>
    </WelcomeContainer>
  );
};

export default Welcome;
import styled from "styled-components";
const WelcomeContainer = styled.div`
  padding-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .image_container {
    transform: rotate(180deg);
    height: 130px;
    width: 130px;
    position: relative;
    img {
      opacity: 0.5;
    }
  }
  h1 {
    opacity: 0.5;
    font-size: 3em;
    font-family: "Gilroy Thin";
    color: var(--gray600);
  }
`;

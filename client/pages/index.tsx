import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../api/auth";

const Home: NextPage = () => {
  const { resetStatesHandler } = useApp();
  const router = useRouter();
  useEffect(() => {
    const SP = setTimeout(async () => {
      await resetStatesHandler();
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        router.replace("/chats");
      } else {
        router.replace("/login");
      }
    }, 1000);
    return () => {
      //   clearTimeout(SP);
    };
  }, [router, resetStatesHandler]);
  return (
    <SplashContainer>
      <Logo />
    </SplashContainer>
  );
};
export default Home;

import styled from "styled-components";
import { NextPage } from "next";
import { LogoMixins } from "../public/GlobalStyles";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";
const SplashContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ${LogoMixins}
`;

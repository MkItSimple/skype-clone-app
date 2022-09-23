import { useRouter } from "next/router";
import { useEffect } from "react";

const Chats = () => {
  const router = useRouter();
  const {
    user,
    setUser,
    openModalInfo,
    openModalUpdate,
    openModalProfile,
    openModalCreate,
    closeOther,
  } = useApp();

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      router.replace("/");
      console.log("no user");
    } else {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) setUser(JSON.parse(userInfo));
      socket.emit("get onlineUsers");
    }
  }, [setUser, router]);

  return (
    <Container onClick={closeOther}>
      {user && (
        <div className="chat__content">
          <LeftContent />
          <RightContent />
          {openModalUpdate && <ModalUpdate />}
          {openModalInfo && <ModalInfo onClickFuntion={closeOther} />}
          {openModalCreate && <ModalCreate />}
          {openModalProfile && (
            <>
              <ModalProfile />
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default Chats;
import { useApp } from "../context/AppContext";
import { socket } from "../utils/ws";
import styled from "styled-components";
import ModalUpdate from "../components/modals/ModalUpdate";
import LeftContent from "../components/LeftContent";
import RightContent from "../components/RightContent";
import ModalInfo from "../components/modals/ModalInfo";
import ModalCreate from "../components/modals/ModalCreate";
import ModalProfile from "../components/modals/ModalProfile";
const Container = styled.div`
  .chat__content {
    display: flex;
  }
`;

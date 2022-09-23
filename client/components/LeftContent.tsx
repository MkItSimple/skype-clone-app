import { useEffect, useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";
import Options from "./Options";
import { useRouter } from "next/router";
import {} from "../api/chat";
import { UnreadMessage } from "../utils/types";
import SearchComponent from "./SearchComponent";
import ChatCard from "./cards/ChatCard";
import { fetchUnreadMessagesApi, updateMessageReadByApi } from "../api/message";
import StatusOptions from "./StatusOptions";
import { socket } from "../utils/ws";
import {
  BellIcon,
  ChatsIcon,
  ContactIcon,
  DotsIcon,
  PhoneIcon,
  SearchIcon,
} from "./svg/Icons";
import AvatarUser from "./avatar/AvatarUser";
import { updateStatusApi } from "../api/auth";
import CreateGoupChatButton from "./left-content-components/CreateGoupChatButton";
import ContactCard2 from "./cards/ContactCard";
import { NotifictionMixin } from "../public/GlobalStyles";
import Tabs from "./left-content-components/Tabs";

const statusOptions = ["Active", "Away", "Do not disturb"];

const LeftContent = () => {
  const {
    openSignout,
    setOpenSignout,
    openStatusOptions,
    setOpenStatusOptions,
    openModalProfile,
    setOpenModalProfile,
    setOpenModalCreate,
    setSelectedChat,
    user,
    chats,
    openSearchComponent,
    setOpenSearchComponent,
    unreadMessages,
    setUnreadMessages,
    notificationCount,

    contacts,
    accessChat,
    resetStatesHandler,
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const history = useRouter();

  const logoutHandler = async () => {
    await resetStatesHandler();
    localStorage.removeItem("userInfo");
    await updateStatusApi("Active", user.token);
    socket.emit("logout", user);
    history.replace("/");
  };

  const openModalCreateHandler = () => {
    setOpenModalCreate(true);
  };

  const setUnreadMessagesHandler = async () => {
    const unreadMessages = await fetchUnreadMessagesApi(user.token);
    setUnreadMessages(unreadMessages.data);
  };

  return (
    <RootDiv>
      <div className="left_header">
        <AvatarUser
          menu={true}
          user={user}
          onClickFunction={() => setOpenStatusOptions(!openStatusOptions)}
          openModal={() => setOpenModalProfile(!openModalProfile)}
        />
        <div className="name_container">
          <span
            className="name__span"
            onClick={() => setOpenModalProfile(!openModalProfile)}
          >
            {user.firstname} {user.lastname}
          </span>
          <span className="status_text">Set a status</span>
        </div>
        <div className="icon__container">
          <DotsIcon onClickFunction={() => setOpenSignout(!openSignout)} />
        </div>
        {openStatusOptions && (
          <div className="status__options">
            <StatusOptions options={statusOptions} />
          </div>
        )}
        {openSignout && (
          <div className="signout__options">
            <Options
              options={[
                {
                  text: "Sign out",
                  clickFunction: logoutHandler,
                },
              ]}
            />
          </div>
        )}
      </div>

      {openSearchComponent ? (
        <SearchComponent />
      ) : (
        <div className="default___content">
          <div
            className="search__trigger"
            onClick={() => setOpenSearchComponent(true)}
          >
            <div className="st_left">
              <SearchIcon /> People, goups, messages
            </div>
          </div>

          <Tabs
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            notificationCount={notificationCount}
          />

          <CreateGoupChatButton clickFunction={openModalCreateHandler} />

          <div className="list__content scroll__styles">
            <div className={`tab__content ${tabIndex === 0 ? "active" : ""}`}>
              <div className="list_label">Recent chats</div>
              {chats &&
                chats.map((chat: any, index: number) => (
                  <ChatCard
                    key={`c-${chat._id}`}
                    chat={chat}
                    onClickFunction={() => {
                      setSelectedChat(chat);
                      if (chat.latestMessage) {
                        const has = chat.latestMessage.readBy.filter(
                          (id: any) => id === user._id
                        );

                        if (has.length === 0) {
                          updateMessageReadByApi(chat._id, user.token).then(
                            (res) => {
                              socket.emit(
                                "readby updated",
                                res.data.updatedChat[0],
                                user._id
                              );
                              setUnreadMessagesHandler();
                            }
                          );
                        }
                      }
                    }}
                    unreadMessages={
                      unreadMessages.filter(
                        (m: UnreadMessage) => m.chat === chat._id
                      ).length
                    }
                  />
                ))}
            </div>
            <div className={`tab__content ${tabIndex === 1 ? "active" : ""}`}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {contacts.length > 0 ? (
                    contacts?.map((cuser: any) => (
                      <ContactCard2
                        key={cuser._id}
                        contact={cuser}
                        clickFunction={() => accessChat(cuser._id, user.token)}
                      />
                    ))
                  ) : (
                    <h2>
                      No contacts.. <br /> Create more dummy accounts
                    </h2>
                  )}
                </>
              )}
            </div>
            <div className={`tab__content ${tabIndex === 2 ? "active" : ""}`}>
              <div className="no__contents">No contents yet.</div>
            </div>
            <div className={`tab__content ${tabIndex === 3 ? "active" : ""}`}>
              <div className="no__contents">No contents yet.</div>
            </div>
          </div>
        </div>
      )}
    </RootDiv>
  );
};

export default LeftContent;
const RootDiv = styled.div`
  padding: 1em 0em;
  width: 320px;
  height: calc(100vh);
  h2 {
    color: var(--gray500);
    padding: 1em;
  }
  svg {
    height: 15px;
    width: 15px;
  }

  .icon__container {
    padding-right: 0.5em;
    &:hover {
      cursor: pointer;
    }
  }

  .left_header {
    display: flex;
    align-items: center;
    padding: 0em 0.7em 0.3em 0.7em;
    position: relative;
    .signout__options {
      position: absolute;
      top: 25px;
      left: 245px;
    }
    .status__options {
      position: absolute;
      top: 40px;
      left: 30px;
    }
    svg {
      height: 13px;
      width: 13px;
    }
  }
  .name_container {
    font-size: 13px;
    font-weight: 500;
    padding-left: 0.5em;
    flex: 1;
    margin-right: 1em;
    display: flex;
    flex-direction: column;
  }
  .name__span {
    &:hover {
      cursor: pointer;
    }
  }

  .default___content {
    padding: 0em 0.5em;
  }

  .search__trigger {
    padding: 0.5em 0.3em;

    .st_left {
      display: flex;
      align-items: center;
      font-size: 11px;
      color: var(--color500);
      background-color: var(--color100);
      padding: 0.8em;
      border-radius: 1em;
      svg {
        margin-right: 1em;
      }
    }
  }

  .tabs {
    display: flex;
    padding: 0.5em 0em;
    svg {
      fill: var(--color400);
    }
    .tab {
      flex: 1;
      text-align: center;
      font-size: 10px;
      position: relative;
      color: var(--color400);
      &:hover {
        color: var(--sky500);
        cursor: pointer;
        svg {
          fill: var(--sky500);
        }
      }
    }
    .tab.active {
      color: var(--sky400);
      svg {
        fill: var(--sky500);
      }
    }
  }

  ${NotifictionMixin}
  .tab__notification {
    position: absolute;
    top: -7px;
    right: 13px;
    background-color: var(--red500);
  }

  .tab__content {
    display: none;
  }
  .tab__content.active {
    display: block;
  }

  .list_label {
    padding: 0.3em 0.9em;
    font-size: 13px;
    font-weight: 500;
    color: var(--color400);
  }

  .no__contents {
    text-align: center;
    padding: 1em;
  }
  .list__content {
    height: calc(100vh - 210px);
    overflow-y: auto;
    padding-bottom: 2em;
  }
`;

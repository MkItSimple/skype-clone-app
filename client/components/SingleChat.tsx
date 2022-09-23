import Image from "next/image";
import {
  insertEmojiHandler,
  removeStyles,
  toTxT,
} from "../utils/customFunctions";
import {
  KeyboardEvent,
  UIEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { socket } from "../utils/ws";

const SingleChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [whosTyping, setWhosTyping] = useState("");

  const [hidePlaceholder, setHidePlaceholder] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showWYSIWYG, setShowWYSIWYG] = useState(false);
  const [scrollAgain, setScrollAgain] = useState(false);

  const bRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const {
    user,
    openModalUpdate,
    setOpenModalUpdate,
    selectedChat,
    messages,
    onlineUsers,
    setMessages,
    perPage,
    setPerPage,
  } = useApp();

  const sendHandler = async () => {
    console.log("test let see ", newMessage);

    if (inputRef.current && inputRef.current.innerHTML.trim().length > 0) {
      if (socket) socket.emit("stop typing", selectedChat._id);
      let textVersion = await toTxT(newMessage);
      textVersion = await removeStyles(textVersion);
      // textVersion = textVersion.replace(/<\/?[^>]+(>|$)/g, "");
      try {
        setNewMessage("");
        inputRef.current.innerHTML = "";
        setHidePlaceholder(false);
        const sendMessageResponse = await sendMessageApi(
          textVersion,
          MESSAGE_TYPE.TXT,
          selectedChat,
          user.token
        );
        socket.emit("new message", sendMessageResponse.data);

        const { data } = await messagesCountApi(selectedChat._id, user.token);
        console.log("test count here", data);
        const skip = data > 30 ? data - 15 : 0;
        const messagesRes = await fetchMessagesApi(
          selectedChat._id,
          skip,
          user.token
        );
        setMessages(messagesRes.data);
      } catch (error) {
        toast("Failed to send the Message", {
          type: "error",
          position: "top-center",
        });
      }
    }
  };

  const getHeight = () => {
    if (bRef.current) {
      setHeight(bRef.current.clientHeight);
    }
  };

  const onKeydownHandler = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key == "Enter" && !e.shiftKey) e.preventDefault();

    if (inputRef.current) {
      const value = inputRef.current.innerHTML;
      setNewMessage(value);
      typingHandler();
    }
  };

  const onKeyupHandler = (e: KeyboardEvent<HTMLImageElement>) => {
    const span = document.getElementById("span");
    span?.removeAttribute("style");
    getHeight();
    let value;
    if (inputRef.current) {
      value = inputRef.current.innerHTML;
      let booleanValue = true;
      if (value === "" || value === "<br>") booleanValue = false;
      setHidePlaceholder(booleanValue);
    }

    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendHandler();
    }
  };

  useEffect(() => {
    getHeight();
  }, [showEmojiPicker, showWYSIWYG]);

  const emojiClicked = (emoji: string) => {
    if (inputRef.current) inputRef.current.focus();
    const customClass = emoji.includes("smile") ? "class='rotate'" : "";
    insertEmojiHandler(
      `&nbsp<img ${customClass} height='20' src='${emoji}.png'>`
    );
  };

  const onTypingHandler = useCallback(
    (userName: string, userID: string) => {
      if (userID !== user._id) {
        setWhosTyping(userName);
        setIsTyping(true);
      }
    },
    [user._id]
  );

  const typingHandler = () => {
    if (!typing) {
      socket.emit(
        "typing",
        selectedChat._id,
        `${user.firstname} ${user.lastname}`,
        user._id
      );
    }
  };

  const onPasteHandler = () => {
    console.log("inputRef.current?.innerHTML ", inputRef.current?.innerHTML);
    // if (inputRef.current?.innerHTML) {
    //   inputRef.current?.innerHTML.replace("color", "");
    // }
  };

  const stopTypingHandler = useCallback(() => {
    setIsTyping(false);
    if (socket) socket.emit("stop typing", selectedChat._id);
    setTyping(false);
  }, [selectedChat]);

  useEffect(() => {
    const ID = setTimeout(() => {
      stopTypingHandler();
    }, 2000);

    return () => {
      clearTimeout(ID);
    };
  }, [istyping, stopTypingHandler]);

  useEffect(() => {
    socket.on("typing", (userName: string, userID: string, room: string) => {
      if (room === selectedChat._id) onTypingHandler(userName, userID);
    });

    return () => {
      socket.off("typing");
    };
  }, [selectedChat, user, onTypingHandler]);

  const onChangeHandler = () => {
    console.log("test content changed");
  };

  // const loadMore = () => {
  //   setPerPage((prev: number) => prev + 15);
  // };

  const getScrollPositionHandler = async (e: UIEvent<HTMLDivElement>) => {
    // console.log("scrolling!", e.currentTarget.scrollTop);
    if (e.currentTarget.scrollTop <= 30) {
      // loadMore();
      // console.log("loadMore");
      const { data } = await messagesCountApi(selectedChat._id, user.token);
      if (perPage >= data) return;
      setTimeout(async () => {
        const updatedPerPage = perPage + 15;
        setPerPage(updatedPerPage);
        let skip = data > 30 ? data - updatedPerPage : 0;
        skip = skip < 15 ? 0 : skip;

        if (skip > -1) {
          const messagesRes = await fetchMessagesApi(
            selectedChat._id,
            skip,
            user.token
          );
          setMessages(messagesRes.data);
        }
      }, 200);
    }
  };

  return (
    <>
      <SingleChatContainer
        bottomHeight={height}
        showEmojiPicker={showEmojiPicker}
        showWYSIWYG={showWYSIWYG}
      >
        <div className="chat__header">
          {selectedChat.isGroupChat ? (
            <AvatarGroup chat={selectedChat} />
          ) : (
            <Avatar
              user={getUserPartner(user, selectedChat.users)}
              myId={user._id}
            />
          )}
          <div className="header_name_container">
            <div
              className="name"
              onClick={() =>
                selectedChat.isGroupChat && setOpenModalUpdate(true)
              }
            >
              {!selectedChat.isGroupChat
                ? getSenderName(user, selectedChat.users)
                : selectedChat.chatName}
            </div>
            <div className="status_text">
              {!selectedChat.isGroupChat
                ? isOffline(user, selectedChat.users, onlineUsers)
                  ? ""
                  : getSenderStatus(user, selectedChat.users)
                : selectedChat.users.length +
                  ` participant${selectedChat.users.length > 1 ? "s" : ""}`}
            </div>
          </div>
          {selectedChat.isGroupChat && (
            <div className="gear__icon__container">
              <GearIcon
                onClickFunction={() => setOpenModalUpdate(!openModalUpdate)}
              />
            </div>
          )}
        </div>
        <div className="chat__content">
          <div
            className="chat__content__top scroll__styles"
            onScroll={getScrollPositionHandler}
          >
            <div className="wrapper">
              {messages && messages.length > 0 ? (
                <Scrollable
                  messages={messages}
                  user={user}
                  scrollAgain={scrollAgain}
                  selectedChat={selectedChat}
                />
              ) : (
                <div className="say__something">
                  <div className="image_container">
                    <Image
                      src="/emoji/wave.gif"
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                  <div>
                    Say hello{" "}
                    {!selectedChat.isGroupChat &&
                      `to ${
                        getUserPartner(user, selectedChat.users).firstname
                      }`}
                    !
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="chat__content__bottom" ref={bRef} onClick={getHeight}>
            <div className="input__container">
              {istyping ? (
                <div className="typing">{whosTyping} is typing...</div>
              ) : (
                <></>
              )}

              <div className="emojis__container">
                <div className="emojis">
                  <Image
                    onClick={() => emojiClicked("emoji/emoji_clapping_gif")}
                    src={"/emoji/emoji_clapping_gif.png"}
                    height={25}
                    width={25}
                    alt=""
                  />
                  <Image
                    onClick={() => emojiClicked("emoji/emoji_laughing_gif")}
                    src={"/emoji/emoji_laughing_gif.png"}
                    height={25}
                    width={25}
                    alt=""
                  />
                  <Image
                    onClick={() => emojiClicked("emoji/emoji_yes_gif")}
                    src={"/emoji/emoji_yes_gif.png"}
                    height={25}
                    width={25}
                    alt=""
                  />
                  <Image
                    className="rotate"
                    onClick={() => emojiClicked("emoji/emoji_smile_gif")}
                    src={"/emoji/emoji_smile_gif.png"}
                    height={25}
                    width={25}
                    alt=""
                  />
                </div>
              </div>
              <div className="richTextEditor">
                <button>
                  <BoldIcon
                    onClickFunction={() =>
                      document.execCommand("bold", false, "")
                    }
                  />
                </button>
                <button>
                  <ItablicIcon
                    onClickFunction={() =>
                      document.execCommand("italic", false, "")
                    }
                  />
                </button>
                <button>
                  <StrikeThroughIcon
                    onClickFunction={() =>
                      document.execCommand("strikethrough", false, "")
                    }
                  />
                </button>
                <button>
                  <UnderlineIcon
                    onClickFunction={() =>
                      document.execCommand("underline", false, "")
                    }
                  />
                </button>
              </div>
              <div className="input__bottom">
                <div
                  className="smiley"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {showEmojiPicker ? <ArrowDown /> : <Smiley />}
                </div>
                <div
                  ref={inputRef}
                  className="ce"
                  contentEditable={true}
                  onKeyDown={onKeydownHandler}
                  onKeyUp={onKeyupHandler}
                  onChange={onChangeHandler}
                  onPaste={onPasteHandler}
                  suppressContentEditableWarning={true}
                ></div>
                {!hidePlaceholder && (
                  <div className="placeholder">Type a message</div>
                )}
                <div
                  className="rte__toggle"
                  onClick={() => setShowWYSIWYG(!showWYSIWYG)}
                >
                  {showWYSIWYG ? (
                    <ArrowDown />
                  ) : (
                    <>
                      <AIcon />
                      <MarkerIcon customClass="sm__svg" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SingleChatContainer>
    </>
  );
};

export default SingleChat;
import styled from "styled-components";
import {
  fetchMessagesApi,
  fetchMoreMessagesApi,
  messagesCountApi,
  sendMessageApi,
} from "../api/message";
import { useApp } from "../context/AppContext";
import {
  getSenderName,
  getSenderStatus,
  getUserPartner,
  isOffline,
} from "../utils/logics";
import { MESSAGE_TYPE } from "../utils/types";
import Avatar from "./avatar/Avatar";
import Scrollable from "./Scrollable";
import {
  AIcon,
  ArrowDown,
  BoldIcon,
  GearIcon,
  ItablicIcon,
  MarkerIcon,
  Smiley,
  StrikeThroughIcon,
  UnderlineIcon,
} from "./svg/Icons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AvatarGroup from "./avatar/AvatarGroup";
import { fetchChatsApi } from "../api/chat";
type SingleChatContainerProps = {
  bottomHeight: number;
  showEmojiPicker: boolean;
  showWYSIWYG: boolean;
};
const SingleChatContainer = styled.div<SingleChatContainerProps>`
  height: calc(100vh);
  @media only screen and (max-height: 600px) {
    height: 110vh;
  }
  .chat__header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0em 1em 0em 1em;
    border-bottom: 1px solid var(--color300);
    svg {
      height: 15px;
      width: 15px;
    }
  }
  .header_name_container {
    padding: 0em 1em;
    font-size: 14px;
    font-weight: 500;
    color: var(--color600);
  }
  .gear__icon__container {
    flex: 1;
    &:hover {
      cursor: pointer;
    }
  }
  .phone__icon__container {
    background-image: linear-gradient(to right, var(--sky400), var(--sky600));
    padding: 0.3em 1em;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 2em;
    margin-right: 1em;
    &:hover {
      cursor: pointer;
    }
    svg {
      fill: white;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      padding: 2px 5px 5px 5px;
    }
  }
  .name {
    &:hover {
      cursor: pointer;
    }
  }
  button {
    border: none;
  }
  .chat__content {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .chat__content__top {
    display: flex;
    flex-direction: column;
    position: relative;

    height: ${(props) => `calc(97% - ${props.bottomHeight}px)`};
    max-height: ${(props) => `calc(90vh - ${props.bottomHeight}px)`};
    transition-duration: 300ms;
    overflow-y: auto;
  }

  .say__something {
    padding-top: 2em;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .image_container {
      height: 120px;
      width: 120px;
      position: relative;
      margin-bottom: 1em;
    }
    font-family: "Gilroy Light";
    font-size: 30px;
    font-weight: 400;
    color: var(--color600);
  }

  .textBottom {
    position: absolute;
    bottom: 0px;
  }

  .chat__content__bottom {
    height: auto;
    transition-duration: 300ms;
    display: flex;
    align-items: center;
    padding: 0em 1em;
  }
  .input__container {
    min-width: 300px;
    width: 100%;
    max-width: 600px;
    height: auto;
    margin: 0em auto 0em auto;
    background-color: var(--gray100);

    border-radius: 1.5em;
    position: relative;
    .typing {
      position: absolute;
      top: -2em;
      left: 0em;
      background-color: white;
      font-size: 14px;
      padding: 0.3em 1em;
      border-radius: 2em;
    }
  }
  .emojis__container {
    height: auto;
    background-color: white;
    border: 1px solid var(--gray100);
    border-radius: 1.5em 1.5em 0em 0em;
    padding: 1em 2em;

    display: ${(props) => (props.showEmojiPicker ? "block" : "none")};
  }
  .emojis {
    display: flex;
    align-items: center;
    gap: 0.7em;
    &:hover {
      cursor: pointer;
    }
  }
  .richTextEditor {
    height: 40px;
    background-color: white;
    margin: 2px 4px;
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding-left: 1em;
    display: ${(props) => (props.showWYSIWYG ? "flex" : "none")};
    svg {
      height: 11px;
      width: 11px;
      fill: var(--gray600);
      &:hover {
        fill: var(--gray500);
        cursor: pointer;
      }
    }
    border-radius: ${(props) =>
      props.showEmojiPicker ? "0em" : "1.5em 1.5em 0em 0em"};
    button {
      border: none;
      background-color: transparent;
    }
  }
  .input__bottom {
    display: flex;
    align-items: end;
    position: relative;
    padding: 0.7em 0em;

    .placeholder {
      color: var(--gray500);
      font-size: 13px;
      position: absolute;
      top: 12px;
      left: 45px;
      z-index: 0;
    }
  }
  .ce {
    padding: 2px 0px;
    font-size: 13px;
    outline: 0px solid transparent;
    max-height: 130px;
    overflow-y: auto;
    flex: 1;
    z-index: 1;
    /* -webkit-user-modify: read-write-plaintext-only; */
  }

  .smiley {
    height: 20px;
    width: 20px;
    margin-right: 0.5em;
    margin-bottom: em;
    margin-left: 1em;
    position: relative;
    &:hover {
      cursor: pointer;
    }
  }
  svg {
    height: 100%;
    width: 100%;
    fill: var(--gray400);
    vertical-align: center;
  }
  .hero__svg {
    height: 18px;
    width: 18px;
    fill: none;
    color: var(--gray500);
  }
  .rte__toggle {
    height: 20px;
    width: 20px;
    margin-right: 1.7em;

    margin-left: 0em;
    position: absolute;
    top: 8px;
    right: -5px;
    z-index: 3;

    &:hover {
      cursor: pointer;
    }
    svg {
      height: 12px;
      width: 12px;
      fill: var(--gray500);
    }
    .sm__svg {
      height: 10px;
      width: 10px;
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
    .hero__svg {
      height: 18px;
      width: 18px;
      fill: none;
      color: var(--gray500);
    }
  }
`;

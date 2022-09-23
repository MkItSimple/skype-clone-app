import Avatar from "../avatar/Avatar";

interface ChatCardProps {
  chat: any;
  onClickFunction: () => void;
  unreadMessages: number;
}

const ChatCard = ({ chat, onClickFunction, unreadMessages }: ChatCardProps) => {
  const { user, selectedChat } = useApp();

  const peerChatName = (u: any, users: any) => {
    const partnerName = getSenderName(u, users);
    return `${partnerName.substring(0, 18)} ${
      partnerName.length > 17 ? "..." : ""
    }`;
  };

  const groupChatName = (name: string) => {
    return `${name.substring(0, 18)} ${name.length > 17 ? "..." : ""}`;
  };
  return (
    <ChatCardContainer>
      <div
        className={`wrapper ${
          selectedChat && selectedChat._id === chat._id ? "active" : ""
        }`}
        onClick={onClickFunction}
      >
        {chat.isGroupChat ? (
          <AvatarGroup chat={chat} />
        ) : (
          <Avatar user={getUserPartner(user, chat.users)} myId={user._id} />
        )}
        <div className="chat__card__right">
          <div className="top">
            <span className="name">
              {!chat.isGroupChat
                ? peerChatName(user, chat.users)
                : groupChatName(chat.chatName)}
            </span>
            <span className="time">
              {chat.latestMessage && timeFormat(chat.latestMessage.createdAt)}
            </span>
          </div>
          <div className="bottom">
            <div
              className="bottom__message"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  formatLatestMessage(chat.latestMessage?.content)
                ),
              }}
            ></div>
            {unreadMessages > 0 && (
              <span className="notification">{unreadMessages}</span>
            )}
          </div>
        </div>
      </div>
    </ChatCardContainer>
  );
};

export default ChatCard;
import styled from "styled-components";
import { getSenderName, getUserPartner } from "../../utils/logics";
import { useApp } from "../../context/AppContext";
import {
  formatLatestMessage,
  GroupChatName,
  timeFormat,
} from "../../utils/customFunctions";
import AvatarGroup from "../avatar/AvatarGroup";
import { NotifictionMixin } from "../../public/GlobalStyles";
import DOMPurify from "dompurify";
const ChatCardContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
  .wrapper {
    display: flex;
    padding: 0.5em 0.5em 0.2em 0.5em;
    border-radius: 0.3em;
    &:hover {
      background-color: var(--sky50);
    }
  }

  .wrapper.active {
    background-color: var(--sky100);
    .name {
      font-weight: 500;
    }
    .time,
    .bottom__message {
      color: var(--color600);
    }
  }

  .chat__card__right {
    padding: 0px 0px 5px 10px;
    flex: 1;
  }
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }
  .name {
    flex: 1;
    color: var(--color600);
    font-weight: 400;
    /* font-size: 14px; */
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;

    max-height: 40px;
    overflow: hidden;
  }
  .time {
    font-size: 12px;
    color: #64748b;
  }
  .bottom__message {
    flex: 1;
    height: 20px;
    color: var(--color500);
    font-weight: 400;
    font-size: 13px;
  }
  ${NotifictionMixin}
`;

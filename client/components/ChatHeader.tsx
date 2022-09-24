import React from "react";
import {
  getSenderName,
  getSenderStatus,
  getUserPartner,
  isOffline,
} from "../utils/logics";
import Avatar from "./avatar/Avatar";
import AvatarGroup from "./avatar/AvatarGroup";
import { GearIcon } from "./svg/Icons";

type Props = {
  user: any;
  selectedChat: any;
  onlineUsers: any[];
  openModalUpdate: boolean;
  setOpenModalUpdate: (value: boolean) => void;
};
const ChatHeader = ({
  user,
  selectedChat,
  onlineUsers,
  openModalUpdate,
  setOpenModalUpdate,
}: Props) => {
  return (
    <>
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
            onClick={() => selectedChat.isGroupChat && setOpenModalUpdate(true)}
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
    </>
  );
};

export default ChatHeader;

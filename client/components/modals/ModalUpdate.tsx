import { useCallback, useEffect, useState } from "react";
import SUser from "./../cards/SUser";

const ModalUpdate = ({ onClickFuntion }: { onClickFuntion?: () => void }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedUsersID, setSelectedUsersID] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    user,
    setOpenModalUpdate,
    selectedChat,
    setSelectedChat,
    setChats,
    chats,
  } = useApp();

  const handleSubmit = async () => {
    if (groupChatName.length < 2) {
      toast("Chat name must be longer atleast 2 characters long", {
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (selectedUsers.length < 1) {
      setError("Group chat must have atleast 1 participant.");
      return;
    }

    try {
      const { data } = await updateGroupChatApi(
        selectedChat._id,
        groupChatName,
        selectedUsersID,
        user.token
      );
      toast("Group Chat Updated!", {
        type: "success",
        position: "top-center",
      });
      socket.emit("group chat updated", data);
      setSelectedChat(data);
      setOpenModalUpdate(false);
    } catch (error) {
      console.log("Failed to update group chat :(");
      toast("Failed to update group chat :(", {
        type: "error",
        position: "top-center",
      });
    }
  };

  const handleGroup = (userToAdd: User) => {
    if (selectedUsers.filter((u) => u._id === userToAdd._id).length > 0) {
      toast("User already added!", { type: "success", position: "top-center" });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query) {
        return;
      }

      try {
        const { data } = await searchApi(search, user.token);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast("Failed to Load the Search Results", {
          type: "error",
          position: "top-center",
        });
      }
    },
    [search, user]
  );

  const handleDelete = (delUser: User) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleDeleteGroup = async () => {
    try {
      const handleDelete = await deleteGroupChatApi(
        selectedChat._id,
        user.token
      );
      console.log("Delete response ", handleDelete);
      toast("Group Chat Deleted!", { type: "success", position: "top-center" });
      socket.emit("group chat deleted", selectedChat._id);
      setChats(chats.filter((chat: any) => chat._id !== selectedChat._id));
      setSelectedChat(null);
      setOpenModalUpdate(false);
    } catch (error) {
      toast("Failed to delete group chat :(", {
        type: "error",
        position: "top-center",
      });
    }
  };

  const handleLeave = async () => {
    let text = "Are you sure you want to leave this group?";
    console.log("test usersID ", user._id);

    const updatedUsers = selectedUsers.filter((sel) => sel._id !== user._id);
    let usersID: string[] = [];
    updatedUsers.forEach((user) => {
      usersID.push(user._id);
    });
    if (confirm(text) == true) {
      const { data } = await updateGroupChatApi(
        selectedChat._id,
        groupChatName,
        usersID,
        user.token
      );

      console.log("test data ", data);

      const sendMessageResponse = await sendMessageApi(
        `${user.firstname} has left the group`,
        MESSAGE_TYPE.TXT,
        selectedChat._id,
        user.token
      );

      toast(`You left the group chat ${selectedChat.chatName} !`, {
        type: "success",
        position: "top-center",
      });

      socket.emit("left the group", selectedChat);

      setSelectedChat(null);
      setOpenModalUpdate(false);
    }
  };

  useEffect(() => {
    const searchID = setTimeout(() => {
      handleSearch(search);
    }, 700);

    return () => {
      clearTimeout(searchID);
    };
  }, [search, handleSearch]);

  useEffect(() => {
    let IDs: string[] = [];
    selectedUsers.forEach((user) => {
      IDs.push(user._id);
    });
    setSelectedUsersID(IDs);
  }, [selectedUsers, setSelectedUsersID]);

  useEffect(() => {
    setGroupChatName(selectedChat.chatName);
    setSelectedUsers(selectedChat.users);
    console.log(selectedChat.users);
    selectedChat.groupAdmin._id === user._id
      ? setIsAdmin(true)
      : setIsAdmin(false);
    return () => {};
  }, [user, selectedChat]);

  return (
    <ModalUpdateContainer isAdmin={isAdmin}>
      <div className="modal">
        <ExitIcon onClickFunction={() => setOpenModalUpdate(false)} />
        {isAdmin ? (
          <>
            <div className="modal__header">Update Group Chat</div>
            <div className="createdby__you">
              {isAdmin ? "Created by you" : ""}
            </div>
            <input
              type="text"
              disabled={!isAdmin}
              placeholder="Group Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <input
              type="text"
              disabled={!isAdmin}
              placeholder="Search Participants"
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
        ) : (
          <div className="chat__name">{selectedChat.chatName}</div>
        )}

        <div className="participants">
          {selectedUsers.length} Participant
          {selectedUsers.length > 1 ? "'s" : ""}
        </div>
        <div className="selected__users__container">
          {selectedUsers.map((u) => (
            <SUser
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
              isAdmin={selectedChat.groupAdmin._id === u._id}
              canDelete={isAdmin}
            />
          ))}
        </div>

        <div className="search__result__container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResult
              ?.slice(0, 4)
              .map((user: User) => (
                <Participant
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </div>

        <div className="modal__footer">
          {error && <div className="error">{error}</div>}
          <div className="bottons_container">
            {isAdmin ? (
              <>
                <div className="leave" onClick={handleDeleteGroup}>
                  Delete Group
                </div>
                <div className="submit" onClick={handleSubmit}>
                  Update Group
                </div>
              </>
            ) : (
              <div className="leave" onClick={handleLeave}>
                Leave Group
              </div>
            )}
          </div>
        </div>
      </div>
      <BackDrop />
    </ModalUpdateContainer>
  );
};

export default ModalUpdate;
import styled from "styled-components";
import {
  deleteGroupChatApi,
  searchApi,
  updateGroupChatApi,
} from "../../api/chat";
import { useApp } from "../../context/AppContext";
import { MESSAGE_TYPE, User } from "../../utils/types";
import { ExitIcon } from "../svg/Icons";
import Participant from "../cards/Participant";
import BackDrop from "./BackDrop";
import { toast } from "react-toastify";
import { socket } from "../../utils/ws";
import { sendMessageApi } from "../../api/message";

type ModalUpdateContainerProps = {
  isAdmin?: boolean;
};
const ModalUpdateContainer = styled.div<ModalUpdateContainerProps>`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 27px;
    width: 27px;
    position: absolute;
    top: 1.3em;
    right: 1.3em;
    color: var(--color500);
  }

  .createdby__you {
    font-size: 12px;
    font-weight: 400;
    color: var(--color400);
  }

  .participants {
    width: 100%;
    text-align: left;
    padding: 0.5em 1em 0em 1em;
    font-weight: 600;
    font-size: 14px;
    color: var(--gray500);
  }

  .modal__header,
  .chat__name {
    font-weight: 700;
    font-size: 27px;

    color: var(--color500);
    padding: 0.5em 0.7em 0em 0.7em;
  }

  .modal {
    height: calc(90vh);
    max-height: ${(props) => `calc(${props.isAdmin ? "600" : "300"}px)`};
    min-width: 450px;
    max-width: 500px;
    z-index: 11;
    color: var(--color600);
    background-color: white;
    position: fixed;
    margin: 0 auto;
    border: 1px solid #e8e8e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .modal__footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 1.3em 1em;
    gap: 1em;
    z-index: 30;

    .error {
      position: absolute;
      bottom: 100px;
      z-index: 23;
      font-size: 30px;
    }

    .bottons_container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .submit,
    .leave {
      font-weight: 700;
      font-size: 13px;
      padding: 10px 20px;
      border-radius: 2em;
      &:hover {
        cursor: pointer;
      }
    }
    .submit {
      background-color: var(--sky600);
      color: white;
      &:hover {
        background-color: var(--sky400);
      }
    }
    .leave {
      color: var(--red400);
      &:hover {
        color: var(--red500);
      }
    }
  }
  input {
    min-width: 250px;
    border: none;
    border-bottom: 1px solid #e8e8e1;
    background-color: transparent;
    font-size: 15px;
    letter-spacing: 1px;
    text-align: center;
    outline: none;
    padding: 0.5em 0em;
    &::placeholder {
    }
  }

  .selected__users__container {
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 0em 1em;
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 0.3em;

    ::-webkit-scrollbar {
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 2em;
    }

    &:hover {
      ::-webkit-scrollbar-track {
        background: var(--gray100);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--gray300);
        border-radius: 2em;
      }
    }
  }
  .search__result__container {
    width: 100%;

    height: auto;

    max-height: 400px;

    overflow-y: auto;
    margin-bottom: 4.7em;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 2em;
    }

    &:hover {
      ::-webkit-scrollbar-track {
        background: var(--gray100);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--gray300);
        border-radius: 2em;
      }
    }
  }
`;

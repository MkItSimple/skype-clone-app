import React, { useCallback, useEffect, useState } from "react";
import SUser from "./../cards/SUser";

const ModalCreate = () => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, setOpenModalCreate, setChats, chats } = useApp();

  const handleGroup = (userToAdd: User) => {
    if (selectedUsers.filter((u) => u._id === userToAdd._id).length > 0) {
      toast("User already added", { type: "warning", position: "top-center" });
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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast("Please fill all the feilds", {
        type: "warning",
        position: "top-center",
      });
      return;
    }

    try {
      const users = JSON.stringify(selectedUsers.map((u) => u._id));
      const { data } = await createGroupChatApi(
        groupChatName,
        users,
        user.token
      );
      setChats([data, ...chats]);
      toast("New Group Chat Created!", {
        type: "success",
        position: "top-center",
      });
      socket.emit("join chat", data._id);
      socket.emit("new group chat created", data);
      setOpenModalCreate(false);
    } catch (error) {
      toast("Failed to Create the Chat!", {
        type: "error",
        position: "top-center",
      });
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
    console.log("selectedUsers ", selectedUsers);
  }, [selectedUsers]);

  return (
    <Container>
      <div className="modal">
        <div className="exit__container">
          <ExitIcon onClickFunction={() => setOpenModalCreate(false)} />
        </div>
        <div className="modal__header">Create New Group Chat</div>
        <input
          type="text"
          placeholder="Group Name"
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search to add participants"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="selected__users__container">
          {selectedUsers.map((u) => (
            <SUser
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
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
          <div className="submit" onClick={handleSubmit}>
            Create Group Chat
          </div>
          <div className="cancel">Cancel</div>
        </div>
      </div>
    </Container>
  );
};

export default ModalCreate;
import styled from "styled-components";
import { createGroupChatApi, searchApi } from "../../api/chat";
import { useApp } from "../../context/AppContext";
import { User } from "../../utils/types";
import { ExitIcon } from "../svg/Icons";
import Participant from "../cards/Participant";
import { toast } from "react-toastify";
import { socket } from "../../utils/ws";

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  .exit__container {
    position: absolute;
    top: 0.7em;
    right: 1.3em;
    &:hover {
      cursor: pointer;
    }

    svg {
      height: 27px;
      width: 27px;
      color: var(--color500);
    }
  }

  .modal__header {
    font-weight: 700;
    font-size: 20px;

    color: var(--color500);
    padding: 0.5em 0.7em 0em 0.7em;
  }

  .modal {
    height: calc(90vh);
    max-height: 600px;
    min-width: 450px;
    max-width: 500px;
    z-index: 10;
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1.3em 1em;

    .submit {
      background-color: var(--sky500);
      height: 40px;
      width: 80%;
      border-radius: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px;
      margin-left: 0.4em;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;

      &:hover {
        cursor: pointer;
      }

      svg {
        color: white;
        fill: white;
      }
    }
    .cancel {
      color: var(--sky500);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      padding: 0.5em 1em;
    }
  }

  input {
    min-width: 250px;
    border: none;
    border-bottom: 1px solid #e8e8e1;
    font-size: 16px;
    font-weight: 300;
    font-family: "Gilroy Regular";
    letter-spacing: 1px;
    text-align: center;
    outline: none;
    padding: 0.5em 0em;
    &::placeholder {
      color: var(--color400);
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

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Chat, Contact, UnreadMessage, User } from "../utils/types";
import { socket } from "../utils/ws";
import { toast } from "react-toastify";
import { accessChatApi, fetchChatsApi } from "../api/chat";
import {
  fetchMessagesApi,
  fetchUnreadMessagesApi,
  messagesCountApi,
  updateMessageReadByApi,
} from "../api/message";
import { getContactsApi } from "../api/user";
const AppContext = createContext<any>({});
export const useApp = () => useContext(AppContext);
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [token, setToken] = useState<string>("");
  const [chats, setChats] = useState<any[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<UnreadMessage[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [selectedChat, setSelectedChat] = useState<any>();

  const [messages, setMessages] = useState<any>([]);
  const [perPage, setPerPage] = useState(15);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [openSignout, setOpenSignout] = useState(false);
  const [openStatusOptions, setOpenStatusOptions] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openSearchComponent, setOpenSearchComponent] = useState(false);

  const [joinedChats, setJoinedChats] = useState<string[]>([]);

  const resetStatesHandler = () => {
    setChats([]);
    setContacts([]);
    setSelectedChat(null);
    setUser(null);
  };

  const closeOther = () => {
    if (openSignout) setOpenSignout(false);
    if (openStatusOptions) setOpenStatusOptions(false);
    if (openModalInfo) setOpenModalInfo(false);
  };

  const closeModals = () => {
    if (openModalProfile) setOpenModalProfile(false);
    if (openModalUpdate) setOpenModalUpdate(false);
    if (openBackDrop) setOpenBackDrop(false);
  };

  const accessChat = async (userId: string, token: string) => {
    try {
      const { data } = await accessChatApi(userId, token);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
        socket.emit("new chat created", data);
      }
      setSelectedChat(data);
    } catch (error) {
      toast("Error fetching the chat", {
        type: "error",
        position: "top-center",
      });
    }
  };

  const fetchContacts = useCallback(async (token: string) => {
    if (token) {
      try {
        const { data } = await getContactsApi(token);
        setContacts(data);
      } catch (error) {}
    }
  }, []);

  const fetchChats = useCallback(
    async (token: any) => {
      if (token) {
        try {
          const { data } = await fetchChatsApi(token);
          const unreadMessages = await fetchUnreadMessagesApi(token);
          setChats(data);
          setUnreadMessages(unreadMessages.data);
          if (selectedChat) {
            const { data } = await messagesCountApi(selectedChat._id, token);
            const skip = data > 30 ? data - 15 : 0;
            const messagesRes = await fetchMessagesApi(
              selectedChat._id,
              skip,
              token
            );
            setMessages(messagesRes.data);
          }
          let tempJoinedChats = joinedChats;
          data.map((chat: any, i: number) => {
            if (!joinedChats.includes(chat._id)) {
              tempJoinedChats.push(chat._id);
              socket.emit("join chat", chat._id);
            }
          });
          setJoinedChats(tempJoinedChats);
        } catch (error) {
          console.log("Failed to Load the chats!");
        }
      }
    },
    [selectedChat, joinedChats]
  );

  useEffect(() => {
    perPage >= 30 && console.log("perPage ", perPage);
  }, [perPage]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        const sc: Chat = selectedChat;
        const { data } = await messagesCountApi(selectedChat._id, token);
        const skip = data > 30 ? data - 15 : 0;
        const messagesRes = await fetchMessagesApi(sc._id, skip, token);
        setMessages(messagesRes.data);
        setPerPage(15);
      }
    };
    fetchMessages();
  }, [selectedChat, setMessages, token]);

  useEffect(() => {
    const initFetching = setTimeout(() => {
      if (user) {
        const userData = {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          avatarImage: user.avatarImage,
          status: user.status,
        };
        socket.emit("setup", userData);
        setToken(user.token);
        fetchChats(user.token);
        fetchContacts(user.token);
      }
    }, 300);
    return () => {
      clearTimeout(initFetching);
    };
  }, [user, fetchChats, fetchContacts]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) return;
    if (token) {
    }
  }, [token]);

  useEffect(() => {
    let uniqueIDs: string[] = [];
    for (let i = 0; i < unreadMessages.length; i++) {
      const chatId = unreadMessages[i].chat;
      !uniqueIDs.includes(chatId) && uniqueIDs.push(chatId);
    }
    setNotificationCount(uniqueIDs.length);
  }, [unreadMessages, setNotificationCount]);

  useEffect(() => {
    socket.on("connected", async () => {
      socket.emit("get online users");
    });

    socket.on("online users", async (onlineUsers) => {
      console.log("onlineUsers ", onlineUsers);
      setOnlineUsers(onlineUsers);
      fetchContacts(token);
    });

    socket.on("readby updated", async (updatedChat, whoClicked) => {
      if (user && whoClicked !== user._id && selectedChat) {
        const { data } = await messagesCountApi(selectedChat._id, user.token);
        console.log("test count here", data);
        const skip = data > 30 ? data - 15 : 0;
        const messagesRes = await fetchMessagesApi(
          selectedChat._id,
          skip,
          user.token
        );
        setMessages(messagesRes.data);
      }
    });

    socket.on("new message recieved", async (newMessageRecieved: any) => {
      if (user) {
        const { data } = await fetchChatsApi(user.token);

        setChats(data);

        if (selectedChat && selectedChat._id === newMessageRecieved.chat._id) {
          if (selectedChat.latestMessage) {
            await updateMessageReadByApi(selectedChat._id, user.token);

            const { data } = await messagesCountApi(
              selectedChat._id,
              user.token
            );

            const skip = data > 30 ? data - 15 : 0;
            const messagesRes = await fetchMessagesApi(
              selectedChat._id,
              skip,
              user.token
            );
            setMessages(messagesRes.data);
            setPerPage(15);
          }
        } else {
          const unreadMessages = await fetchUnreadMessagesApi(user.token);
          setUnreadMessages(unreadMessages.data);
        }
      }
    });

    socket.on("new chat created", (newChat) => {});

    socket.on("new group chat created", (newGroupChat) => {
      console.log("test new group chat created");

      if (user) {
        const members = newGroupChat.users.filter(
          (u: any) => u._id === user._id
        );

        members.length > 0 && fetchChats(user.token);
      }
    });

    socket.on("group chat deleted", (chatId) => {
      console.log("test group chat deleted");
      setChats(chats.filter((chat: any) => chat._id !== chatId));
    });

    socket.on("group chat updated", (updatedGroupChat) => {
      if (user) {
        const members = updatedGroupChat.users.filter(
          (u: any) => u._id === user._id
        );

        members.length > 0 && fetchChats(user.token);

        // check if updatedGroupChat still exist in chats list . . if not then remove it
        const chatList = chats.filter(
          (c: any) => c._id === updatedGroupChat._id
        );
        if (members.length === 0 && chatList.length > 0) {
          fetchChats(user.token);
          selectedChat._id === updatedGroupChat._id && setSelectedChat(null);
        }
      }
    });

    socket.on("someone left the group", async (leftChat) => {
      if (user) {
        const members = leftChat.users.filter((u: any) => u._id === user._id);
        if (members.length > 0) {
          const { data } = await fetchChatsApi(user.token);
          setChats(data);
          selectedChat &&
            selectedChat._id === leftChat._id &&
            setSelectedChat(leftChat);
        }
      }
    });

    socket.on("someone changed status", async (userId, status) => {
      if (user) {
        const { data } = await fetchChatsApi(user.token);
        setChats(data);
      }

      if (selectedChat) {
        const userIncluded = selectedChat.users.filter(
          (user: any) => user._id === userId
        );
        if (userIncluded.length > 0) {
          const indexOfUser = selectedChat.users.findIndex(
            (user: any) => user._id === userId
          );
          const sc = selectedChat;
          sc.users[indexOfUser].status = status;
          setSelectedChat(sc);
        }
      }
    });

    return () => {
      socket.off("connected");
      socket.off("online users");
      socket.off("readby updated");
      socket.off("new message recieved");
      socket.off("new group chat created");
      socket.off("group chat deleted");
      socket.off("group chat updated");
      socket.off("someone left the group");
      socket.off("someone changed status");
      socket.off("someone is connected client");
    };
  }, [selectedChat, user, chats, fetchChats, perPage]);

  return (
    <AppContext.Provider
      value={{
        resetStatesHandler,
        user,
        setUser,
        chats,
        setChats,
        accessChat,
        fetchContacts,
        contacts,

        openSignout,
        setOpenSignout,
        openStatusOptions,
        setOpenStatusOptions,
        openModalCreate,
        setOpenModalCreate,
        openModalInfo,
        setOpenModalInfo,
        openModalUpdate,
        setOpenModalUpdate,
        openModalProfile,
        setOpenModalProfile,
        openSearchComponent,
        setOpenSearchComponent,
        openBackDrop,
        setOpenBackDrop,
        closeOther,
        closeModals,

        unreadMessages,
        setUnreadMessages,
        onlineUsers,
        selectedChat,
        setSelectedChat,
        setMessages,
        messages,

        notificationCount,
        setNotificationCount,

        perPage,
        setPerPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

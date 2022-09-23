import axios from "axios";

export const fetchChatsApi = async (authtoken: string) => {
  return await axios.get(`${process.env.apiUrl}/chat`, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

export const searchApi = async (search: string, authtoken: string) => {
  return await axios.get(`${process.env.apiUrl}/user?search=${search}`, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

export const accessChatApi = async (userId: string, authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/chat`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const createGroupChatApi = async (
  name: string,
  users: string,
  authtoken: string
) => {
  return await axios.post(
    `${process.env.apiUrl}/chat/group`,
    { name, users },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const updateGroupChatApi = async (
  chatId: string,
  chatName: string,
  users: string[],
  authtoken: string
) => {
  return await axios.put(
    `${process.env.apiUrl}/chat/group`,
    { chatId, chatName, users },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};
export const deleteGroupChatApi = async (chatId: string, authtoken: string) => {
  return await axios.delete(`${process.env.apiUrl}/chat/group/${chatId}`, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

export const renameGroupChatApi = async (
  chatId: string,
  chatName: string,
  authtoken: string
) => {
  return await axios.post(
    `${process.env.apiUrl}/chat/rename`,
    { chatId, chatName },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const addToGroupApi = async (
  chatId: string,
  userId: string,
  authtoken: string
) => {
  return await axios.put(
    `${process.env.apiUrl}/chat/groupadd`,
    { chatId, userId },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const removeFromGroupApi = async (
  chatId: string,
  userId: string,
  authtoken: string
) => {
  return await axios.put(
    `${process.env.apiUrl}/chat/groupremove`,
    { chatId, userId },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

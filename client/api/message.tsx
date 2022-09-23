import axios from "axios";

export const messagesCountApi = async (chatId: string, token: string) => {
  return await axios.post(
    `${process.env.apiUrl}/messages/count`,
    {
      chatId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchUnreadMessagesApi = async (authtoken: string) => {
  return await axios.get(`${process.env.apiUrl}/unread`, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

// export const fetchMessagesApi = async (chatId: string, authtoken: string) => {
//   return await axios.get(`${process.env.apiUrl}/message/${chatId}`, {
//     headers: {
//       Authorization: `Bearer ${authtoken}`,
//     },
//   });
// };

export const fetchMessagesApi = async (
  chatId: string,
  skip: number,
  authtoken: string
) => {
  return await axios.post(
    `${process.env.apiUrl}/messages`,
    { chatId, skip },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const fetchMoreMessagesApi = async (
  chatId: string,
  skip: number,
  authtoken: string
) => {
  return await axios.get(`${process.env.apiUrl}/message/${chatId}`, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

export const sendMessageApi = async (
  content: string,
  messageType: string,
  chatId: string,
  authtoken: string
) => {
  return await axios.post(
    `${process.env.apiUrl}/message`,
    { content, messageType, chatId },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const updateMessageReadByApi = async (
  chatId: string,
  authtoken: string
) => {
  return await axios.put(
    `${process.env.apiUrl}/message`,
    { chatId },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

import axios from "axios";

export const getContactsApi = async (authtoken: string) => {
  return await axios.get(`${process.env.apiUrl}/user/contacts`, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

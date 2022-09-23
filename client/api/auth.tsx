import axios from "axios";

export const loginApi = async (email: string, password: string) => {
  return await axios.post(`${process.env.apiUrl}/user/login`, {
    email,
    password,
  });
};

export const registerApi = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  return await axios.post(`${process.env.apiUrl}/user`, {
    firstname,
    lastname,
    email,
    password,
  });
};

export const currentUserApi = async (authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/current-user`,
    { withCredentials: true },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateStatusApi = async (status: string, authtoken: string) => {
  return await axios.put(
    `${process.env.apiUrl}/user/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

type Updates = {
  firstname?: string;
  lastname?: string;
  avatarImage?: string;
};

export const updateUserApi = async (updates: Updates, authtoken: string) => {
  return await axios.put(
    `${process.env.apiUrl}/user`,
    { updates },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

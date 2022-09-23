import axios from "axios";

export const uploadImageApi = async (image: string, authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/uploadimage`,
    { image },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const removeImageApi = async (public_id: string, token: string) => {
  return await axios.post(
    `${process.env.apiUrl}/removeimage`,
    { public_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

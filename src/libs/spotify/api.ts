import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const client = () => {
  const defaultOptions = {
    baseURL: "https://api.spotify.com/v1",
  };

  const instance = axios.create(defaultOptions);
  instance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
      if (error.response.status === 401) {
        signOut({
          callbackUrl: "/",
        });
      }

      throw new Error(error.response.data.message);
    }
  );

  return instance;
};

export default client;

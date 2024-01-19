import axios from "./axios";


export const signIn = (
  username: string,
  password: string
): Promise<unknown> => {
  return axios.post("/api/login", {
    username,
    password,
  });
};

export const signUp = async (
  username: string,
  lastname: string,
  firstname: string,
  email: string,
): Promise<unknown> => {
  return axios.post("/api/register", {
    username,
    lastname,
    firstname,
    email,
  });
};

export const lostPassword =
 async (email: string): Promise<unknown> => {
  return axios.post("/api/lost-password", {
    email,
  });
};

export const changePassword =
 async (
  newPassword: string,
  token: string
): Promise<unknown> => {
    return axios.post("/api/change-password", {
      newPassword,
      token,
    });
};

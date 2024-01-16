import axios from "./axios";

export type UserSignUp = {
  username: string;
  lastname: string;
  firstname: string;
  email: string;
};

export const signIn = (
  username: string,
  password: string
): Promise<unknown> => {
  return axios.post("/api/login", {
    username,
    password,
  });
};

export const signUp = async (UserCredentials: UserSignUp): Promise<unknown> => {
  return axios.post("/api/register", UserCredentials);
};

export const changePassword = async (
  newPassword: string,
  token: string
): Promise<unknown> => {
    return axios.post("/api/change-password", {
      newPassword,
      token,
    });
};

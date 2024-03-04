import axios from "./axios";

export const signIn = (
  username: string,
  password: string
): Promise<unknown> => {
  return axios
    .post("/api/login", {
      username,
      password,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const signUp = (
  username: string,
  lastname: string,
  firstname: string,
  email: string
): Promise<unknown> => {
  return axios
    .post("/api/register", {
      username,
      lastname,
      firstname,
      email,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const lostPassword = (email: string): Promise<unknown> => {
  return axios
    .post("/api/lost-password", {
      email,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const changePassword = (
  newPassword: string,
  connfirmPassword: string,
  token: string
): Promise<unknown> => {
  return axios
    .post("/api/change-password", {
      newPassword,
      connfirmPassword,
      token,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

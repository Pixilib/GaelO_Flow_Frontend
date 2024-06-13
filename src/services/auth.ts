import { SignInResponse } from "../utils/types";
import axios from "./axios";

export const signIn = (
  email: string,
  password: string
): Promise<SignInResponse> => {
  return axios
    .post("/api/login", {
      Email : email,
      Password : password,
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
  lastname: string,
  firstname: string,
  email: string
): Promise<void> => {
  return axios
    .post("/api/register", {
      Lastname : lastname,
      Firstname : firstname,
      Email : email,
    })
    .then(function () {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const lostPassword = (email: string): Promise<void> => {
  return axios
    .post("/api/lost-password", {
      Email : email,
    })
    .then(function () {
      return undefined;
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
  confirmPassword: string,
  token: string,
  userId: number
): Promise<void> => {
  return axios
    .post("/api/change-password", {
      NewPassword : newPassword,
      ConfirmationPassword : confirmPassword,
      Token : token,
      UserId : Number(userId),
    })
    .then(() => undefined)
    .catch(error => {
      throw error.response || error;
    });
};

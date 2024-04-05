import { SignInResponse } from "../utils/types";
import axios from "./axios";

export const signIn = (
  username: string,
  password: string
): Promise<SignInResponse> => {
  return axios
    .post("/api/login", {
      Username : username,
      Password : password,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
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
): Promise<void> => {
  return axios
    .post("/api/register", {
      Username : username,
      Lastname : lastname,
      Firstname : firstname,
      Email : email,
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

export const lostPassword = (email: string): Promise<void> => {
  return axios
    .post("/api/lost-password", {
      Email : email,
    })
    .then(function (response) {
      console.log({response})
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
  confirmPassword: string,
  token: string,
  userId: number
): Promise<number> => {
  return axios
    .post("/api/change-password", {
      NewPassword : newPassword,
      ConfirmationPassword : confirmPassword,
      Token : token,
      UserId : Number(userId),
    })
    .then(response => response.data.status)
    .catch(error => {
      console.log({error});
      throw error.response || error;
    });
};

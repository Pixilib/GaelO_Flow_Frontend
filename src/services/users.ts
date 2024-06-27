import { User, UserPayload, UserUpdatePayload } from '../utils/types';
import axios from "./axios";

export const getUsers = (): Promise<User[]> => {
  return axios
    .get("/api/users")
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

export const getUserById = (userId: number): Promise<User[]> => {
  return axios
    .get(`/api/users/${userId}`)
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

export const postUsers = (payload: UserPayload): Promise<number> => {
  return axios
    .post("/api/users", payload)
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

export const updateUser = (userId: number, UserUpdatePayload: UserUpdatePayload): Promise<void> => {
  return axios
    .put(`/api/users/${userId}`, UserUpdatePayload)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}


export const deleteUser = (userId: number): Promise<void> => {
  return axios
    .delete(`/api/users/${userId}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}
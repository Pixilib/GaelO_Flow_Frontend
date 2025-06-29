import { User, UserPayload, UserUpdatePayload } from "../utils/types";
import axios from "./axios";

export const getUsers = (): Promise<User[]> => {
  return axios
    .get("/api/users")
    .then(function (response) {
      const payload = response.data;
      return payload.map((data: Record<string, any>) => ({
        id: data.Id,
        firstname: data.Firstname,
        lastname: data.Lastname,
        email: data.Email,
        roleName: data?.Role?.Name,
        role: {
          name: data?.Role?.Name,
          import: data?.Role?.Import,
          anonymize: data?.Role?.Anonymize,
          export: data?.Role?.Export,
          query: data?.Role?.Query,
          autoQuery: data?.Role?.AutoQuery,
          delete: data?.Role?.Delete,
          admin: data?.Role?.Admin,
          modify: data?.Role?.Modify,
          cdBurner: data?.Role?.CdBurner,
          autoRouting: data?.Role?.AutoRouting,
          readAll: data?.Role?.ReadAll,
        },
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getUserById = (userId: number): Promise<User> => {
  return axios
    .get(`/api/users/${userId}`)
    .then(function (response) {
      const data = response.data;
      return {
        id: data.Id,
        firstname: data.Firstname,
        lastname: data.Lastname,
        email: data.Email,
        roleName: data?.Role?.Name ?? null,
        role: data?.Role ? {
          name: data?.Role.Name,
          import: data?.Role.Import,
          anonymize: data?.Role.Anonymize,
          export: data?.Role.Export,
          query: data?.Role.Query,
          autoQuery: data?.Role.AutoQuery,
          delete: data?.Role.Delete,
          admin: data?.Role.Admin,
          modify: data?.Role.Modify,
          cdBurner: data?.Role.CdBurner,
          autoRouting: data?.Role.AutoRouting,
          readAll: data?.Role.ReadAll,
        } : null,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const postUsers = (data: UserPayload): Promise<number> => {
  const payload = {
    Firstname: data.firstname,
    Lastname: data.lastname,
    Email: data.email,
    RoleName: data.roleName,
    Password: data.password
  };
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

export const updateUser = (
  userId: number,
  userUpdatePayload: UserUpdatePayload
): Promise<void> => {
  const payload = {
    Email: userUpdatePayload.email,
    Firstname: userUpdatePayload.firstname,
    Lastname: userUpdatePayload.lastname,
    RoleName: userUpdatePayload.roleName,
    Password: userUpdatePayload.password
  };
  return axios
    .put(`/api/users/${userId}`, payload)
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
};

import { Role } from '../utils/types';
import axios from "./axios";


export const getRoles = (): Promise<Role[]> => {
  return axios
    .get("/api/roles")
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

export const getRole = (roleName: string): Promise<Role> => {
  return axios
    .get(`/api/roles/${roleName}`)
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

export const updateRole = (role: Role): Promise<void> => {
  return axios
    .put(`/api/roles/${role.Name}`, role)
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

export const deleteRole = (roleName: string): Promise<void> => {
  return axios
    .delete(`/api/roles/${roleName}`)
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

export const postRoles = (payload: Role): Promise<void> => {
  return axios
    .post("/api/roles", payload)
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

export const addLabelToRole = (roleName: string, labelName: string): Promise<void> => {
  return axios
    .post(`/api/roles/${roleName}/label`, {Name : labelName})
    .then(function () {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}

export const removeLabelFromRole = (roleName: string, labelName: string): Promise<void> => {
  return axios
    .delete(`/api/roles/${roleName}/label/${labelName}`)
    .then(function () {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}


export const getLabelsByRoleName = (roleName: string): Promise<string[]> => {
  return axios
    .get(`/api/roles/${roleName}/labels`)
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
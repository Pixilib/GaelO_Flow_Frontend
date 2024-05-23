import { RolesUserResponse, UserResponse, UserPayload, UserUpdatePayload, RoleUser } from '../utils/types';
import axios from "./axios";

export const getRoles = (): Promise<RolesUserResponse> => {
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

export const getRole = (roleName: string): Promise<RoleUser> => {
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

export const updateRole = (roleName: string, RoleUser: RoleUser): Promise<void> => {
  return axios
    .put(`/api/roles/${roleName}`, RoleUser)
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

export const postRoles = (payload: RoleUser): Promise<void> => {
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

export const getUsers = (): Promise<UserResponse> => {
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

export const getUserById = (userId: number): Promise<UserResponse> => {
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
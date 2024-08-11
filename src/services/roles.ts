import { Role } from "../utils/types";
import axios from "./axios";

export const getRoles = (): Promise<Role[]> => {
  return axios
    .get("/api/roles")
    .then(function (response) {
      const data = response.data;
      return data.map((role: any) => ({
        name: role.Name,
        import: role.Import,
        anonymize: role.Anonymize,
        export: role.Export,
        query: role.Query,
        autoQuery: role.AutoQuery,
        delete: role.Delete,
        admin: role.Admin,
        modify: role.Modify,
        cdBurner: role.CdBurner,
        autoRouting: role.AutoRouting,
        readAll: role.ReadAll,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getRole = (roleName: string): Promise<Role> => {
  return axios
    .get(`/api/roles/${roleName}`)
    .then(function (response) {
      const role = response.data;
      return {
        name: role.Name,
        import: role.Import,
        anonymize: role.Anonymize,
        export: role.Export,
        query: role.Query,
        autoQuery: role.AutoQuery,
        delete: role.Delete,
        admin: role.Admin,
        modify: role.Modify,
        cdBurner: role.CdBurner,
        autoRouting: role.AutoRouting,
        readAll: role.ReadAll,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const updateRole = (role: Role): Promise<void> => {
  const payload = {
    Name: role.name,
    Import: role.import,
    Anonymize: role.anonymize,
    Export: role.export,
    Query: role.query,
    AutoQuery: role.autoQuery,
    Delete: role.delete,
    Admin: role.admin,
    Modify: role.modify,
    CdBurner: role.cdBurner,
    AutoRouting: role.autoRouting,
    ReadAll: role.readAll,
  };
  return axios
    .put(`/api/roles/${role.name}`, payload)
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
};

export const postRoles = (role: Role): Promise<void> => {
  const payload = {
    Name: role.name,
    Import: role.import,
    Anonymize: role.anonymize,
    Export: role.export,
    Query: role.query,
    AutoQuery: role.autoQuery,
    Delete: role.delete,
    Admin: role.admin,
    Modify: role.modify,
    CdBurner: role.cdBurner,
    AutoRouting: role.autoRouting,
    ReadAll: role.readAll,
  };
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
};

export const addLabelToRole = (
  roleName: string,
  labelName: string
): Promise<void> => {
  return axios
    .post(`/api/roles/${roleName}/labels`, { Name: labelName })
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

export const removeLabelFromRole = (
  roleName: string,
  labelName: string
): Promise<void> => {
  return axios
    .delete(`/api/roles/${roleName}/labels/${labelName}`)
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
};

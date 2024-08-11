import axios from "axios";
import { Oauth2Config } from "src/utils/types";

export const getOauth2Config = (): Promise<Oauth2Config[]> => {
  return axios
    .get("/api/oauth-config")
    .then((response) => {
      const data = response.data;
      return data.map((config: any) => ({
        name: config.Name,
        provider: config.Provider,
        authorizationUrl: config.AuthorizationUrl,
        clientId: config.ClientId,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
export const postOauth2Config = (data: Oauth2Config): Promise<void> => {
  const payload = {
    Name: data.name,
    Provider: data.provider,
    AuthorizationUrl: data.authorizationUrl,
    ClientId: data.clientId,
  };

  return axios
    .post("/api/oauth-config", payload)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteOauth2Config = (name: string): Promise<void> => {
  return axios
    .delete(`/api/oauth-config/${name}`)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

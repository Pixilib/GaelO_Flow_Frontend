import axios from "axios";
import { Oauth2Config } from "src/utils/types";


export const getOauth2Config = ( ) : Promise<Oauth2Config[]> => {
    return axios
        .get("/api/oauth-config")
        .then((response) => response.data as Oauth2Config[])
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}
export const postOauth2Config = (payload: Oauth2Config): Promise<void> => {
    return axios.post("/api/oauth-config", payload)
        .then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}

export const deleteOauth2Config = (name: string): Promise<void> => {
    return axios.delete(`/api/oauth-config/${name}`)
        .then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};
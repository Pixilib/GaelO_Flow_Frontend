import axios from "axios";
import { Peer } from "../utils/types";


function handleAxiosError(error: any) {
    if (error.response) {
        throw error.response;
    }
    throw error;
}
export const updatePeer = (name: string, url :string, username :string, password :string
): Promise<void> => {
    const payload = {
        Url : url,
        Username : username,
        Password : password
    };

    return axios.put(`/api/peers/${name}`, payload)
        .then(response => response.data)
        .catch(handleAxiosError);
};
export const deletePeer = (name: string): Promise<void> => {
    return axios.delete(`/api/peers/${name}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

export const getPeers = (): Promise<Peer[]> => {
    return axios.get("/api/peers?expand")
        .then(response => {
            return Object.entries(response.data).map(([name, peer]) => {
                return {
                    name : name,
                    url : peer.Url,
                    username: peer.Username,
                    password: peer.Password
                }
            })
        })
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};
export const echoPeer = (name: string): Promise<void> => {
    return axios.get("/api/peers/" + name + "/system")
        .then(() => undefined)
        .catch(handleAxiosError);
};
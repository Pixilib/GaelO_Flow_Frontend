import axios from "axios";

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
    port: number;
    ipAddress: string;
    password: string;
}
function handleAxiosError(error: any) {
    if (error.response) {
        throw error.response;
    }
    throw error;
}
export const updatePeer = (
    peer: PeerData
): Promise<Peer> => axios.get(`/api/peers/${peer.Name}`, peer)
    .then(response => response.data)
    .catch(handleAxiosError);

export const deletePeer = (peername: string): Promise<void> => {
    return axios.delete(`/api/peers/${peername}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

export const getPeers = (): Promise<PeerData[]> => {
    return axios.get("/api/peers")
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};
export const echoPeer = (name :string): Promise<void> => {
    return axios.post("/api/peers/" + name + "/echo")
        .then(() => undefined)
        .catch(handleAxiosError);
};
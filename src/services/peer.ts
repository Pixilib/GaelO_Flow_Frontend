import axios from "axios";

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
}

export const createPeer = (peerData: PeerData): Promise<PeerData> => {
    return axios.post("/api/peers", peerData)
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

export const updatePeer = (peername: string, peerData: PeerData): Promise<PeerData> => {
    return axios.put(`/api/peers/${peername}`, peerData)
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

export const deletePeer = (peername: string): Promise<void> => {
    return axios.delete(`/api/peers/${peername}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

import { AutoRoutingItems, AutoRoutingPayload } from "../utils/types";
import axios from "./axios";

export const getAutoRoutingItems = (): Promise<AutoRoutingItems[]> => {
    return axios
        .get("/api/autorouting")
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const createAutoRoutingItem = (
    payload: AutoRoutingPayload
): Promise<void> => {
    return axios
        .post("/api/autorouting", payload)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}

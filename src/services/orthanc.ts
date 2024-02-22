import axios from "axios";

export const apiSystem = 
async ():Promise<unknown> => {
    return axios.get("/api/system");
}

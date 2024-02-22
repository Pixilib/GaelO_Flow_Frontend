import axios from "axios";

export const apiSystem = 
async ():Promise<unknown> => {
    return axios.get("/api/system");
}


export const lostPassword =
 async (email: string): Promise<unknown> => {
  return axios.post("/api/lost-password", {
    email,
  });
};
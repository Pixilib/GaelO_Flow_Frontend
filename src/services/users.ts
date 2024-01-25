import axios from './axios';

export const getUsers = () : Promise<unknown> =>{
    return axios.get('/api/users');
}
import axios from './axios';

export const getOptions = () :Promise<unknown> =>{
    return axios.get('/api/options').then(response => response.data);
}
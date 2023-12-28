import axios from 'axios';

export const signIn = (username: string, password: string): Promise<unknown> => {
    return axios.post('/api/login', {
        username,
        password
    });
};


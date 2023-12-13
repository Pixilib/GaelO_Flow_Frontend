import axios from 'axios';

export const signIn = async (username: string, password: string): Promise<unknown> => {
    const payload = {
        username: username,
        password: password
    }

    return axios.post('/api/auth/login', payload);
};
import axios from 'axios';

export const signIn = async (username: string, password: string): Promise<unknown> => {
    try{
        const response = await axios.post('/api/auth/login', {
            username,
            password
        });
        console.log({ response })
        return response;
    }catch(error){
        console.log(error);
        return error;
    }
};
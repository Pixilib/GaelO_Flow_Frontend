import axios from 'axios';

export type UserSignUp = {
    username: string;
    lastname:string;
    firstname:string;
    email:string;
};

export const signIn = async (username: string, password: string): Promise<unknown> => {
    try{
        const response = await axios.post('/api/login', {
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

export const signUp = async (UserCredentials: UserSignUp): Promise<unknown> => {
    try{
        const response = await axios.post('/api/register', {
            ...UserCredentials
        });
        return response;
    }catch(error){
        if (axios.isAxiosError(error)) {
            return Promise.reject(error);
        } else {
            return Promise.reject(new Error('Unknown error'));
        }
    }
}


    export const changePassword = async (newPassword: string, token: string): Promise<unknown> => {
        try{
            const response = await axios.post('/api/change-password', {
                newPassword,
                token
            });
            return response;
        }catch(error){
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error('Unknown error'));
            }
        }
    }
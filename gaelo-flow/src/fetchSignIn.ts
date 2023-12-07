import {usePost} from './useFetch';

/**
 * 
export const fetchSignIn = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
};

 */

export const fetchSignIn = async (username: string, password: string) => {
    const response = await usePost('http://localhost:3000/api/auth/signin', { username, password });
    console.log(response)
    return response
}
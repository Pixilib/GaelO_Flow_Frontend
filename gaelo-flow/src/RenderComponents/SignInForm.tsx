import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/UserSlice';

type SignInRequest = { username: string; password: string; };
type SignInResponse = { token: string; };

export const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const dispatch = useDispatch();

    const signInFetch = async (data: SignInRequest): Promise<SignInResponse> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log('Requête envoyée au serveur');
            console.table({data})
            console.log('Status:', response.status);
            console.log('Headers:', response.headers);

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erreur de connexion: ${response.status} - ${errorBody}`);
            }

            const responseData = await response.json();
            console.log('Réponse du serveur:', responseData);
            return responseData;
        } catch (error) {
            console.error('Erreur lors de la requête fetch', error);
            throw error;
        }
    };

    const onLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Tentative de connexion avec les identifiants: ", { username, password });

        try {
            const responseData = await signInFetch({ username, password });
            dispatch(login({ token: responseData.token, userId: username }));
            setIsLogged(true);
            console.log(`${username} is logged in !`);
        } catch (error) {
            console.error('Erreur de connexion', error);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome back !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Please Log in to your Account.</p>
            <div className="mb-4 w-full">
                <label className="block text-gray-00 font-bold mb-3" htmlFor="username">Username:</label>
                <Input bordered placeholder="Enter your username" value={username} onChange={(event) => setUsername(event.target.value)}></Input>
                {isLogged && <p className="text-green-500 text-center">{username} is logged in !</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-3" htmlFor="password">Password:</label>
                <Input bordered placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} type="password"></Input>
                <div className="w-full flex justify-center">
                    <Button color="purple" onClick={onLogin} bordered disabled={username.length === 0 || password.length === 0}>Connect</Button>
                </div>
            </div>
        </div>
    );
};

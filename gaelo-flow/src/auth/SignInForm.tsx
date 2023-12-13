import React, { useState } from 'react';
import { useSignIn } from './useSignIn'; // Assure-toi que le chemin d'importation est correct
import Button from '../RenderComponents/Button';
import Input from '../RenderComponents/Input';


export const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: signIn,isError, error } = useSignIn();

    const onLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Attempting to connect with credentials:", { username, password });
        signIn({ username, password });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome back !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Please Log in to your Account.</p>
            <div className="mb-4 w-full">
                <label className="block text-gray-00 font-bold mb-3" htmlFor="username">Username:</label>
                <Input bordered placeholder="Enter your username" value={username} onChange={(event) => setUsername(event.target.value)} />
                {isError && <p className="text-red-500 text-center">{error?.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-3" htmlFor="password">Password:</label>
                <Input bordered placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
                <div className="w-full flex justify-center">
                    <Button color="purple" onClick={onLogin} bordered disabled={username.length === 0 || password.length === 0}>Connect</Button>
                </div>
            </div>
        </div>
    );
};

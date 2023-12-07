import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';


export const SignInForm = () => {
    const [, setUsername] = useState('');
    const [, setMobileNumber] = useState('');

    const handleConnect = (event: React.FormEvent) => {
        event.preventDefault();
        // Logique de connexion ici
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome back !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Please Log in to your Account.</p>

            <div className="mb-4 w-full">
                <label className="block text-gray-00 font-bold mb-3" htmlFor="username">Username:</label>
                <Input bordered placeholder="Enter your username"></Input>
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-3" htmlFor="mailAddress">Email Address:</label>
                <Input bordered placeholder="Enter your mail"></Input>
                <div className="w-full flex justify-center">
                    <Button color="purple" bordered onClick={handleConnect}>Connect</Button>
                </div><hr className="my-10 border-orange-300" />
            </div>

        </div>
    );
};
// TODO : Use lib @pixilib/gaeloUI instead

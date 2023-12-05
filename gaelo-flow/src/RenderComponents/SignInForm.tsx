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
            <p className="text-lg text-gray-600 text-center mb-8">Please Log in to your Account.</p>

            <div className="mb-4 w-full">
                <label className="block text-gray-900 font-bold mb-2" htmlFor="username">Username:</label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="mailAddress">Email Address:</label>
                <Input bordered></Input>

                <div className="w-full flex justify-center">
                    <Button color="purple" bordered>Connect</Button>
                </div><hr className="my-10 border-orange-300" /><div className="flex justify-between">
                    <p className="text-gray-600">Already have an account?</p>
                    <p className="text-gray-600">Login to your account</p>
                </div>
            </div>

        </div>
    );
};
// TODO : Use lib @pixilib/gaeloUI instead

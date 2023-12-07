import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import LockLogo from './../assets/lock.svg';


export const SignInForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    console.log(LockLogo)

    const handleConnect = (event: React.FormEvent) => {
        event.preventDefault();
        // Logique de connexion ici
    };

    const onLogin = () => {
        console.log("j'apelle l'api" + username + password)
    }

    return (
        <div>
            <h1 className="text-5xl font-bold text-center mb-8">Welcome !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Please Log in to your Account.</p>

            <div className="mb-4 w-full relative">
                <label className="block text-gray-800 font-bold mb-2" htmlFor="username">Username:</label>
                <div className="relative flex">
                    <Input
                        bordered
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                    <img src="/user.svg" className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6" alt="user-icon" />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-3" htmlFor="mailAddress">Password:</label>
                <Input bordered
                    placeholder="Enter your password"
                    value={password} onChange={(event) => { setPassword(event.target.value) }}
                    svg={<img src="/lock.svg" className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6" alt="user-icon" />}
                    />


                <div className="w-full flex justify-center">
                    <Button

                        color="purple"
                        onClick={() => onLogin(true)} bordered disabled={(username.length == 0 || password.length == 0)}>Connect</Button>
                </div><hr className="my-10 border-orange-300" />
            </div>

        </div>
    );
};
// TODO : Use lib @pixilib/gaeloUI instead

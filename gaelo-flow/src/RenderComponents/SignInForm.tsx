import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useCustomMutation } from '../utils/useFetch';
import axios from 'axios';
import ChevronRight from './../assets/chevron-right.svg?react'
import User from './../assets/user.svg?react'
import Lock from './../assets/lock.svg?react'

type SignInRequest = { username: string; password: string; };
type SignInResponse = { token: string; };

export const SignInForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(false)

    //const [isError, setIsError] = useState(false)

    const signInFetch = async (data: SignInRequest): Promise<SignInResponse> => {
        const response = await axios.post('api/auth/login', data);
        return response.data;
    };

    const { mutate: signIn, isError, error } = useCustomMutation<SignInResponse, Error, SignInRequest>(
        signInFetch,
        'Connexion réussie', // Message de succès
        [], // Clés de requête à invalider après la mutation
        {
            onSuccess: () => {
                setIsLogged(true);
                console.log(`${username} is logged in !`);
            },
            onError: (err) => {
                // Gestion de l'erreur
                console.error('Erreur de connexion', err);
            }
        }
    );


    const onLogin = () => {
        console.log("j'ai cliqué sur Connect")
    };

    //TODO : redirect route after login
    //TODO: disabled button connect if clicked

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-5xl font-bold text-center mb-6">Welcome !</h1>
            <p className="text-lg text-gray-700 text-center mb-12">Please Log in to your Account.</p>
            {isError && <p className="text-red-500 text-center">Error: {error?.message}</p>}

            <div className="w-full space-y-3">
                <Input
                    label='Username :'
                    className='w-full'
                    svg={<User/>}
                    bordered
                    placeholder="Enter your username"
                    value={username}
                    onChange={(event) => { setUsername(event.target.value) }}
                />
                <Input
                    label='Password :'
                    svg={<Lock/>}
                    bordered
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <Button
                    className="w-full"
                    color="purple"
                    onClick={() => onLogin()} bordered disabled={(username.length == 0 || password.length == 0)}>
                    <div className='w-1/2 flex justify-around'>
                        Connect
                        <ChevronRight />
                    </div>
                </Button>
            </div>


        </div>
    );
};

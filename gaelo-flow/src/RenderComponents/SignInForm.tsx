import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useGenericMutation } from '../utils/useFetch';


type SignInRequest = { username: string; password: string; };
type SignInResponse = { token: string; };
export const SignInForm = () => {

      const { mutate: signIn, isError, error } = useGenericMutation<SignInResponse, SignInRequest>(
        'signIn', 
        'api/auth/login',
    );
      

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [isError, setIsError] = useState(false)
    
      const onLogin = (event: React.FormEvent) => {
        console.log("j'ai cliqué sur Connect")
        event.preventDefault();
        signIn({ username, password });
        console.log("j'apelle l'api " + username + password)
        ;
    };



    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome back !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Please Log in to your Account.</p>
            {isError && <p className="text-red-500 text-center">Error: {error?.message}</p>}

            <div className="mb-4 w-full">
                <label className="block text-gray-00 font-bold mb-3" htmlFor="username">Username:</label>
                <Input bordered placeholder="Enter your username" value={username} onChange={(event)=>{setUsername(event.target.value)}}></Input>
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-3" htmlFor="mailAddress">Password:</label>
                <Input bordered placeholder="Enter your password" value={password} onChange={(event)=>{setPassword(event.target.value)}} type="password"></Input>
                <div className="w-full flex justify-center">
                    <Button color="purple" onClick={onLogin} bordered disabled={(username.length==0 || password.length ==0)}>Connect</Button>
                </div><hr className="my-10 border-orange-300" />
            </div>

        </div>
    );
};

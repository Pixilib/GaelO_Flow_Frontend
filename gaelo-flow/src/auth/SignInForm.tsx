import { ChangeEvent, useState } from 'react';
import Button from '../RenderComponents/Button';
import Input from '../RenderComponents/Input';
import { useCustomMutation } from '../utils/reactQuery';
import { signIn } from '../services/auth';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/UserSlice';
import { toastError } from '../utils/toastify';
import ChevronRight from './../assets/chevron-right.svg?react'
import User from './../assets/user.svg?react'
import Lock from './../assets/lock.svg?react'


export const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const loginMutation = useCustomMutation(
        ({ username, password }) => signIn(username, password),
        null,
        [],
        {
            onSuccess: (data: Record<string, any>) => {
                const decodedToken  : Record<string, any>= jwtDecode(data.token);
                dispatch(login({ token: data.token, userId: decodedToken.userId }));
            },
            onError: () => {
                toastError('Error in creadentials')
            }
        })

    const onLogin = async () => {
        loginMutation.mutate({ username, password });
    };

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-5xl font-bold text-center mb-6">Welcome !</h1>
            <p className="text-lg text-gray-700 text-center mb-12">Please Log in to your Account.</p>
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

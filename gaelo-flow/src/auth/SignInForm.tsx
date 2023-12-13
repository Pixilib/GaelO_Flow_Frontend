import { ChangeEvent, useState } from 'react';
import Button from '../RenderComponents/Button';
import Input from '../RenderComponents/Input';
import { useCustomMutation } from '../utils/reactQuery';
import { signIn } from '../services/auth';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/UserSlice';
import { toastError } from '../utils/toastify';


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
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome back !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Please Log in to your Account.</p>
            <div className="mb-4 w-full">
                <label className="block text-gray-00 font-bold mb-3" htmlFor="username">Username:</label>
                <Input bordered placeholder="Enter your username" value={username} onChange={(event :ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-3" htmlFor="password">Password:</label>
                <Input bordered placeholder="Enter your password" value={password} onChange={(event :ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} type="password" />
                <div className="w-full flex justify-center">
                    <Button color="purple" onClick={onLogin} bordered disabled={username.length === 0 || password.length === 0}>Connect</Button>
                </div>
            </div>
        </div>
    );
};

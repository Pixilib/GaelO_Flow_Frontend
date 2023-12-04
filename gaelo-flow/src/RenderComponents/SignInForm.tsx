import React, { useState } from 'react';


export const SignInForm = () => {
    const [, setUsername] = useState('');
    const [, setMobileNumber] = useState('');

    const handleConnect = (event: React.FormEvent) => {
        event.preventDefault();
        // Logique de connexion ici
    };

    return (
        <div className="p-4 md:p-8  w-3/4 mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Welcome back !</h1>
            <p className="text-lg text-gray-600 text-center mb-8">Please Log in to your Account.</p>
            <div className="mb-4 w-full">
                <label htmlFor="username" className="block text-gray-900 text-sm font-bold mb-2">Username</label>
                <input className= "border w-full rounded border-gray-300 text-red-900"type="text" onChange={(e) => setUsername(e.target.value)}  />
            </div>
            <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-gray-900 text-sm font-bold mb-2">Email Adress </label>
                <input className= "border rounded border-gray-300"type="text" onChange={(e) => setUsername(e.target.value)}  />
            </div>
            <div className="w-full flex justify-center">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Connect
                </button>
            </div>
            <hr className="my-10 border-orange-300" />
            <div className="flex justify-between">
            <p className="text-gray-600">Already have an account?</p>
            <p className="text-gray-600">Login to your account</p>
        </div>
        </div>
    );
};
// TODO : Use lib @pixilib/gaeloUI instead

import React, { useState } from 'react';


export const SignInForm = () => {
    const [, setUsername] = useState('');
    const [, setMobileNumber] = useState('');

    const handleConnect = (event: React.FormEvent) => {
        event.preventDefault();
        // Logique de connexion ici
    };

    return (
        <form onSubmit={handleConnect} className="bg-white p-4 md:p-8 rounded-lg shadow-md w-3/4 mx-auto">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                <input type="tel" id="mobileNumber" onChange={(e) => setMobileNumber(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-end">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Connect
                </button>
            </div>
        </form>
    );
};
// TODO : Use lib @pixilib/gaeloUI instead

import React from 'react';

const LogInForm = () => {
    return (
        <form className="bg-green-200 rounded-lg shadow-md px-8 py-10 m-6 w-full max-w-md mx-auto space-y-6">
            <h2 className="text-center text-4xl mb-10 font-bold text-green-900">Login</h2>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-200"
            >
                Log In
            </button>
        </form>
    );
};

export default LogInForm;
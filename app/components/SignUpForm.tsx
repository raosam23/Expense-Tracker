'use client';
import React, {useState} from 'react';
import Link from "next/link";
import {UserType} from "@/app/types/UserType";
import axios from "axios";
import { signIn } from 'next-auth/react';

const SignUpForm = () => {
    const [userData, setUserData] = useState<UserType>({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUserData((prevData: UserType) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleBtnOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userData);
        try {
            const response = await axios.post('/api/signup', userData);
            if(response.status === 200) {
                await signIn("credentials", {
                    username: userData.username,
                    password: userData.password,
                    callbackUrl: "/",
                });
            }
            console.log('response', response.data);
        } catch (error: unknown) {
            const err = error as Error;
            console.log(err.message);
        } finally {
            setUserData({
                fullName: '',
                username: '',
                email: '',
                password: '',
            })
        }
    }

    const checkIfUserDataEmpty: () => boolean = (): boolean => {
        return userData.fullName === '' || userData.username === '' || userData.email === '' || userData.password === '';
    }
    return (
        <form
            className="bg-green-200 rounded-lg shadow-md px-8 py-10 m-6 w-full max-w-md mx-auto space-y-6"
            onSubmit={handleBtnOnSubmit}
        >
            <h2 className="text-center text-4xl mb-10 font-bold text-green-900">SignUp</h2>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Full Name</label>
                <input
                    type="text"
                    placeholder="Enter your Full Name"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                    value={userData?.fullName}
                    name="fullName"
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Username</label>
                <input
                    type="text"
                    placeholder="Enter your Username"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                    value={userData?.username}
                    name="username"
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Email</label>
                <input
                    type="Email"
                    placeholder="Enter your email"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                    value={userData?.email}
                    name="email"
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                    value={userData?.password}
                    name="password"
                    onChange={handleOnChange}
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={checkIfUserDataEmpty()}
                >
                    Sign Up
                </button>
            </div>
            <p className="text-sm text-center">
                Already have an account?&nbsp;<strong><Link href="/login">Log in</Link></strong>
            </p>
        </form>
    );
};

export default SignUpForm;
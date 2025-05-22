'use client';
import React, {useState} from 'react';
import Link from "next/link";
import {UserType} from "@/app/types/UserType";
import axios from "axios";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SmallLoadingSpinner } from './LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';

const SignUpForm = () => {
    const router: AppRouterInstance = useRouter();
    const [userData, setUserData] = useState<UserType>({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUserData((prevData: UserType) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleBtnOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        console.log(userData);
        setIsLoading(true);
        try {
            const response = await axios.post('/api/signup', userData);
            if(response.status === 200) {
                await signIn("credentials", {
                    username: userData.username,
                    password: userData.password,
                    redirect: false
                });
                router.push('/');
                setIsLoading(false);
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 409) {
                    setError("User already exists");
                    console.warn(e);
                    setIsLoading(false);
                } else {
                    setError("Something went wrong, try again later");
                    console.error(e);
                    setIsLoading(false);
                }
            } else {
                const err = e as Error;
                setError(err.message);
                console.error(err.message);
                setIsLoading(false);
            }
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
                <div className='relative'>
                <input
                    type={!showPassword ? "password" : "text"}
                    placeholder="Enter your password"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                    value={userData?.password}
                    name="password"
                    onChange={handleOnChange}
                />
                    <button className='absolute right-2 top-1/2 mr-1.5   transform -translate-y-1/2 text-sm text-green-500 cursor-pointer' 
                    onClick={(event:React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                    }}
                    onMouseLeave={()=> {
                        setShowPassword(false);
                    }}
                    onMouseDown={()=>{
                        setShowPassword(true);
                    }} onMouseUp={()=>{
                        setShowPassword(false);
                    }}>
                        {showPassword ? (<Eye color='green' size={20} />) : (<EyeOff color='green' size={20}/>)}
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={checkIfUserDataEmpty() || isLoading}
                >
                    Sign Up
                </button>
            </div>
            {error && (
                <div className='text-red-600 text-sm text-center font-medium'>
                    {error}
                </div>
            )}
            {isLoading && (
                <div className='flex justify-center items-center h-full'>
                    <SmallLoadingSpinner />
                </div>
            )}
            {!isLoading && <p className="text-sm text-center">
                Already have an account?&nbsp;<strong><Link href="/login">Log in</Link></strong>
            </p>}
        </form>
    );
};

export default SignUpForm;
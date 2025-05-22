'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { UserType } from "@/app/types/UserType";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SmallLoadingSpinner } from './LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';

const LogInForm = () => {
    const router: AppRouterInstance = useRouter();
    const [userData, setUserData] = useState<UserType>({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevData: UserType) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleBtnOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null)
        console.log(userData);
        setIsLoading(true);
        try {
            const response = await signIn("credentials", {
                username: userData.username,
                password: userData.password,
                redirect: false,
            });
            if (response?.error) {
                const msg = "Username or password is incorrect"
                setError(msg);
                console.warn(error);
                setIsLoading(false);
            } else if (response?.ok) {
                router.push('/');
                setIsLoading(false);
            }
        } catch (error: unknown) {
            const err = error as Error;
            console.error(err.message);
            setError(err.message);
            setIsLoading(false);
        }
    }

    const checkIfUserDataEmpty: () => boolean = (): boolean => {
        return userData.username === '' || userData.password === '';
    }

    return (
        <form
            className="bg-green-200 rounded-lg shadow-md px-8 py-10 m-6 w-full max-w-md mx-auto space-y-6"
            onSubmit={handleBtnOnSubmit}
        >
            <h2 className="text-center text-4xl mb-10 font-bold text-green-900">Login</h2>
            <div>
                <label className="block text-sm font-medium text-green-800 mb-2">Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2
                    focus:ring-green-500"
                    value={userData.username}
                    name="username"
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
                        value={userData.password}
                        name="password"
                        onChange={handleOnChange}
                    />
                    <button className='absolute right-2 top-1/2 mr-1.5   transform -translate-y-1/2 text-sm text-green-500 cursor-pointer'
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                        }}
                        onMouseLeave={()=> {
                            setShowPassword(false);
                        }}
                        onMouseDown={() => {
                            setShowPassword(true);
                        }} onMouseUp={() => {
                            setShowPassword(false);
                        }}>
                        {showPassword ? (<Eye color='green' size={20} />) : (<EyeOff color='green' size={20} />)}
                    </button>
                </div>

            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={checkIfUserDataEmpty() || isLoading}
                    className="w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Log In
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
                Don&apos;t have an account?&nbsp;<strong><Link href="/signup">Sign up</Link></strong>
            </p>
            }
        </form>
    );
};

export default LogInForm;
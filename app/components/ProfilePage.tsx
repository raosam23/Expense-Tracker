'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

const ProfilePage = () => {
    const { data: session } = useSession();
    const handleDeleteAccount = async () => {
        try {
            const res = await axios.delete('/api/delete-account');
            if (res.status === 200) {
                signOut({ callbackUrl: '/login' });
            } else {
                console.error('Failed to delete the account');
            }
        } catch (error: unknown) {
            const err = error as Error;
            console.error(err.message);
        }
    }
    return (
        <div className='p-5'>
            <h1 className='text-4xl font-bold mb-5 text-center'>Profile</h1>
            <h2 className='text-3xl font-bold mb-3'>Hello {session?.user?.name}</h2>
            <p className='text-xl font-semibold mb-2'>Logged in as: {session?.user?.email}</p>
            <div className='space-x-5'>
                <button
                    className='bg-green-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-green-600'
                    onClick={() => signOut({ callbackUrl: '/login' })}
                >
                    Logout
                </button>
                <button
                    className='bg-red-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-red-600'
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </div>

        </div>
    )
}

export default ProfilePage
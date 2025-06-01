'use client';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from './LoadingSpinner';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleDeleteAccountBtn = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete('/api/delete-account');
      if (res.status === 200) {
        signOut({ redirect: false }).then(() => {
          router.push('/login');
          setIsLoading(false);
        });
      } else {
        console.error('Failed to delete the account');
        setIsLoading(false);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error(err.message);
      setIsLoading(false);
    }
  };

  const handleLogOutBtn = () => {
    setIsLoading(true);
    signOut({ redirect: false }).then(() => {
      router.push('/login');
      setIsLoading(false);
    });
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-5">
          <h1 className="text-4xl font-bold mb-5 text-center">Profile</h1>
          <h2 className="text-3xl font-bold mb-3">Hello {session?.user?.name}</h2>
          <p className="text-xl font-semibold mb-2">Logged in as: {session?.user?.email}</p>
          <div className="space-x-5">
            <button
              className="bg-green-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-green-600"
              onClick={handleLogOutBtn}
            >
              Logout
            </button>
            <button
              className="bg-red-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-red-600"
              onClick={handleDeleteAccountBtn}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;

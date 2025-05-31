import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

const HeroSignUp = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col space-y-10 my-10">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold">Take Control of Your Finances</h1>
        <p className="text-xl font-light text-left max-w-5/6">
          Join us today and start tracking your expenses effortlessly with our easy-to-use platform.
        </p>
      </div>
      <div className="space-x-5">
        <Link href={!session ? '/login' : '/add'}>
          <button className="bg-green-800 text-green-100 px-6 py-2 rounded hover:bg-green-950 cursor-pointer transition duration-200">
            {!session ? 'LogIn' : 'Add Transactions'}
          </button>
        </Link>
        <Link href="/about">
          <button
            className="border border-green-900 text-green-900 px-6 py-2 rounded hover:bg-green-900
            hover:text-green-100 cursor-pointer transition duration-200"
          >
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSignUp;

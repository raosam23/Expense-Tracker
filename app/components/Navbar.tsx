'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between">
      <div className="flex flex-row items-end-safe space-x-10">
        <div className="text-green-900 text-4xl font-bold">
          <Link href="/">💸 Expense Tracker</Link>
        </div>
        <div className="flex space-x-7">
          <Link href="/add">Add Transaction</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      <div className="flex space-x-10">
        {!session ? <Link href="/login">Login</Link> : <Link href="/profile">{session.user?.name}</Link>}
      </div>
    </nav>
  );
}

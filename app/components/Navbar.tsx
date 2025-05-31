'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Navbar() {
  const { data: session } = useSession();
  const { isDarkMode, toggleDarkMode, setInitialTheme } = useThemeStore();

  useEffect(() => {
    setInitialTheme();
  }, []);

  return (
    <nav className="flex items-center justify-between bg-customColor">
      <div className="flex flex-row items-center space-x-10">
        <div
          className={`${isDarkMode ? 'text-green-200' : 'text-green-900'} text-4xl font-bold transition duration-1000`}
        >
          <Link href="/">💸 Expense Tracker</Link>
        </div>
        <div className="flex space-x-7">
          <Link href="/add">Add Transaction</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      <div className="flex space-x-10 items-center">
        {!session ? <Link href="/login">Login</Link> : <Link href="/profile">{session.user?.name}</Link>}
        <div className="cursor-pointer transition duration-1000" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </div>
      </div>
    </nav>
  );
}

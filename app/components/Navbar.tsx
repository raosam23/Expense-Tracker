'use client';
import { useSession } from "next-auth/react";
import React from "react"
import Link from "next/link";

export default function Navbar() {
    const { data : session } = useSession();
    return (
        <nav className="flex items-center justify-between">
            <div className="text-green-900 text-4xl font-bold">
                <Link href="/">💸 Expense Tracker</Link>
            </div>
            <div className="flex space-x-10">
                <Link href="/add">Add Expenses</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/about">About</Link>
                {!session ? <Link href="/login">Login</Link> : <Link href="/profile">{session.user?.name}</Link>}
            </div>
        </nav>
    )
}
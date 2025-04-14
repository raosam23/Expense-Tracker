import React from "react"
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between">
            <div className="text-green-900 text-4xl font-bold">
                <Link href="/">💸 Expense Tracker</Link>
            </div>
            <div className="flex space-x-10">
                <Link href="/add">Add Expenses</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/about">About</Link>
                <Link href="/login">Login</Link>
            </div>
        </nav>
    )
}
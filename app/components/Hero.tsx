import React from 'react';
import Link from "next/link";
const Hero = () => {
    return (
        <div className="text-center p-10 bg-green-100 min-h-full shadow-md">
            <h1 className="text-4xl font-bold text-green-900 text-center mb-3">
                Track your spending. Own your Finances.
            </h1>
            <p className="my-4 text-lg text-center font-bold text-green-800 max-w-xl mx-auto">
                A simple and intuitive full-stack expense tracker to manage your income and expenses.
                All in one place
            </p>
            <div className="flex justify-center my-4 gap-10">
                <Link href="/add">
                    <button className="bg-green-600 text-green-100 px-6 py-2 rounded hover:bg-green-700 cursor-pointer">
                        Getting Started
                    </button>
                </Link>
                <Link href="/dashboard">
                    <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-700
                    hover:text-green-100 cursor-pointer">
                        View the dashboard
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-xl mx-auto mt-10">
                <div className="bg-green-50 p-6 rounded shadow text-left">
                    <h3 className="text-xl font-bold text-green-900 mb-2">📊 Dashboard Overview</h3>
                    <p className="text-sm font-thin text-green-950">See your incomes, expenses at a glance.</p>
                </div>
                <div className="bg-green-50 p-6 rounded shadow text-left">
                    <h3 className="text-xl font-bold text-green-900 mb-2">🤑 Add Transactions Quickly</h3>
                    <p className="text-sm font-thin text-green-950">Add incomes and expenses quickly with category and amount.</p>
                </div>
                <div className="bg-green-50 p-6 rounded shadow text-left">
                    <h3 className="text-xl font-bold text-green-900 mb-2">📆 View your History</h3>
                    <p className="text-sm font-thin text-green-950">Access and filter your transactions anytime.</p>
                </div>
                <div className="bg-green-50 p-6 rounded shadow text-left">
                    <h3 className="text-xl font-bold text-green-900 mb-2">📈 Visual Insights</h3>
                    <p className="text-sm font-thin text-green-950">Track your trend with insightful charts.</p>
                </div>
            </div>
        </div>
    )
}
export default Hero;
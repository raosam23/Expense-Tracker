'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TransactionType } from "@/app/types/TransactionType";
import { useSession } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

export default function OneTransaction(props: { id: string }) {
    const [transactionData, setTransactionData] = useState<TransactionType[] | undefined>();
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const username = session?.user?.email;
    const handleOnDelete = async () => {
        try {
            if (username) {
                const res = await axios.delete('/api/transaction', {
                    params: { id: props.id },
                });
                if (res.status === 200) {
                    alert('Transaction has been deleted');
                    router.push('/dashboard');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (username) {
                    const res = await axios.get('/api/transaction', {
                        params: { username }
                    });
                    if (res.status === 200) {
                        const allTransactions = res.data.transactions;
                        const specificTransaction = allTransactions.filter((trans: TransactionType) => trans.id === props.id);
                        setTransactionData(specificTransaction);
                    }
                }
            } catch (e) {
                console.error(`Failed to fetch data: ${e}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);

    const transaction = transactionData?.find(t => String(t.id) === props.id);
    const router: AppRouterInstance = useRouter();
    return (
        <div className="flex justify-center items-center">
            {loading ? (
                <LoadingSpinner />
            ) : transaction ? (
                <div className="bg-green-200 shadow-xl rounded-lg p-10 w-full max-w-md min-h-fit text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {`${transaction.type}:  ${transaction.title}`}
                    </h1>
                    <h2 className="text-lg text-gray-500 mb-6">
                        {transaction.note}
                    </h2>
                    <h3 className="text-sm text-gray-400 mb-6">
                        {transaction.createAt}
                    </h3>
                    {transaction.type === "EXPENSE" ? (
                        <div className="text-2xl font-bold text-red-600">
                            ₹{transaction.amount}
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-green-600">
                            ₹{transaction.amount}
                        </div>
                    )}
                    <div className="flex justify-center space-x-4 m-4">
                        <div className="bg-red-500 text-white w-fit p-2 rounded hover:bg-red-600">
                            <button onClick={handleOnDelete}>Delete</button>
                        </div>
                        <div className="bg-green-500 text-white w-fit p-2 rounded hover:bg-green-600">
                            <button onClick={() => router.back()}>Back</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-red-600 text-lg">Transaction not found</div>
            )}
        </div>
    );
}
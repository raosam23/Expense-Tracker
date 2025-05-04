'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

type Transactionality = {
    _id: number,
    amount: number,
    title: string,
    category: string,
    create_at: string,
};

export default function OneTransaction(props: { id: string, type: string }) {
    const [transactionData, setTransactionData] = useState<Transactionality[] | undefined>();
    const [loading, setLoading] = useState(true);
    const handleOnDelete =  async () => {
        try {
            if(props.type === 'income')
                await axios.delete('/api/addIncome?id='+props.id);
            else if(props.type === 'expenses')
                await axios.delete('/api/addExpense?id='+props.id);
            router.back();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    props.type === 'income' ? '/api/addIncome' : '/api/addExpense'
                );
                setTransactionData(res.data.data);
            } catch (e) {
                console.error(`Failed to fetch data: ${e}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [props.type]);

    const transaction = transactionData?.find(t => String(t._id) === props.id);
    const router: AppRouterInstance = useRouter();
    return (
        <div className="flex justify-center items-center">
            {loading ? (
                <div className="text-gray-700 text-lg">Loading transaction...</div>
            ) : transaction ? (
                <div className="bg-green-200 shadow-xl rounded-lg p-10 w-full max-w-md min-h-fit text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {`${props.type}:  ${transaction.title}`}
                    </h1>
                    <h2 className="text-lg text-gray-500 mb-6">
                        {transaction.category}
                    </h2>
                    <h3 className="text-sm text-gray-400 mb-6">
                        {transaction.create_at}
                    </h3>
                    {props.type === "expenses" ? (
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
                            <button onClick={() => router.back() }>Back</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-red-600 text-lg">Transaction not found</div>
            )}
        </div>
    );
}
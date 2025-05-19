'use client';
import React, { useEffect, useState} from 'react';
import Expenses from './Expenses';
import Incomes from './Incomes';
import ExpensesIncomePie from './ExpensesIncomePie';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { TransactionType } from '../types/TransactionType';


const TransactionContainer = () => {
    const {data : server} = useSession();
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const username = server?.user?.email;
    useEffect(() => {
        (async() => {
            try {
                if(username) {
                    const res = await axios.get('/api/transaction', {
                        params : {username}
                    });
                    if(res.status === 200) {
                        setTransactions(res.data.transactions);
                    }
                }
            } catch (e) {
                console.error(`Failed to fetch data: ${e}`);
            }
        })();
    }, [username])
    
    return (
        <>
            <div className="flex flex-row justify-center min-w-auto">
                <Expenses transactions = {transactions}/>
                <Incomes transactions = {transactions}/>
            </div>
            <div className="w-full flex justify-center my-4 p-5">
                <ExpensesIncomePie transactions={transactions}/>
            </div>
        </>
    )
}

export default TransactionContainer
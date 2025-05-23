'use client'
import React from 'react'
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { TransactionType } from '../types/TransactionType';
export interface TransactionWithoutUserID extends Omit<TransactionType, 'userId' | 'createAt'> {
    setTransactions?: React.Dispatch<React.SetStateAction<TransactionType[]>>,
}


const TransactionsCard = (props: TransactionWithoutUserID) => {
    const handleXOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const res: AxiosResponse = await axios.delete('/api/transaction',{
                params: {id: props.id}
            });
            if(res.status === 200 && props.setTransactions) {
                props.setTransactions((prev) => prev.filter(t => t.id !== props.id));
            }
        } catch (error) {
            console.error(error);
        } 
    }
    return (
      <Link href={`/dashboard/transaction/${props.id}`}>
          <div className="relative w-fit min-w-64 min-h-24 bg-green-100 rounded-2xl shadow-md shadow-green-950 p-4 m-5">
              <button onClick={handleXOnClick} className="absolute top-2.5 right-3 text-green-800 font-bold hover:text-red-600">X</button>
              <h3 className="text-lg font-semibold text-green-800">{props.title}</h3>
              <p className="text-sm text-customGreen">Amount: ₹{props.amount}</p>
          </div>
      </Link>
  )
}

export default TransactionsCard;

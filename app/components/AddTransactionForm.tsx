'use client';
import React, {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'
import {TransactionType} from "@/app/types/TransactionType";

interface AddTransactionFormProps {
    type: 'expense' | 'income';
}
const AddTransactionForm = (props : AddTransactionFormProps) => {
    const router = useRouter();
    const [transactionData, setTransactionData] = useState<TransactionType>({
        title: '',
        amount: '',
        note: ''
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} =  event.target;
        setTransactionData((prevData: TransactionType) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {title, amount, note} = transactionData;
        if(!(title && amount && note)) {
            console.warn('Please enter a valid amount field');
            return;
        }
        if (props.type === 'expense') {
            try{
                await axios.post('/api/addExpense', {
                    title,
                    amount,
                    note,
                });
            } catch (err: unknown) {
                console.log(err);
            }
        } else if(props.type === 'income') {
            try{
                await axios.post('/api/addIncome', {
                    title,
                    amount,
                    note,
                });
                console.log("Income added successfully");
            } catch (err: unknown) {
                console.log(err);
            }
        }
        setTransactionData({
            title: '',
            amount: '',
            note: ''
        })
        router.push('/dashboard');
    }
    return (
        <form onSubmit={handleOnSubmit} className="bg-green-200 rounded-lg shadow-md p-6 m-4 w-auto max-w-lg mx-auto
        space-y-3">
            <h2 className="text-center text-2xl">Add {props.type === 'expense' ? 'expense' : 'income'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={transactionData.title}
                name="title"
                onChange={handleOnChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="number"
                placeholder="Amount"
                value={transactionData.amount || ''}
                name="amount"
                onChange={handleOnChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2
                focus:ring-green-400 [appearance:textfield]"
            />

            <input
                type="text"
                placeholder="Note"
                value={transactionData.note}
                name="note"
                onChange={handleOnChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-center">
              <button
                  type="submit"
                  disabled={!(transactionData.title && transactionData.amount && transactionData.note)}
                  className="bg-green-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-green-600
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Add {props.type === 'expense' ? 'Expense' : 'Income'}
              </button>
            </div>
        </form>
    )
}

export default AddTransactionForm;
'use client';
import React from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'
interface AddTransactionFormProps {
    type: 'expense' | 'income';
}
const AddTransactionForm = (props : AddTransactionFormProps) => {
    const router = useRouter();
    const [title, setTitle] = React.useState<string>('');
    const [amount, setAmount] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!(title && amount && category)) {
            console.warn('Please enter a valid amount field');
            return;
        }
        if (props.type === 'expense') {
            try{
                await axios.post('/api/addExpense', {
                    title,
                    amount,
                    category,
                });
            } catch (err: unknown) {
                console.log(err);
            }
        } else if(props.type === 'income') {
            try{
                await axios.post('/api/addIncome', {
                    title,
                    amount,
                    category,
                });
                console.log("Income added successfully");
            } catch (err: unknown) {
                console.log(err);
            }
        }
        setTitle('');
        setAmount('');
        setCategory('');
        router.push('/dashboard');
    }
    return (
        <form onSubmit={handleOnSubmit} className="bg-green-200 rounded-lg shadow-md p-6 m-4 w-auto max-w-lg mx-auto
        space-y-3">
            <h2 className="text-center text-2xl">Add {props.type === 'expense' ? 'expense' : 'income'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2
                focus:ring-green-400 [appearance:textfield]"
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-center">
              <button
                  type="submit"
                  disabled={!(title && category && amount)}
                  className="bg-green-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-green-600
                  disabled:bg-green-300 disabled:cursor-not-allowed"
              >
                  Add {props.type === 'expense' ? 'Expense' : 'Income'}
              </button>
            </div>
        </form>
    )
}

export default AddTransactionForm;
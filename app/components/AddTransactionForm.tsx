'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TransactionInputType } from '@/app/types/TransactionType';
import { useThemeStore } from '../store/themeStore';

interface AddTransactionFormProps {
  type: 'EXPENSE' | 'INCOME';
}
const AddTransactionForm = (props: AddTransactionFormProps) => {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<TransactionInputType>({
    title: '',
    amount: '',
    note: '',
    type: 'EXPENSE',
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (name === 'amount' && !/^\d*\.?\d*$/.test(value)) return;

    setTransactionData((prevData: TransactionInputType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, amount, note } = transactionData;
    if (!(title && amount && note)) {
      console.warn('Please enter a valid amount field');
      return;
    }
    transactionData.type = props.type;
    try {
      const response = await axios.post('/api/transaction', transactionData);
      if (response.status === 201) router.push('/dashboard');
    } catch (e) {
      console.error((e as Error).message);
    }
  };
  const isDark = useThemeStore((state) => state.isDarkMode);

  return (
    <form
      onSubmit={handleOnSubmit}
      className={`${isDark ? 'bg-green-900' : 'bg-green-200'} rounded-lg shadow-md p-6 m-4 w-auto max-w-lg mx-auto
        space-y-3 transition duration-1000`}
    >
      <h2 className="text-center text-2xl">Add {props.type === 'EXPENSE' ? 'expense' : 'income'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={transactionData.title}
        name="title"
        onChange={handleOnChange}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*"
        placeholder="Amount"
        value={transactionData.amount}
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
          className={`${
            isDark ? 'bg-green-800 hover:bg-green-950' : 'bg-green-500 hover:bg-green-600'
          } text-white w-fit p-2 rounded cursor-pointer
          transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Add {props.type === 'EXPENSE' ? 'Expense' : 'Income'}
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;

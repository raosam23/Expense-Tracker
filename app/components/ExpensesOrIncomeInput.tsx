'use client';
import React, {useState} from 'react'
import AddTransactionForm from "@/app/components/AddTransactionForm";
import { TransactionCategory } from '../types/TransactionType';

const ExpensesOrIncomeInput = () => {
    const [formType, setFormType] = useState<TransactionCategory>('EXPENSE');
    return (
        <>
        <div className="flex justify-center gap-12 mb-10">
            <button
                onClick={() => setFormType('EXPENSE')}
                className={`px-4 py-2 rounded ${
                    formType === 'EXPENSE' ? 'bg-red-400 text-white' : 'bg-gray-200'
                } cursor-pointer`}
            >
                ➕ Add Expense
            </button>

            <button
                onClick={() => setFormType('INCOME')}
                className={`px-4 py-2 rounded ${
                    formType === 'INCOME' ? 'bg-green-400 text-white' : 'bg-gray-200'
                } cursor-pointer`}
            >
                ➕ Add Income
            </button>
        </div>
            <AddTransactionForm type={formType} />
        </>
    );
}

export default ExpensesOrIncomeInput;
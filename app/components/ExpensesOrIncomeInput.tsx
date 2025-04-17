'use client';
import React, {useState} from 'react'
import AddTransactionForm from "@/app/components/AddTransactionForm";

const ExpensesOrIncomeInput = () => {
    const [formType, setFormType] = useState<'expense' | 'income'>('expense');
    return (
        <>
        <div className="flex justify-center gap-12 mb-10">
            <button
                onClick={() => setFormType('expense')}
                className={`px-4 py-2 rounded ${
                    formType === 'expense' ? 'bg-red-400 text-white' : 'bg-gray-200'
                }`}
            >
                ➕ Add Expense
            </button>

            <button
                onClick={() => setFormType('income')}
                className={`px-4 py-2 rounded ${
                    formType === 'income' ? 'bg-green-400 text-white' : 'bg-gray-200'
                }`}
            >
                ➕ Add Income
            </button>
        </div>
            <AddTransactionForm type={formType} />
        </>
    );
}

export default ExpensesOrIncomeInput;
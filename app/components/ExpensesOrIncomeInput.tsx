'use client';
import React, { useState } from 'react';
import AddTransactionForm from '@/app/components/AddTransactionForm';
import { TransactionCategory } from '../types/TransactionType';
import { useThemeStore } from '../store/themeStore';
import { Minus, Plus } from 'lucide-react';

const ExpensesOrIncomeInput = () => {
  const isDark = useThemeStore((state) => state.isDarkMode);
  const [formType, setFormType] = useState<TransactionCategory>('EXPENSE');
  return (
    <>
      <div className="flex justify-center gap-12 mb-10">
        <button
          onClick={() => setFormType('EXPENSE')}
          className={`px-4 py-2 rounded ${
            formType === 'EXPENSE'
              ? isDark
                ? 'bg-red-900 text-white'
                : 'bg-red-400 text-white'
              : isDark
              ? 'bg-gray-900'
              : 'bg-gray-200'
          } cursor-pointer transition duration-200`}
        >
          <div className="flex flex-row items-center">
            <Minus size={30} className="mx-1" />
            Add Expense
          </div>
        </button>

        <button
          onClick={() => setFormType('INCOME')}
          className={`px-4 py-2 rounded ${
            formType === 'INCOME'
              ? isDark
                ? 'bg-green-900 text-white'
                : 'bg-green-400 text-white'
              : isDark
              ? 'bg-gray-900'
              : 'bg-gray-200'
          } cursor-pointer transition duration-200`}
        >
          <div className="flex flex-row items-center">
            <Plus size={30} className="mx-1" /> Add Income
          </div>
        </button>
      </div>
      <AddTransactionForm type={formType} />
    </>
  );
};

export default ExpensesOrIncomeInput;

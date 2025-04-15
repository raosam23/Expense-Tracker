import React from 'react'
import TransactionsCard from "@/app/components/TransactionsCard";
import expenses from '@/Expenses.json';

const Expenses = () => {
  return (
    <div className="flex flex-col items-center max-w-fit  mx-2.5">
        <h1 className="text-3xl text-center font-bold">Expenses</h1>
        {expenses.map((expense, index: number) => (
            <TransactionsCard key={index} title={expense.title} category={expense.category} amount={expense.amount} />
        ))}
    </div>
  )
}

export default Expenses
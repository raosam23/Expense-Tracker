import React from 'react'
import TransactionsCard from "@/app/components/TransactionsCard";
import { TransactionType } from "@/app/types/TransactionType";

interface propTypes {
    transactions: TransactionType[]
}

const Expenses = ({ transactions }: propTypes) => {
    const expenses = transactions.filter((tran: TransactionType) => tran.type === 'EXPENSE');
    return (
        <div className="flex flex-col items-center max-w-fit  mx-2.5">
            <h1 className="text-3xl text-center font-bold">Expenses</h1>
            {expenses.length > 0 ? expenses.map((expense, index: number) => (
                <TransactionsCard key={index} title={expense.title} note={expense.note} amount={Number(expense.amount)} id={Number(expense.id)} type={"EXPENSE"} />
            )) : <p className="my-4 text-xl text-center font-bold text-green-950">No transactions yet</p>}
        </div>
    );
}

export default Expenses
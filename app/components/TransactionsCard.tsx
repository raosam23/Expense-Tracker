import React from 'react'

type ExpensesCardProps = {
    title: string;
    category: string;
    amount: number;
}

const TransactionsCard = (props: ExpensesCardProps) => {
  return (
    <div className="w-fit min-w-64 min-h-24 bg-green-100 rounded-lg shadow-xs shadow-green-950 p-4 m-5">
      <h3 className="text-lg font-semibold text-green-800">{props.title}</h3>
      <p className="text-sm text-customGreen">Amount: ₹{props.amount}</p>
    </div>
  )
}

export default TransactionsCard;

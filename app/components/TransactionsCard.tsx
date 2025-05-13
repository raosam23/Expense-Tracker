import React from 'react'
import Link from "next/link";
import axios from "axios";

interface ExpensesCardProps {
    title: string;
    note: string;
    amount: number;
    _id: number;
    type: string;
}

const TransactionsCard = (props: ExpensesCardProps) => {
    const handleXOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            if(props.type === 'income')
                await axios.delete('/api/addIncome?id='+props._id);
            else if(props.type === 'expenses')
                await axios.delete('/api/addExpense?id='+props._id);
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }
    return (
      <Link href={`/dashboard/${props.type}/${props._id}`}>
          <div className="relative w-fit min-w-64 min-h-24 bg-green-100 rounded-lg shadow-xs shadow-green-950 p-4 m-5">
              <button onClick={handleXOnClick} className="absolute top-2.5 right-3 text-green-800 font-bold hover:text-red-600">X</button>
              <h3 className="text-lg font-semibold text-green-800">{props.title}</h3>
              <p className="text-sm text-customGreen">Amount: ₹{props.amount}</p>
          </div>
      </Link>
  )
}

export default TransactionsCard;

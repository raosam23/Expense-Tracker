'use client';
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import incomes from '@/Incomes.json'
import expenses from '@/Expenses.json'
import React, {useEffect} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesIncomePie = () => {
    const [expenseTotal, setExpenseTotal] = React.useState<number>(0);
    const [incomeTotal, setIncomeTotal] = React.useState<number>(0);
    useEffect(() => {
        let eTotal: number = 0;
        let iTotal: number = 0;
        expenses.map(expense => {
            eTotal += expense.amount;
        });
        incomes.map(income => {
            iTotal += income.amount;
        });
        setExpenseTotal(eTotal);
        setIncomeTotal(iTotal);
    }, [incomes, expenses]);
    const data = {
        labels: ['Expenses', 'Income'],
        datasets: [
            {
                data: [expenseTotal, incomeTotal],
                backgroundColor: ['#EF4444', '#22C55E'],
                hoverOffset: 10,
            },
        ],
    };
    return (
        <div className="bg-green-200 rounded-lg shadow-md p-6 m-4 w-fit mx-auto">
            <h1 className="text-2xl text-center font-bold mb-4">Dashboard Summary</h1>
            <p className="text-center text-xl text-green-800 mb-1">
                Incomes: ₹{incomeTotal}
            </p>
            <p className="text-center text-xl text-red-500 mb-4">
                Expenses: ₹{expenseTotal}
            </p>
            <div className="w-full max-w-sm mx-auto">
                <Pie data={data} />
            </div>
        </div>
    )
}

export default ExpensesIncomePie;
"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useState } from "react";
import { TransactionType } from "@/app/types/TransactionType";
import { useTransactionStore } from "../store/transactionStore";
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesIncomePie = () => {
  const { transactions } = useTransactionStore();
  const [incomesData, setIncomesData] = useState<TransactionType[]>([]);
  const [expensesData, setExpensesData] = useState<TransactionType[]>([]);
  const [expenseTotal, setExpenseTotal] = React.useState<number>(0);
  const [incomeTotal, setIncomeTotal] = React.useState<number>(0);
  useEffect(() => {
    setIncomesData(
      transactions.filter((tran: TransactionType) => tran.type === "INCOME"),
    );
    setExpensesData(
      transactions.filter((tran: TransactionType) => tran.type === "EXPENSE"),
    );
  }, [transactions]);
  useEffect(() => {
    let eTotal: number = 0;
    let iTotal: number = 0;
    expensesData.map((expense) => {
      eTotal += Number(expense.amount);
    });
    incomesData.map((income) => {
      iTotal += Number(income.amount);
    });
    setExpenseTotal(eTotal);
    setIncomeTotal(iTotal);
  }, [incomesData, expensesData]);
  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [expenseTotal, incomeTotal],
        backgroundColor: ["#EF4444", "#22C55E"],
        hoverOffset: 10,
      },
    ],
  };
  if (incomeTotal === 0 && expenseTotal === 0) return null;
  return (
    <div className="bg-green-200 rounded-lg shadow-md p-6 m-4 w-fit mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">Dashboard Summary</h1>
      {incomeTotal > 0 && (
        <p className="text-center text-xl text-green-800 mb-1">
          Incomes: ₹{incomeTotal}
        </p>
      )}
      {expenseTotal > 0 && (
        <p className="text-center text-xl text-red-500 mb-4">
          Expenses: ₹{expenseTotal}
        </p>
      )}
      <div className="w-full max-w-sm mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ExpensesIncomePie;

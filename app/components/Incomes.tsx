import React from "react"
import incomes from "@/Incomes.json";
import TransactionsCard from "@/app/components/TransactionsCard";

const Incomes = () => {
    return (
        <div className="flex flex-col items-center max-w-fit mx-2.5">
            <h1 className="text-3xl text-center font-bold">Income</h1>
            {incomes.map((income, index: number) => (
                <TransactionsCard key={index} title={income.title} category={income.category} amount={income.amount} />
            ))}
        </div>
    )
}

export default Incomes;
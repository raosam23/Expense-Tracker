'use client';
import React, {useState, useEffect} from "react"
import TransactionsCard from "@/app/components/TransactionsCard";
import axios from "axios";

type TransactionType = {
    title: string,
    amount: number,
    category: string,
    _id: number,
}

const Incomes = () => {
    const [data, setData] = useState<TransactionType[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/addIncome');
                setData(res.data.data);
            } catch (e) {
                console.error(`Failed to fetch data: ${e}`);
            }
        })();
    }, []);
    return (
        <div className="flex flex-col items-center max-w-fit mx-2.5">
            <h1 className="text-3xl text-center font-bold">Income</h1>
            {data.length > 0 ? data.map((income, index: number) => (
                <TransactionsCard key={index} _id={income._id} title={income.title} category={income.category} amount={income.amount} type={"income"} />
            )):
                <p className="my-4 text-xl text-center font-bold text-green-950">No transactions yet</p>
            }
        </div>
    )
}

export default Incomes;
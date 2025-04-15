import Expenses from "@/app/components/Expenses";
import Incomes from "@/app/components/Incomes";import ExpensesIncomePie from "@/app/components/ExpensesIncomePie";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-row justify-center min-h-screen min-w-auto">
                <Expenses />
                <Incomes />
            </div>
            <div className="w-full flex justify-center my-4 p-5">
                <ExpensesIncomePie />
            </div>
        </>
    )
}
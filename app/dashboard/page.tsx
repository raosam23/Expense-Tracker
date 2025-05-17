import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import Expenses from "@/app/components/Expenses";
import Incomes from "@/app/components/Incomes";
import ExpensesIncomePie from "@/app/components/ExpensesIncomePie";


export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if(!session) redirect("/login");
    return (
        <>
            <div className="flex flex-row justify-center min-w-auto">
                <Expenses />
                <Incomes />
            </div>
            <div className="w-full flex justify-center my-4 p-5">
                <ExpensesIncomePie />
            </div>
        </>
    )
}
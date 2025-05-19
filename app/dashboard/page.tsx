import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import Expenses from "@/app/components/Expenses";
import Incomes from "@/app/components/Incomes";
import ExpensesIncomePie from "@/app/components/ExpensesIncomePie";
import TransactionContainer from "../components/TransactionContainer";


export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if(!session) redirect("/login");
    return (
        <TransactionContainer />
    )
}
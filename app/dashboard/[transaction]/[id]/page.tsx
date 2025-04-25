import OneTransaction from "@/app/components/OneTransaction";

export default function DashboardPage({params} : {params : {id: string, transaction: string}}) {
    console.log('type is ', params.transaction);
    return (
        <div>
            <OneTransaction id={params.id} type={params.transaction} />
        </div>
    )
}
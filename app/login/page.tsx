import LogInForm from "@/app/components/LogInForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession(authOptions);
    if(session) redirect('/profile');
    return(
        <div>
            <LogInForm />
        </div>
    )
}
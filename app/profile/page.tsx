import ProfilePage from "../components/ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(!session) redirect('/login');
    return(
        <div>
            <ProfilePage />
        </div>
    );
};
import {NextRequest, NextResponse} from "next/server";
import {UserType} from "@/app/types/UserType";

export async function POST(req: NextRequest): Promise<NextResponse<{msg: string}>> {
    const body: UserType = await req.json();
    console.log("incoming user", body);
    return NextResponse.json({msg:"Logged in successfully"}, {status: 200});
}
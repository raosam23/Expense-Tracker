import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.user.delete({
            where: { username: session.user.email },
        });

        return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/utils/authOptions";
import { TransactionInputType } from "@/app/types/TransactionType";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
        }

        const user = await prisma.user.findUnique({
            where: {username: session.user.email},
        });
        if(!user) {
            return NextResponse.json({success: false, message: "User not found"}, {status: 404});
        }
        
        const body: TransactionInputType = await req.json();
        const {title, amount, note, type} = body;
        if(type !== 'INCOME' && type !== 'EXPENSE') {
            return NextResponse.json({success: false, message: "Invalid transaction type"}, {status: 400});
        }
        
        const transaction = await prisma.transactions.create({
            data: {
                title,
                amount: Number(amount),
                note,
                userId: user.id,
                type,
                createdAt: new Date().toISOString(),
            }
        });
        
        return NextResponse.json({success: true, transaction}, {status: 201});
    } catch (error: unknown) {
        const err = error as Error
        console.error(err.message);
        return NextResponse.json({success: false, message: err.message}, {status: 500});
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
        }
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");
        if(!username) {
            return NextResponse.json({success: false, message: "Username parameter is missing in the query"}, {status: 400});
        }

        const user = await prisma.user.findUnique({
            where: {username: username},
            include: {transactions: true}
        });
        if(!user) {
            return NextResponse.json({success: false, message: "User not Found"}, {status: 404});
        }
        const transactions = await prisma.transactions.findMany({
            where: {userId: user.id}
        })
        
        return NextResponse.json({success: true, transactions}, {status: 200});
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        return NextResponse.json({success: false, message: err.message}, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
        }
        const {searchParams} = new URL(req.url);
        const transactionId = searchParams.get("id");
        if(!transactionId) {
            return NextResponse.json({success: false, message: "Transaction id is missing in the search parameter"}, {status: 400});
        }
        await prisma.transactions.delete({
            where : {id: Number(transactionId)}
        })

        return NextResponse.json({success: true, message: 'Transaction is deleted succesfully'}, {status: 200});

    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        return NextResponse.json({success: false, message: err.message}, {status: 500});
    }
}
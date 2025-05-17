import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const {fullName, username, email, password} = await req.json();
        const salt = 12;
    
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{email}, {username}],
            },
        });
    
        if(existingUser) {
            return NextResponse.json({error: 'User already exists'}, {status: 409});
        }
    
        const passwordHash = await bcrypt.hash(password, salt);
    
        const user = await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                password: passwordHash,
            },
        });
        return NextResponse.json({message: 'User created successfully', user}, {status: 200});
    } catch (error) {
        const err = error as Error;
        console.error(err.message);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
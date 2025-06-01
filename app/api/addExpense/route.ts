import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { TransactionType } from "@/app/types/TransactionType";

export async function POST(req: NextRequest) {
    try {
        const body: TransactionType = await req.json();
        console.log("incoming expense", body);
        body.amount = Number(body.amount);
        const filepath: string = path.join(process.cwd(), '/Expenses.json');
        const fileExists: boolean = fs.existsSync(filepath);
        const existingData = fileExists ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : [];
        body.id = existingData.length > 0 ? existingData[existingData.length - 1]._id + 1 : 1;
        body.createAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
        existingData.push(body);
        fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
        return NextResponse.json({ success: true, }, { status: 200 });
    } catch (e: unknown) {
        const err = e as Error
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const filepath: string = path.join(process.cwd(), '/Expenses.json');
        const fileExists: boolean = fs.existsSync(filepath);
        const data = fileExists ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : [];
        return NextResponse.json({ success: true, data });
    } catch (e: unknown) {
        const err = e as Error;
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id: string | null = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 400 });
        }
        const filepath: string = path.join(process.cwd(), '/Expenses.json');
        const fileExists: boolean = fs.existsSync(filepath);
        if (!fileExists) {
            return NextResponse.json({ success: false, message: 'Expenses file not found' }, { status: 404 });
        }

        const existingData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        const filteredData = existingData.filter((data: { _id: number }) => data._id !== Number(id))
        fs.writeFileSync(filepath, JSON.stringify(filteredData, null, 2));
        return NextResponse.json({ success: true, message: 'Expense deleted' }, { status: 200 });
    } catch (e: unknown) {
        const err = e as Error;
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST (req: NextRequest) {
    try{
        const body = await req.json();
        console.log("incoming expense", body);
        body.amount = Number(body.amount);
        const filepath: string = path.join(process.cwd(), '/Expenses.json');
        const fileExists: boolean = fs.existsSync(filepath);
        const existingData = fileExists ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : [];
        body._id = existingData.length > 0 ? existingData[existingData.length - 1]._id + 1 : 1;
        body.create_at = new Date().toISOString();
        existingData.push(body);
        fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
        return NextResponse.json({success: true,}, {status: 200});
    } catch (e: unknown) {
        const err = e as Error
        return NextResponse.json({success: false, message: err.message},{status: 500});
    }
}

export async function GET() {
    try {
        const filepath: string = path.join(process.cwd(), '/Expenses.json');
        const fileExists: boolean = fs.existsSync(filepath);
        const data = fileExists ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : [];
        return NextResponse.json({success: true, data});
    } catch(e: unknown) {
        const err = e as Error;
        return NextResponse.json({success: false, message: err.message},{status: 500})
    }
}
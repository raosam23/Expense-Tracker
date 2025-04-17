import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST (req: NextRequest) {
    try{
        const body = await req.json();
        console.log("incoming expense", body);
        body.amount = Number(body.amount);
        const filepath: string = path.join(process.cwd(), '/Incomes.json');
        const fileExists: boolean = fs.existsSync(filepath);
        const existingData = fileExists ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : [];
        existingData.push(body);
        fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
        return NextResponse.json({success: true,}, {status: 200});
    } catch (e: unknown) {
        const err = e as Error
        return NextResponse.json({success: false, message: err.message},{status: 500});
    }
}
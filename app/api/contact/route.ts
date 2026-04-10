import { NextResponse } from 'next/server';
import { db } from '@/index';
import { Contact, contacts } from '@/db/schema';


export async function POST(req: Request) {
    try {
        const body: Contact = await req.json();

        //TODO: zod valid gelecek
        console.log("Veri geldi: ", body);
        const record = await db.insert(contacts).values({
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            createdAt: body.createdAt,
            message: body.message,
            platform: body.platform
        }).returning();

        return NextResponse.json({ success: true, data: record }, { status: 201 });
    } catch (error) {
        console.error("DB Insert Error:", error);
        return NextResponse.json({ error: 'Sunucu Hatası' }, { status: 500 });
    }
}
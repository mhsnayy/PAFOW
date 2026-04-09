'use server';

import { db } from '@/index';
import { contacts, type Contact } from '@/db/schema';
import { desc } from 'drizzle-orm';

// Dönüş tipini kesin bir sözleşmeye (Contract) bağlıyoruz
export type FetchMessagesResponse =
    | { success: true; data: Contact[] }
    | { success: false; error: string };

export async function fetchMessages(): Promise<FetchMessagesResponse> {
    try {
        const messages = await db
            .select()
            .from(contacts)
            .orderBy(desc(contacts.createdAt))
            .limit(10);
        return { success: true, data: messages };
    }
    catch (error) {
        console.error("Drizzle Fetch Error: ", error);
        return { success: false, error: "Veritabanına ulaşılamadı. Lütfen daha sonra tekrar deneyin." };
    }
}
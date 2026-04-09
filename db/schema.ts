import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    message: text("message"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
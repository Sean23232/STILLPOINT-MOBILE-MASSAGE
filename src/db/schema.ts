import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 16 }).notNull().unique(),
  idempotencyKey: varchar("idempotency_key", { length: 80 }).unique(),
  kind: varchar("kind", { length: 32 }).notNull(),
  service: varchar("service", { length: 64 }),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  organization: varchar("organization", { length: 200 }),
  location: text("location"),
  preferredDate: varchar("preferred_date", { length: 120 }),
  message: text("message"),
  lastMinute: boolean("last_minute").notNull().default(false),
  status: varchar("status", { length: 32 }).notNull().default("submitted"),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type InquiryRecord = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;

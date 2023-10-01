import { timestamp, serial, text, pgTable } from "drizzle-orm/pg-core";

export const FiutyTable = pgTable("fiuty", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

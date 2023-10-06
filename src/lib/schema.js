import { relations } from "drizzle-orm";
import {
  timestamp,
  uniqueIndex,
  serial,
  text,
  pgTable,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const UsersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    username: varchar("username", { length: 50 }).notNull(),
    password: varchar("password", { length: 75 }).notNull(),
    email: text("email"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (users) => {
    return {
      usernameIndex: uniqueIndex("username_idx").on(users.username),
    };
  }
);

export const LinksTable = pgTable("links", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull(),
  short: varchar("short", { length: 50 }),
  userId: integer("user_id").references(() => UsersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const VisitsTable = pgTable("visits", {
  id: serial("id").primaryKey().notNull(),
  linkId: integer("link_id")
    .notNull()
    .references(() => LinksTable.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// users --> 1 user has many -> links[]
export const UsersTableRelations = relations(UsersTable, ({ many, one }) => ({
  links: many(LinksTable),
}));

// links --> link -> has many visits
export const LinksTableRelations = relations(LinksTable, ({ many, one }) => ({
  visits: many(VisitsTable),
  user: one(UsersTable, {
    fields: [LinksTable.userId],
    references: [UsersTable.id],
  }),
}));

// visists -> visit -> has one link
export const VisistsTableRelations = relations(
  VisitsTable,
  ({ many, one }) => ({
    link: one(LinksTable, {
      fields: [VisitsTable.linkId],
      references: [LinksTable.id],
    }),
  })
);

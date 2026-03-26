import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  date,
} from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  priceLabel: varchar("price_label", { length: 50 }).notNull(),
  beds: integer("beds").notNull(),
  baths: integer("baths").notNull(),
  sqft: varchar("sqft", { length: 20 }).notNull(),
  tag: varchar("tag", { length: 50 }).notNull(),
  tagColor: varchar("tag_color", { length: 50 }).notNull(),
  badge: varchar("badge", { length: 50 }).notNull(),
  badgeColor: varchar("badge_color", { length: 50 }).notNull(),
  image: text("image").notNull(),
  listedDate: date("listed_date").notNull(),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;

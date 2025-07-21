import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  likes: integer("likes").default(0),
});

export const comments = pgTable("comments", {
  // id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" })
    .primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

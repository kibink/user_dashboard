import {
  pgTable,
  boolean,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  verificationCode: varchar("verification_code").notNull(),
  password: varchar("password").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  isBlocked: boolean("is_blocked").notNull().default(false),
  lastLogin: timestamp("last_login", { mode: "date" }).notNull().defaultNow(),
  lastActivity: timestamp("last_activity", { mode: "date" })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const selectUserSchema = createSelectSchema(users, {
  name: (schema) =>
    schema
      .min(1, {
        message: "The name is empty",
      })
      .max(48, {
        message: "The name is too long",
      })
      .regex(/^[\w\d_]+$/, {
        message:
          "The name may contain only Latin letters, numbers, and underscores _",
      }),
  email: z.email().max(254, {
    message: "The email is too long",
  }),
  password: (schema) =>
    schema
      .min(1, {
        message: "The password is empty",
      })
      .max(255, {
        message: "The password is too long",
      }),
});

export const getUserSchema = z.object({
  params: selectUserSchema.pick({
    id: true,
  }),
});

export const addUserSchema = z.object({
  body: selectUserSchema.pick({
    name: true,
    email: true,
    password: true,
  }),
});

export const loginSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
    password: true,
  }),
});

export const verifyUserSchema = z.object({
  query: selectUserSchema.pick({
    verificationCode: true,
  }),
});

export const deleteUsersSchema = z.object({
  body: z.object({
    ids: z.array(selectUserSchema.shape.id),
    isVerified: selectUserSchema.shape.isVerified.optional(),
  }),
});

export const changeUsersBlockStateSchema = z.object({
  body: z.object({
    ids: z.array(selectUserSchema.shape.id),
  }),
});

export type NewUser = z.infer<typeof addUserSchema>["body"];

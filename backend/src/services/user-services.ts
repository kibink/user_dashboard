import { db } from "@/utils/db";
import { NewUser, users } from "@/schema/user";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import crypto from "node:crypto";
import argon2 from "argon2";

export async function getUserCredentialsByEmail(email: string) {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      isVerified: users.isVerified,
      isBlocked: users.isBlocked,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
}

export async function getUserById(userId: string) {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      isVerified: users.isVerified,
      isBlocked: users.isBlocked,
      lastActivity: users.lastActivity,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}

export async function getAllUsers() {
  const allUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      isVerified: users.isVerified,
      isBlocked: users.isBlocked,
      lastActivity: users.lastActivity,
    })
    .from(users)
    .orderBy(asc(users.createdAt));

  return allUsers;
}

export async function addUser(user: NewUser) {
  const { password, ...userDetails } = user;

  const verificationCode = crypto.randomBytes(32).toString("hex");
  const hashedPassword = await argon2.hash(password, {
    secret: Buffer.from(process.env.ARGON2_SECRET),
  });

  const [newUser] = await db
    .insert(users)
    .values({
      ...userDetails,
      password: hashedPassword,
      verificationCode,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      isVerified: users.isVerified,
      isBlocked: users.isBlocked,
      lastActivity: users.lastActivity,
    });

  return newUser;
}

export async function deleteUsers(userIds: string[], isVerified?: boolean) {
  let conditions;

  conditions = inArray(users.id, userIds);
  if (isVerified != null) {
    conditions = and(conditions, eq(users.isVerified, isVerified));
  }

  let ids = await db.delete(users).where(conditions).returning({
    id: users.id,
  });

  return ids.map((item) => item.id);
}

export async function blockUsers(userIds: string[]) {
  let ids = await db
    .update(users)
    .set({ isBlocked: true })
    .where(inArray(users.id, userIds))
    .returning({
      id: users.id,
    });

  return ids.map((item) => item.id);
}

export async function unblockUsers(userIds: string[]) {
  await db
    .update(users)
    .set({ isBlocked: false })
    .where(inArray(users.id, userIds));
}

export async function verifyUser(userId: string) {
  await db.update(users).set({ isVerified: true }).where(eq(users.id, userId));
}

export async function getUserVerificationCode(userId: string) {
  const [{ verificationCode }] = await db
    .select({
      verificationCode: users.verificationCode,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return verificationCode;
}

export async function actualizeLastActivity(userId: string) {
  await db
    .update(users)
    .set({ lastActivity: sql`NOW()` })
    .where(eq(users.id, userId));
}

export async function actualizeLastLogin(userId: string) {
  await db
    .update(users)
    .set({ lastLogin: sql`NOW()` })
    .where(eq(users.id, userId));
}

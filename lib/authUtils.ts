"use server";
import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { logger } from "./logger";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }
  return user;
}

export async function redirectIfNotCorrectUsername(username: string) {
  const user = await getCurrentUser();

  if (!user || user.username !== username) {
    logger.warn(user?.username + "tried to access a different user's profile");
    redirect("/");
  }
  return user;
}

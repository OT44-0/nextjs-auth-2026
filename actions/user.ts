"use server";

import { getCurrentUser } from "@/lib/authUtils";
import { db } from "@/lib/db";

export async function getUserByUsername(username: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await db.user.findUnique({
    where: {
      username,
    },
  });
}

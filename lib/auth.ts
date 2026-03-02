import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { username, haveIBeenPwned } from "better-auth/plugins";
import { Roles } from "@/generated/prisma/browser";
import { hashPassword, verifyPassword } from "./password";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    hash: hashPassword,
    verify: verifyPassword,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "USER",
        enum: Roles,
      },
      username: {
        type: "string",
        unique: true,
      },
    },
  },
  plugins: [
    username(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
  ],
});

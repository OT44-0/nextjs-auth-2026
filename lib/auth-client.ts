import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { auth } from "./auth";

export const { signIn, signOut, signUp, useSession, getSession } =
  createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL:
      process.env.NEXT_PUBLIC_BASE_URL ||
      `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
    plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
  });

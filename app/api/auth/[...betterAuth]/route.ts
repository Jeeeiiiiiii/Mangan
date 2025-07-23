import { createBetterAuthHandler } from "better-auth/next";
import { auth } from "../../../../lib/auth";

export const { GET, POST } = createBetterAuthHandler(auth); 
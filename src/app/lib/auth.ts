import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";

export const authOptions: AuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user = user;
      }
      return session;
    },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

import * as argon2 from "argon2";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma-db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24,
    updateAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {},
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  // useSecureCookies: true,
};

export default NextAuth(authOptions);

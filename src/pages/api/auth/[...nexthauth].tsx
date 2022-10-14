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
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            userEmail: credentials.username,
          },
        });
        if (
          user &&
          (await argon2.verify(user.password, credentials.password))
        ) {
          return {
            _id: user.id,
            name: user.fullname,
            email: user.userEmail,
            image: "f",
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
      credentials: {
        domain: {
          label: "Domain",
          type: "text ",
          placeholder: "CORPNET",
          value: "CORPNET",
        },
        username: { label: "Username", type: "text ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // useSecureCookies: true,
};

export default NextAuth(authOptions);

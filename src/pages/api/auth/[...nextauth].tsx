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
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token._id = user.id;
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }: any) {
      if (token?.id) session.user.id = token.id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            userEmail: credentials.email,
          },
        });
        if (
          user &&
          (await argon2.verify(user.password, credentials.password))
        ) {
          return {
            _id: user.id,
            name: user.fullname,
            userEmail: user.userEmail,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // useSecureCookies: true,
};

export default NextAuth(authOptions);

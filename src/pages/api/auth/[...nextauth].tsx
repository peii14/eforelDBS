import * as argon2 from "argon2";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma-db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 24,
    updateAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.user_id) token.id = user.user_id;
      if (user?.user_role) token.user_role = user.user_role;
      if (user?.user_code) token.user_code = user.user_code;
      if (user?.user_area) token.user_area = user.user_area;
      if (user?.user_salesActivity)
        token.user_salesActivity = user.user_salesActity;
      return token;
    },
    async session({ session, token }: any) {
      if (token?.user_id) session.user.id = token.id;
      if (token?.user_role) session.user.role = token.user_role;
      if (token?.user_code) session.user.user_code = token.user_code;
      if (token?.user_area) session.user.user_area = token.user_area;
      if (token?.user_salesActivity)
        session.user.user_salesActivity = token.user_salesActivity;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any, req) {
        const user = await prisma.user.findUnique({
          where: {
            user_email: credentials.email,
          },
        });
        if (
          user &&
          (await argon2.verify(user.user_password, credentials.password))
        ) {
          return {
            id: user.user_id,
            name: user.user_fullname,
            userEmail: user.user_email,
            user_code: user.user_code,
            user_area: user.user_area,
            user_role: user.user_role,
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

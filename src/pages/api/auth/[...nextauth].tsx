import * as argon2 from "argon2";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import TypeOr
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }: any) {
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        // await db.connect();
        // const user = await User.findOne({
        //   email: credentials.email,
        // });
        // await db.disconnect();
        if (
          user &&
          (await argon2.verify(user.password, credentials.password))
        ) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin,
            isValid: user.isValid,
          };
        }
        throw new Error("Invalid email or password");
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
 
  // useSecureCookies: true,
};

export default NextAuth(authOptions);

import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userSignin from "@/libs/user/userSignin";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          student_id: { label: "Student_id", type: "student_id" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) return null;
          const user = await userSignin(credentials.student_id, credentials.password);
          if (user) {
            console.log("User authenticated:", user); // Debug output
          }

          return user || null; // Return user if valid, otherwise null
        },
      }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
      },
    };
    
    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };
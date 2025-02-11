import NextAuth, { AuthOptions, Session, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userSignin from "@/libs/user/userSignin";

// Define a custom interface for the JWT
// interface CustomJWT extends JWT {
//   token?: string; // Ensure token is a string, not an object
// }

// Define a custom interface for the session
// interface CustomSession extends Session {
//   user: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     token?: string | null; // token should be a string
//   };
// }

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        student_id: { label: "Student ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        // Debug: Check credentials and response from userSignin
        const user = await userSignin(credentials.student_id, credentials.password);
        console.log("User from userSignin:", user);

        if (user?.token) {
          return {
            id: credentials.student_id,
            token: user.token, // Store the token here
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // Store the token in the JWT
    async jwt({ token, user }) {
      console.log("JWT callback, user:", user);
      if (user?.token) {
        token = { ...token, value: user.token ?? "" };
        console.log("JWT callback, token1:", token);
        //token.token = user.token ?? ""; // Store only the token string in the JWT
      }
      return token;
    },
    // Store the token in session.user
    async session({ session, token }) {
      console.log("Session callback, token:", token);
      //session.user = { ...session.user, token: token.value ?? "" };
      if (token?.value) {
        session.user.token = token.value as string;  // Type assertion
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

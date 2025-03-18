import NextAuth from "next-auth";

// Extend the NextAuth session to include the `token` field
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string | null; // Add token to session.user
    };
  }

  // Optionally extend the JWT interface to match the custom fields
  interface JWT {
    token?: string | null; // Add token to JWT payload
  }

  interface User {
    token?: string; // Add token property to User
  }
}
// Extending the default User type to include `token`
declare module "next-auth" {
  interface User {
    token?: string; // Add token property to User
  }
}

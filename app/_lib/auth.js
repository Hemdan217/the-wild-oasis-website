import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.GitHub_CLIENT_ID);
console.log(process.env.GitHub_CLIENT_SECRET);
const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GitHub_CLIENT_ID,
      clientSecret: process.env.GitHub_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
    signIn: async ({ user }) => {
      console.log(user, "this is testing for sign in callback");

      const existsGuest = await getGuest(user.email);
      const { email, name } = user;
      if (!existsGuest) await createGuest({ email, fullName: name });
      return true;
    },
    session: async ({ session }) => {
      const existsGuest = await getGuest(session.user.email);
      session.user.guestId = existsGuest.id;
      console.log(session, "this is testing for session callback");
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

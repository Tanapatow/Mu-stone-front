import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authService } from "../api/auth/auth.service";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const result = await authService.login(credentials);
        return result
          ? {
              ...result.user,
              accessToken: result.accessToken,
              expiresIn: result.expiresIn,
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        console.log("account:", JSON.stringify(account, null, 2));
        try {
          const idToken = account.id_token;
          if (!idToken) {
            console.log("no idToken");
            return false;
          }

          const result = await authService.googleLogin(idToken);
          console.log("googleLogin result:", result);
          user.accessToken = result.accessToken;
          user.firstName = result.user.firstName;
          user.lastName = result.user.lastName;
          user.email = result.user.email;
          user.expiresIn = result.expiresIn;
        } catch (e) {
          console.log("googleLogin error:", e);
          return false;
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.email = user.email;
        token.accessTokenExpiresAt = user.expiresIn
          ? Date.now() + (user.expiresIn - 3) * 1000
          : Date.now() + 3600 * 1000;
      }

      if (
        token.accessTokenExpiresAt &&
        Date.now() > token.accessTokenExpiresAt
      ) {
        return null;
      }

      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

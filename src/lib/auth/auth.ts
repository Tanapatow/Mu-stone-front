import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "../api/auth/auth.service";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = await authService.login(credentials);
        console.log("authorize result:", result);
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
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.accessTokenExpiresAt = user.expiresIn
          ? Date.now() + (user.expiresIn - 3) * 1000
          : Date.now() + 3600 * 1000; // default 1 ชั่วโมง
      }

      if (
        token.accessTokenExpiresAt &&
        Date.now() > token.accessTokenExpiresAt
      ) {
        return null;
      }

      if (trigger === "update" && session) {
        token.avatarUrl = session.user.avatarUrl;
      }

      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});

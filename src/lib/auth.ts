import type { UserProfile } from "@/features/user/types";
import NextAuth from "next-auth";
import "next-auth/jwt";

import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 60; // 60 minutes
// const BACKEND_REFRESH_TOKEN_LIFETIME = 30 * 24 * 60 * 60; // 30 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let refreshPromise: Promise<any> | null = null;

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    MicrosoftEntraID({
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "microsoft-entra-id") {
        const email = user.email || "";

        if (!email.endsWith("hiroshima-cu.ac.jp")) {
          return false; // サインインを拒否
        }
        const { access_token, id_token } = account;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/microsoft/`,
            {
              method: "POST",
              body: JSON.stringify({ access_token, id_token }),
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const data = await response.json();

          user.accessToken = data.access;
          user.refreshToken = data.refresh;

          user.profile = data.user;

          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }

      return false;
    },
    async jwt({ token, account, user, trigger, session }) {
      if (user && account) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          profile: user.profile,
          expire: getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME,
        };
      }

      if (trigger === "update") {
        token.profile = session.user.profile;
      }

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      if (getCurrentEpochTime() >= token.expire!) {
        try {
          if (refreshPromise === null) {
            refreshPromise = fetch(
              `${process.env.BACKEND_URL}/api/v1/auth/dj-rest-auth/token/refresh/`,
              {
                method: "POST",
                body: JSON.stringify({ refresh: token.refreshToken }),
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
              },
            ).then(response => {
              if (!response.ok) {
                throw new Error(`Token refresh failed: ${response.status}`);
              }
              return response.json();
            });
          }

          const data = await refreshPromise;

          refreshPromise = null;

          return {
            ...token,
            accessToken: data.access,
            expire: getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME,
          };
        } catch (error) {
          refreshPromise = null;
          console.error("Token refresh failed:", error);

          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.profile = token.profile;
      }

      return session;
    },
  },
});

declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    profile: UserProfile;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expire?: number;
    profile: UserProfile;
  }
}

import bcryptjs from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // const isLoggedIn = !!auth?.user;
      // const isProfilePage = nextUrl.pathname.startsWith('/profile');
      // if (isProfilePage) {
      //   if (isLoggedIn) return true;
      //   return .redirect(
      //     new URL('/auth/login?returnTo=/profile', nextUrl),
      //   ); // Redirect unauthenticated users to login page
      // }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (!user) return null;

          if (!bcryptjs.compareSync(password, user.password)) return null;

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...rest } = user;

          return rest;
        }

        return null;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

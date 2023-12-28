import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import AuthProviders from './auth.providers';
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
  ...AuthProviders,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.image) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (token.data as any).image = session.image;
      }
      if (user) token.data = user;
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
  },
};

export const {
  signIn,
  signOut,
  auth,
  handlers,
  update: updateUser,
} = NextAuth(authConfig);

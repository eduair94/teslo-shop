import bcryptjs from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import prisma from './lib/prisma';

export default {
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      // authorization: (credentials) => {
      //   console.log('Github credentials', credentials);
      // },
    }),
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

          if (!rest.role) rest.role = 'user';

          return rest;
        }

        return null;
      },
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
} satisfies NextAuthConfig;

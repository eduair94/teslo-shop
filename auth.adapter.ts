import type { Adapter } from '@auth/core/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';

export default function MyAdapter(): Adapter {
  return {
    ...PrismaAdapter(prisma),
    // async createUser(user) {
    //   console.log('user', user);
    //   let userDB = await prisma.user.findUnique({
    //     where: { email: user.email.toLowerCase() },
    //   });
    //   if (!userDB) {
    //     userDB = await prisma.user.create({
    //       data: {
    //         name: user.name ?? 'N/A',
    //         email: user.email.toLowerCase(),
    //         image: user.image,
    //         password: bcryptjs.hashSync(uuidv4()),
    //       },
    //     });
    //   }
    //   return userDB;
    // },
    // async getUser(id) {
    //   const userDB = await prisma.user.findUnique({
    //     where: { id },
    //   });
    //   return userDB;
    // },
    // async getUserByEmail(email) {
    //   const userDB = await prisma.user.findUnique({
    //     where: { email: email.toLowerCase() },
    //   });
    //   return userDB;
    // },
  };
}

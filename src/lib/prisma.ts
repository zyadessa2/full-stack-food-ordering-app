import { Environments } from '@/constants/enums';
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };
// الفايل دا عشان نكونكت بالداتابيز ونتعامل مع قواعد البيانات 
// عملتها عشان لو فى كويرى او ايرور يظهر فى ونا بكود وميظهرش فى البروداكشن 
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === Environments.DEV
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== Environments.PROD) globalForPrisma.prisma = db;
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error']
});

export async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('Connected to database');
        return prisma;
    } catch (error) {
        console.error('Database connection failed', error);
        throw error;
    }
}

export async function disconnectDatabase() {
    try {
        await prisma.$disconnect();
        console.log('Disconnected from database');
    } catch (error) {
        console.error('Database disconnection failed', error);
        throw error;
    }
}

export * from '@prisma/client';
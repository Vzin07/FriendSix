import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function insertCategories(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    const categories = [
        {
            id: 'f49b988e-bf46-4a5d-811a-51c3ff03276a',
            name: 'Esporte',
        },
        {
            id: '8bcd0f15-6c12-48ea-aba4-f229f30f56e9',
            name: 'Música',
        }
    ]


    console.log('Seeding categories...');

    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: {
                id: category.id,
                name: category.name,
                type: 'GRUPO'
            },
        });
    }
}
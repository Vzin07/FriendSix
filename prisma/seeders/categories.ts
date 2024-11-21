import { $Enums, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function insertCategories(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    const categories = [
        {
            id: 'f49b988e-bf46-4a5d-811a-51c3ff03276a',
            name: 'Esporte',
            type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id: '8bcd0f15-6c12-48ea-aba4-f229f30f56e9',
            name: 'Música',
            type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id: 'b55db7e0-68fb-47a1-9f0b-12d87f1ea4d0',
            name: 'Jogos Eletrônicos',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: 'ab90e302-35c3-4c00-9296-b2bdb7ba1fa4',
            name: 'Ciclismo',
            type: $Enums.CATEGORY_TYPE.AMBOS
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
                type: category.type
            },
        });
    }
}
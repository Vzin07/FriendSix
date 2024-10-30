import { categoria_CAT_TIPO, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function insertCategories(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    const categories = [
        {
            id: 1,
            name: 'Esporte',
        },
        {
            id: 2,
            name: 'Jogo',
        }

    ]


    console.log('Seeding categories...');

    for (const category of categories) {
        await prisma.categoria.upsert({
            where: { CAT_CODIGO: category.id },
            update: {},
            create: {
                CAT_CODIGO: category.id,
                CAT_NOME: category.name,
                CAT_TIPO: 'GRUPO'
            },
        });
    }
}
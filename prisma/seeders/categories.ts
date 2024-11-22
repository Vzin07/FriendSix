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
        },
        {
            id: '25d493c1-a57b-4d0f-805b-34b392faaac5',
            name: 'Fofoca',
            type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id: '806fb823-7c8f-4475-8481-c6202fb44644',
            name: 'Cozinhando',
            type: $Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id: 'a48001e1-1cd6-469a-ada8-63b20a658268',
            name: 'Corrida',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: '49e59c45-85ff-4481-8822-2f9fd7aba16c',
            name: 'Festivais Artísticos',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: '23b99c7b-3fc8-4760-ab7f-1a03448f1e6b',
            name: 'Noite de Cinema',
            type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id: 'cbce16a0-1e56-4dfe-b3d6-28e21bcaf758',
            name: 'Artes',
            type: $Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id: 'ec106d0b-09ce-4aee-956b-70b29efe23c1',
            name: 'Danças',
            type: $Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id: 'ae79093f-5e3d-4de9-9127-5c2629254b61',
            name: 'Feira de Troca',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: 'f459b385-113c-4880-b1d9-e5f1780c11f0',
            name: 'Festas',
            type: $Enums.CATEGORY_TYPE.AMBOS
        }, 
        {
            id: 'Noite de Quiz',
            name: 'Churrasco',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: '6ee8dc7d-b951-4f0e-aae4-9ff55dbf7fab',
            name: 'Adote um Amigo',
            type: $Enums.CATEGORY_TYPE.EVENTO
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
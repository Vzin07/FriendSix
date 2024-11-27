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
            name: 'Ciclistas',
            type: $Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id: '25d493c1-a57b-4d0f-805b-34b392faaac5',
            name: 'Fofocalizando',
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
            name: 'Festas Rave',
            type: $Enums.CATEGORY_TYPE.AMBOS
        }, 
        {
            id: '5e7c6c0c-c995-4fb4-8a9f-a65a4c30ccc0',
            name: 'Churrasco',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: '6ee8dc7d-b951-4f0e-aae4-9ff55dbf7fab',
            name: 'Copa do mundo',
            type: $Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: '9ac69eec-2490-448a-a0b0-17b7d86b7909',
            name: 'Skate',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'9f905211-5ae9-4806-be43-b9f7adb6f9a8',
            name:'Skate Fest',
            type:$Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id:'8cc3ecb5-29fb-49dc-be76-cdc6ddf14f26',
            name:'Paraquedistas',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'c98fdd45-0feb-4c0c-8fb6-9e49c6e10866',
            name:'Competição de Saltos',
            type:$Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id: 'e1ec378a-0591-4fa0-82d5-a3abf856fba7',
            name: 'Pedalando Juntos',
            type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'ada44a43-54b3-4eec-90df-90f304757c24',
            name: 'Rebelião de ativistas',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'2a1bef20-13ac-4505-ad2a-d51c29d1afb2',
            name: 'Mamonas assassinas',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'764c246c-fc2f-4b82-b9d5-cabbcf660802',
            name:'legião urbana',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'44b86ecc-fdbd-474c-9e85-4f32548b2bcf',
            name:'Raça negra',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
        id:'a3901a20-aef7-48a9-aadc-5dfaac94aae9',
        name:'Racionais',
        type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'b9cc42f8-6520-4d9a-ae57-7c219dba65f9',
            name:'X1',
            type: $Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'bd3bd32b-f7e3-4639-8280-5c5345068ada',
            name:'Braw',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'be1da00b-f436-4939-a6de-21bae31b1a15',
            name:'FFWS',
            type:$Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id:'4cf3dddd-54c5-4d24-9696-da9f5c20b45e',
            name:'LGBTQIA+',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'6bc5cba6-ba6e-4292-b9da-b3880fc5e713',
            name:'Queer  Nation',
            type:$Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id:'a1949624-23a9-4c86-8064-0ba47e29a5b9',
            name:'Pelada no sábado',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'dd4dd702-ead7-4f0b-81a4-f1f0625e5f23',
            name:'Sport x Santacruz',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'56788b3f-8636-4056-8c08-2169cc43a7d1',
            name:'Memes',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'4da1499e-4fff-4e26-924c-89bf1c00669d',
            name:'Manicraft',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'309b5873-a6af-421e-b921-0c0a1af8c44c',
            name:'Programadores',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'75cbffcd-d1f3-4dde-ada6-334af4b73630',
            name:'Solteiros e românticos',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'f2e28d2c-2271-49af-809c-1224d367741d',
            name:'Danças Clássicas',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'dfc4c985-664b-4ae7-bd35-17b49d45e1c7',
            name:'Danças de Salão',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'213ac827-a5ec-4bcc-8d28-b71d4cd8a22c',
            name:'Danças Folclóricas',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'46b31caa-98c6-4625-bf66-64cbc14a3a1c',
            name:'Danças Latinas',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'5b816361-b9b6-42f6-b570-5f7e0dd3c55d',
            name:'Danças de Rua',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'c6add817-22ff-457e-9389-e73e8a51db3d',
            name:'Bit trap',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'c6c887d1-c02b-41f1-a690-70ec63100625',
            name:'MCs reunidos',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'45af70a4-08c0-4ec9-b5ab-7d56fdcf15a9',
            name:"Funkeiros",
            type:$Enums.CATEGORY_TYPE.AMBOS
        }


//npx prisma db seed subir categoria
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
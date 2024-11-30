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
        },
        {
            id:'eab2a7d3-68d6-4bfd-b322-6334b1c8f756',
            name:'Dorameiros',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'4b2276a5-dd8d-4740-9dce-9c1241727d14',
            name:'GLs',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'f2b7cf14-5cef-450c-85fd-ff4956cfe580',
            name:'TWICE',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'25b08c13-3622-443a-a8a7-1731a3ef575e',
            name:'Baseboll',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'7c8732d3-40db-4de8-b194-54beae3a3e8d',
            name:'Boliche',
            type:$Enums.CATEGORY_TYPE.EVENTO
        },   
        {
            id:'c940b6d5-8c3c-43ae-ad56-dae1d06314e5',
            name:'BTS',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'24dcbca7-d745-4768-bb43-ca6f0e217a5c',
            name:'Clubes do livro',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'ffaec119-1afe-4f08-8504-d7553ff45e06',
            name:'Inteligência artificial',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'617f425a-db2b-4d43-aa17-d968d7b85ea4',
            name:'Gastronomia',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'32be44e1-4958-4c81-b059-2258c9712306',
            name:'Empreendedores',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'e2c582c8-f94e-4d6a-aa32-1e7018b016bb',
            name:'Networking Profissional ',
            type:$Enums.CATEGORY_TYPE.GRUPO
        },
        {
            id:'7e168535-323d-411a-882c-449da54b048e',
            name:'Desenvolvimento de Software',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'0afee1b3-8843-4740-9a4d-ba5c47d70cfa',
            name:'Consultoria e Coaching',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'a6de8b0b-bdf4-4a24-9f29-ef0a9bf9dc60',
            name:'Voluntariado de Meio Ambiente',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'62793a87-2fee-482d-ad88-a9af783ffa56',
            name:'Ajuda Humanitária',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'47834369-1e96-42b9-82f2-4c98cdaeb179',
            name:'Ação Social',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'2c8f8e94-6b2e-4b44-83fe-15c1a3b7ccf4',
            name:'Proteção Animal',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'015c3a3b-6c37-4ee4-8dc1-8fd8f117d778',
            name:'Direitos Humanos e Cidadania',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'3be5120b-4219-4b66-bc0b-137ed2da135c',
            name:'Voluntariado Local e Internacional',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'3faffc0f-fa11-4577-b465-56b37cd26e38',
            name:'Estudos de Ciências',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'99827fb9-79a2-412c-b4ce-3246682928c5',
            name:'Estudos de História',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'307d1180-d983-4747-8805-185060df5a4b',
            name:'Estudos de Filosofia',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'f4b42cce-4e3b-4850-a52f-860b0bc32260',
            name:'Estudos de Psicologia',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'ee964bfe-6bf9-4c08-b7ec-2abd714eabdc',
            name:'Educação Física',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'2c8d8a81-da73-4937-ad2c-322bf8a9f0f7',
            name:'Estudos de Saúde Tecnologia',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'cc61410e-adbd-461b-8624-0e02afdfbc6c',
            name:'Estudos de Inovação Estudos Culturais',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'72f5485b-9c60-4f77-aa33-5cb8b9b915ce',
            name:'Séries e Filmes',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'63991ec1-52f4-4e10-aedb-a61c2043a714',
            name:'Anime e Mangá',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'fc268810-dc37-420b-aa77-11a290043836',
            name:'Teatro e Performances',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'be551f29-a93f-450c-8b88-35b8ae883535',
            name:'',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'54a81a1b-d448-4e18-bf18-648116b88adicionar',
            name:'Eventos Culturais ',
            type:$Enums.CATEGORY_TYPE.EVENTO
        },
        {
            id:'d10f4f37-989d-49bb-9dba-924e6a2a6c90',
            name:'Fitness',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'3623c216-55a5-4c05-b80d-8ad1a270c7c5',
            name:'Saúde e Nutrição',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'370921b7-0e5c-4bb2-bafa-bffbb97b1300',
            name:'Autocuidado e Beleza',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'4db2e4f5-c72b-4718-8947-223987816256',
            name:'Astrologia e Espiritualidade',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'486f623d-08a4-4213-bf17-765e19fbc39a',
            name:'YouTubers',
            type:$Enums.CATEGORY_TYPE.AMBOS
        },
        {
            id:'072822c5-cb5e-46a9-9f05-3545d40710f6',
            name:'Blogs',
            type:$Enums.CATEGORY_TYPE.AMBOS
        }

        


//npx prisma db seed subir categoria
//https://www.uuidgenerator.net/
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
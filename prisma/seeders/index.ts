import { PrismaClient } from '@prisma/client';
import { insertCategories } from './categories';

const prisma = new PrismaClient();

async function seed() {
  await insertCategories(prisma);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
  
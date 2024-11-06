'use server'

import { CATEGORY_TYPE, PrismaClient } from "@prisma/client";

export default async function getCategories(categoriesType: CATEGORY_TYPE) {
    const prisma = new PrismaClient()

    const categories = await prisma.category.findMany({
        where: {
            type: categoriesType
        }
    })

    console.log(categories)

    return categories
}

'use server'

import { nextAuthOptions } from "@/lib/utils";
import { CATEGORY_TYPE, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function getCategories(categoriesType: CATEGORY_TYPE) {
    const prisma = new PrismaClient()

    const categories = await prisma.category.findMany({
        where: {
            OR: [
                {
                    type: categoriesType
                },
                {
                    type: 'AMBOS'
                }
            ]
        }
    })

    return categories
}

export async function getGroups() {
    const prisma = new PrismaClient()

    const user = (await getServerSession(nextAuthOptions))!.user

    const groups = await prisma.group.findMany({
        where: {
            users: {
                some: {
                    userId: user.id
                }
            },
        }
    })

    console.log(groups)

    return groups
}

export async function getEvents() {
    const prisma = new PrismaClient()

    const user = (await getServerSession(nextAuthOptions))!.user

    const events = await prisma.event.findMany({
        where: {
            users: {
                some: {
                    userId: user.id
                }
            },
        }
    })

    console.log(events)

    return events
}

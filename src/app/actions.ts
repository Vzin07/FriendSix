'use server'

import { nextAuthOptions } from "@/lib/utils";
import { CATEGORY_TYPE, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient()

export async function getCategories(categoriesType: CATEGORY_TYPE) {

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

export async function getPosts(id: string, target: 'EVENTO' | 'GRUPO') {
    let posts: any = []

    if (target === 'EVENTO') {
        posts = []
    } else if (target === 'GRUPO') {
        posts = await prisma.group.findMany({
            where: {
                id,
            },
            include: {
                posts: true
            }
        })
    }

    console.log(posts)

    return posts
}

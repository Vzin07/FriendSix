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

    return groups
}

export async function getGroupById(id: string) {
    const group = await prisma.group.findUnique({
        where: {
            id
        },
        include: {
            users: {
                where: {
                    owner: true
                },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    return group
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

    return events
}

export async function getPosts(target: 'EVENTO' | 'GRUPO' | 'AMBOS') {
    const session = await getServerSession(nextAuthOptions)

    // const posts = await prisma.user.findMany({
    //     where: {
    //         id: session?.user.id,
    //     },
    //     select: {
    //         id: true,
    //         eventPosts: target === 'EVENTO' || 'AMBOS' ? true : false,
    //         groupPosts: target === 'GRUPO' || 'AMBOS' ? true : false,
    //     },
    // })

    const posts = await prisma.$queryRaw`
        SELECT
            id,         
            photo,     
            title,      
            description,
            user_id as userId,
            'GRUPO' as type
        FROM
            group_posts

        UNION ALL

        SELECT
            id,         
            photo,      
            title,      
            description,
            user_id as userId,
            'EVENTO' as type
        FROM
            event_posts
    `

    console.log(posts)

    return posts
}

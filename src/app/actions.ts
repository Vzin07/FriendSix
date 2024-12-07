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

export async function getPosts(type: 'EVENTO' | 'GRUPO' | 'AMBOS') {
    const session = await getServerSession(nextAuthOptions)


    const posts = await prisma.user.findUnique({
        where: {
            id: session?.user.id,
        },
        select: {
            groupPosts: {
                select: {
                    id: true,
                    photo: true,
                    title: true,
                    description: true,
                    userId: true,
                    user: {
                        select:{
                            name:true
                        }
                    },
                    group:{
                        select:{
                            name:true
                        }
                    },
                    createdAt: true
                }
            },
            eventPosts: {
                select: {
                    id: true,
                    photo: true,
                    title: true,
                    description: true,
                    userId: true,
                    user: {
                        select:{
                            name:true
                        }
                    },
                    event:{
                        select:{
                            name:true
                        }
                    },
                    createdAt: true,
                }
            }
        },
    })


    const postsWithType = {
        groupPosts: posts.groupPosts.map(post => ({
            ...post,
            type: 'GRUPO',
        })),
        eventPosts: posts.eventPosts.map(post => ({
            ...post,
            type: 'EVENTO',
        })),
    };

    if (type == 'GRUPO') {
        return postsWithType.groupPosts
    };

    if (type == 'EVENTO') {
        return postsWithType.eventPosts
    };
    return postsWithType
}



export async function getComments(id: string, type: string) {
    let comments
    let commentCount = 0
    console.log(type)
    if (type == 'GRUPO') {
        comments = await prisma.commentGroupPost.findMany({
            where: {
                groupPostId: id
            }
        })

        commentCount = await prisma.commentGroupPost.count({
            where: {
                groupPostId: id
            }
        })
    }

    if (type == 'EVENTO') {
        comments = await prisma.commentEventPost.findMany({
            where: {
                eventPostId: id
            }
        })

        commentCount = await prisma.commentEventPost.count({
            where: {
                eventPostId: id
            }
        })
    }

    return {
        comments,
        commentCount
    }
}

export async function getLikes(id: string, type: string) {
    const session = (await getServerSession(nextAuthOptions))!.user

    let likeStatus = false
    let likeCount = 0

    if (type == 'GRUPO') {
        const existingLike = await prisma.likeGroupPost.findFirst({
            where: {
                groupPostId: id,
                userId: session?.id
            },
        })

        if (existingLike) {
            likeStatus = true
        }

        likeCount = await prisma.likeGroupPost.count({
            where: {
                groupPostId: id,
            },
        })
    }

    if (type == 'EVENTO') {
        const existingLike = await prisma.likeEventPost.findFirst({
            where: {
                eventPostId: id,
                userId: session?.id
            },
        })

        if (existingLike) {
            likeStatus = true
        }

        likeCount = await prisma.likeEventPost.count({
            where: {
                eventPostId: id,
            },
        })
    }

    return {
        likeStatus,
        likeCount
    }
}
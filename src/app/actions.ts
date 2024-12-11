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

    const userPosts = await prisma.user.findUnique({
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
                        select: {
                            name: true
                        }
                    },
                    group: {
                        select: {
                            name: true
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
                        select: {
                            name: true
                        }
                    },
                    event: {
                        select: {
                            name: true
                        }
                    },
                    createdAt: true,
                }
            }
        },
    })

    if (userPosts) {
        const combinedPosts = [
            ...userPosts.groupPosts.map(post => ({
                ...post,
                type: 'GRUPO',
            })),
            ...userPosts.eventPosts.map(post => ({
                ...post,
                type: 'EVENTO',
            }))
        ];

        combinedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (type === 'GRUPO') {
            return userPosts.groupPosts;
        }

        if (type === 'EVENTO') {
            return userPosts.eventPosts;
        }

        return combinedPosts;
    }

    return []
}



export async function getComments(id: string, type: string) {
    let comments
    let commentCount = 0
    console.log(type)
    if (type == 'GRUPO') {
        comments = await prisma.commentGroupPost.findMany({
            where: {
                groupPostId: id
            },
            select: {
                id: true,
                userId: true,
                user: {
                    select: {
                        name: true,
                        photoProfile: true
                    }
                },
                groupPostId: true,
                text: true
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
            },
            select: {
                id: true,
                userId: true,
                user: {
                    select: {
                        name: true,
                        photoProfile: true
                    }
                },
                eventPostId: true,
                text: true
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

export async function fetchUsers(term: string) {
    const lowerCaseTerm = `%${term.toLowerCase()}%`

    const users = await prisma.$queryRaw`
    SELECT * FROM Users
    WHERE LOWER(name) 
    LIKE LOWER(${lowerCaseTerm})
  `;

    return users;
};

export async function fetchGroups(term: string) {
    const lowerCaseTerm = `%${term.toLowerCase()}%`

    const groups = await prisma.$queryRaw`
    SELECT * FROM \`Groups\`
    WHERE LOWER(name) 
    LIKE LOWER(${lowerCaseTerm})
  `;

    return groups;
}

export async function fetchEvents(term: string) {
    const lowerCaseTerm = `%${term.toLowerCase()}%`

    const events = await prisma.$queryRaw`
    SELECT * FROM Events
    WHERE LOWER(name) 
    LIKE LOWER(${lowerCaseTerm})
  `;

    return events;
}
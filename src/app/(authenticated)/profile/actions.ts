import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()


export async function getUserById(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
        }
    })
    return user
}


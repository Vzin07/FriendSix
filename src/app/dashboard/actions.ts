'use server'

import { nextAuthOptions } from "@/lib/utils"
import { InitialState } from "@/types"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { z } from "zod"

const prisma = new PrismaClient()

export async function createGroup(prevState: InitialState, formData: FormData) {
    console.log(formData)

    const state = {
        success: true,
        errors: {}
    }

    const schema = z.object({
        name: z.string().max(90, "Nome deve ter até 90 caracteres.").min(4, "nome deve ter no mínimo 4 caracteres"),
        categoryId: z.string().uuid()
    })

    type Group = z.infer<typeof schema>

    const data: Group = {
        name: formData.get('name') as string,
        categoryId: formData.get('categoria') as string,
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
        state.success = false
        state.errors = validatedFields.error.flatten().fieldErrors

        return state
    }

    const user = (await getServerSession(nextAuthOptions))!.user

    await prisma.group.create({
        data: {
            name: data.name,
            categoryId: data.categoryId,
            users: {
                create: {
                    owner: true,
                    userId: user.id,
                }
            }
        }
    })

    return state
}

export async function createEvent(prevState: InitialState, formData: FormData) {
    console.log(formData)

    const state = {
        success: true,
        errors: {}
    }

    const schema = z.object({
        name: z.string().max(90, "Nome deve ter até 90 caracteres.").min(4, "nome deve ter no mínimo 4 caracteres"),
        categoryId: z.string().uuid(),
        date: z.string().datetime({ local: true }),
        location: z.string()
    })

    type Event = z.infer<typeof schema>

    const data: Event = {
        name: formData.get('name') as string,
        categoryId: formData.get('categoria') as string,
        date: formData.get('datetime') as string + ":00Z",
        location: formData.get('local') as string

    }

    const validatedFields = schema.safeParse(data)



    if (!validatedFields.success) {
        state.success = false
        state.errors = validatedFields.error.flatten().fieldErrors

        console.log(state)
        return state
    }

    const user = (await getServerSession(nextAuthOptions))!.user

    await prisma.event.create({
        data: {
            name: data.name,
            categoryId: data.categoryId,
            date: data.date,
            location: data.location,
            users: {
                create: {
                    owner: true,
                    userId: user.id,
                }
            }
        }
    })


    return state
}

export async function createPostOnEvent(prevState: InitialState, formData: FormData) {
    console.log(formData)

    const state = {
        success: true,
        errors: {}
    }

    const schema = z.object({
        photo: z.string(),
        title: z.string().max(45),
        description: z.string().max(1024),
        eventId: z.string().uuid()
    })

    type Post = z.infer<typeof schema>

    const data: Post = {
        photo: formData.get('photo') as string,
        title: formData.get('name') as string,
        description: formData.get('name') as string,
        eventId: formData.get('eventId') as string
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
        state.success = false
        state.errors = validatedFields.error.flatten().fieldErrors

        console.log(state)
        return state
    }

    const user = (await getServerSession(nextAuthOptions))!.user

    await prisma.post.create({
        data: {
            photo: data.photo,
            title: data.title,
            description: data.description,
            userId: user.id,
            events: {
                connect: {
                    id: data.eventId
                }
            }
        }
    })

    return state
}

export async function createPostOnGroup(prevState: InitialState, formData: FormData) {
    console.log(formData)

    const state = {
        success: true,
        errors: {}
    }

    const schema = z.object({
        photo: z.string(),
        title: z.string().max(45),
        description: z.string().max(1024),
        groupId: z.string().uuid()
    })

    type Post = z.infer<typeof schema>

    const data: Post = {
        photo: formData.get('photo') as string,
        title: formData.get('name') as string,
        description: formData.get('name') as string,
        groupId: formData.get('eventId') as string
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
        state.success = false
        state.errors = validatedFields.error.flatten().fieldErrors

        console.log(state)
        return state
    }

    const user = (await getServerSession(nextAuthOptions))!.user

    await prisma.post.create({
        data: {
            photo: data.photo,
            title: data.title,
            description: data.description,
            userId: user.id,
            groups: {
                connect: {
                    id: data.groupId
                }
            }
        }
    })

    return state
}
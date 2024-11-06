'use server'

import { InitialState } from "@/types"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

export async function createGroup(prevState: InitialState, formData: FormData) {
    console.log(formData)

    const prisma = new PrismaClient()

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

    await prisma.group.create({
        data: {
            name: data.name,
            categoryId: data.categoryId
        }
    })

    return state
}

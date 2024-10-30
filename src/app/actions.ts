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
        categoria: z.coerce.number()
    })

    type Grupo = z.infer<typeof schema>

    const data: Grupo = {
        name: formData.get('name') as string,
        categoria: Number(formData.get('categoria') as string),
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
        state.success = false
        state.errors = validatedFields.error.flatten().fieldErrors

        return state
    }

    await prisma.grupo.create({
        data: {
            GRU_NOME: data.name,
            GRU_CAT_CODIGO: data.categoria
        }
    })
    
    return state
}

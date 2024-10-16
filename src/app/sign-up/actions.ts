'use server'

import { z } from "zod"

export async function signUp(prevState: InitialState, formData: FormData) {
    const state = {
        success: true,
        errors: {}
    }

    const schema = z.object({
        name: z.string().max(90, "Nome deve ter até 90 caracteres."),
        email: z.string().email('E-mail inválido.'),
        password: z.string().min(8, 'A senha deve conter ao menos 8 caracteres.')
    })

    type SignUp = z.infer<typeof schema>

    const data: SignUp = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
        state.success = false
        state.errors = validatedFields.error.flatten().fieldErrors

        return state
    }

    return state
}
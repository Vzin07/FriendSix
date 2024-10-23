'use server'

import { z } from "zod"

export default function signUp(prevState: InitialState, formData: FormData) {
    
    const state = {
        success: false,
        errors: {}
    }

    const user = {
        email: 'popeyemelancia@email.com',
        password: '12345678'
    }

    const schema = z.object({
        email: z.string().email('E-mail inválido.'),
        password: z.string().min(8, 'A senha deve conter ao menos 8 caracteres.')
    })

}
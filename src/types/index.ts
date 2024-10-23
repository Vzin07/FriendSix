import { usuarios } from "@prisma/client"

export type InitialState = {
    success: boolean
    errors: object
}

export type UserWithoutPassword = Omit<usuarios, "USU_SENHA">

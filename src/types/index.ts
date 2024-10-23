import { usuarios } from "@prisma/client/wasm"

export type InitialState = {
    success: boolean
    errors: object
}

export type UserWithoutPassword = Omit<usuarios, "USU_SENHA" | "USU_CODIGO">

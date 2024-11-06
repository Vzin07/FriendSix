import { User } from "@prisma/client/wasm"

export type InitialState = {
    success: boolean
    errors: object
}

export type UserWithoutPassword = Omit<User, "password">

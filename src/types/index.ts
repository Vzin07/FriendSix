import { User } from "@prisma/client/wasm"

export type InitialState = {
    success: boolean
    errors: Record<string, string>
}

export type UserWithoutPassword = Omit<User, "password">

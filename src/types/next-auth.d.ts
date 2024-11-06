import { AuthUser, UserWithoutPassword } from '.'

declare module 'next-auth' {
  interface Session {
    user: UserWithoutPassword
  }
}

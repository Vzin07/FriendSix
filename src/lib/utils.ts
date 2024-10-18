import { PrismaClient } from '@prisma/client'
import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
    session: {
        maxAge: 8 * 60 * 60, // 8 hours
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email@email.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '********',
                },
            },
            async authorize(credentials, req) {
                try {
                    const prisma = new PrismaClient

                    const user = prisma.usuarios.findUnique({
                        where: {
                            USU_EMAIL: credentials!.email
                        }
                    })

                    if (credentials!.email != user.USU_EMAIL || credentials!.password != user.password) {
                        return null
                    }

                    const { password, ...rest } = user

                    return rest as User
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'An unknown error occurred'

                    throw new Error(errorMessage)
                }
            },
        }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (user) {
                token.user = user
            } else if (trigger === 'update' && session) {
                token.user = session.user
            }

            return token
        },
        async session({ session, token }) {
            session.user = token.user as {
                id: string,
                email: string
            }

            return session
        },
    },
}

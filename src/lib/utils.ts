import { UserWithoutPassword } from '@/types'
import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
    jwt: {
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
                    const argon2 = await import('argon2')

                    const prisma = new PrismaClient()

                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials!.email
                        }
                    })

                    if (!user) {
                        return null
                    }

                    const salt = process.env.PASSWORD_SALT

                    const passwordVerify = await argon2.verify(
                        user.password,
                        credentials!.password + salt
                    )

                    if (!passwordVerify) {
                        return null
                    }

                    const { password, ...rest } = user

                    return rest
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
            session.user = token.user as UserWithoutPassword

            return session
        },
    },
}

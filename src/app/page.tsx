'use client'

import Logo from '@/components/logo';
import { FormEvent, useState } from "react"
import { z } from "zod"
import { signIn as nextAuthSignIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Login() {
  const [errors, setErrors] = useState({})

  const router = useRouter()


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const schema = z.object({
      email: z.string().email('E-mail inválido.'),
      password: z.string().min(8, 'A senha deve conter ao menos 8 caracteres.')
    })

    type SignIn = z.infer<typeof schema>

    const data: SignIn = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors)

      return
    }

    const login = await nextAuthSignIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    })

    if (!login?.ok) {
      setErrors({
        general: 'Revise suas credenciais de acesso.'
      })

      return
    }

    router.replace('/dashboard')
  }

  return (
    <div className="flex justify-center items-center h-screen bg-orange-400">
      <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className='rounded-full bg-orange-500 w-20 flex flex-col justify-center items-center aspect-square p-2'>

          <Link href={'/dashboard'}>
            <Logo title />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="placeholder-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-700 bg-orange-400"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="placeholder-gray-600 bg-orange-400 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-700"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
            </label>
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/sign-up" className="text-orange-500 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;



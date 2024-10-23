'use client'
import React, { useEffect, useState } from 'react';
import Logo from '@/components/logo';
import { useFormState } from 'react-dom';
import { signUp } from './actions';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { InitialState } from '@/types';

const initialState: InitialState = {
  success: false,
  errors: {}
}

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, formAction] = useFormState(signUp, initialState)

  const router = useRouter()

  useEffect(() => {
    const login = async () => {
      await signIn('credentials', {
        email,
        password,
        redirect: false
    })
    }

    if (state.success) {
      login()
      
      router.replace('/dashboard')
    }
  }, [state.success, router])

  return (
    <div className="flex justify-center items-center h-screen bg-orange-400">
      <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className='rounded-full bg-orange-500 w-20 flex flex-col justify-center items-center aspect-square '>
        <Logo title/>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Cadastrar-se</h2>
        <form action={formAction} className='w-full'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <a href="/" className="text-orange-500 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

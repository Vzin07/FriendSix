'use client'
import React from 'react';
import Logo from '@/components/logo';
import { useFormState } from 'react-dom';
import { createGroup } from '../dashboard/actions';
import { InitialState } from '@/types';

const initialState: InitialState = {
  success: false,
  errors: {}
};

const categorias = [
  { id: 1, name: 'Categoria 1' },
  { id: 2, name: 'Categoria 2' },
  { id: 3, name: 'Categoria 3' },
  { id: 4, name: 'Categoria 4' }
];

function CriarGrupos() {
  const [state, formAction] = useFormState(createGroup, initialState);

  return (
    <div className="flex justify-center items-center h-screen bg-orange-400">
      <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className='rounded-full bg-orange-500 w-20 flex flex-col justify-center items-center aspect-square '>
          <Logo title />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Criar Grupo</h2>
        <form action={formAction} className='w-full'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nome do Grupo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
              Categoria
            </label>
            <select
              name="categoria"
              id="categoria"
              className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              {categorias.map((categoria) => (
                <option value={categoria.id} key={categoria.id}>{categoria.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Criar Grupo
          </button>
        </form>
      </div>
    </div>
  );
}

export default CriarGrupos;

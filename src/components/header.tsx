'use client'

import Logo from "@/components/logo";
import { AlignJustify, CircleUserRound, LogOut, Replace, Search, } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreatModalGroup from "./creatModalGroup";
import CreatModalEvent from "./creatModalEvent";
import { useRouter } from "next/navigation";



export default function Header() {
  const { data: session } = useSession();
  const [drawer, setDrawer] = useState(false);
  const [perfil, setPerfil] = useState(false);

  const router = useRouter()

  return (
    <div className="bg-black w-full h-20 flex justify-between items-center shadow-black shadow-md fixed">
      <div>
        <button onClick={() => setDrawer(true)} className="flex md:hidden cursor-pointer p-3 text-gray-200">
          <AlignJustify className="w-8 h-8" />
        </button>
      </div>

      <div onClick={() => { router.replace("/dashboard") }} className="flex justify-center cursor-pointer md:absolute items-center p-3">
        <h1 className="text-white text-2xl mx-2 font-morsan justify-center flex-col">
          <strong>FriendSix</strong>
        </h1>

        <div className="w-16 h-16 aspect-square bg-orange-500 rounded-full flex flex-col justify-center items-center">
          <Logo title />
        </div>
      </div>

      <div className="h-full justify-center">
        <div className=" md:absolute hidden items-center p-2 relative md:flex mt-4 -ml-24">
          <input
            type="text"
            className="pl-10 p-2 border border-gray-300 rounded-md w-full md:w-96 h-8"
            placeholder="Pesquisar"
            aria-label="Pesquisar conteúdo"
            id="search"
          />
          <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div>
        <button onClick={() => setPerfil((prevState) => !prevState)} className="flex items-center text-center p-3 cursor-pointer">
          <h1 className="font-morsan text-3xl text-gray-200 hover:text-blue-600 p-1 underline">
            {session?.user.name || "Usuário"}
          </h1>
          <CircleUserRound className="w-10 h-10 text-gray-200" />
        </button>
      </div>

      <div data-open={drawer} className="bg-gradient-to-r from-black fixed top-0 left-0 bottom-0 right-0 transition-transform data-[open=false]:-translate-x-full" onClick={() => setDrawer(false)}>
        <ul onClick={e => e.stopPropagation()} className="flex gap-4 flex-col p-4 w-60 h-full bg-black text-white">
          <li className="items-center p-2 relative md:flex">
            <input
              type="text"
              className="pl-10 p-2 border border-gray-300 rounded-md w-full md:w-96 h-8"
              placeholder="Pesquisar"
              aria-label="Pesquisar conteúdo"
              id="searchMenu"
            />
            <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 cursor-pointer" />
          </li>
          <li onClick={() => { router.replace("/dashboard") }} className="cursor-pointer hover:underline"
          >
            Página inicial
          </li>
          <li className="cursor-pointer hover:underline text-gray-500">Categorias</li>
          <li className="cursor-pointer hover:underline pt-4 border-t-2 border-white"><CreatModalGroup /></li>
          <li className="cursor-pointer hover:underline"><CreatModalEvent /></li>
          <li className="cursor-pointer hover:underline pt-4 border-t-2 border-white text-gray-500">Contatos</li>
          <li className="cursor-pointer hover:underline text-gray-500">Sobre</li>
        </ul>
      </div>

      <div data-open={perfil} className="flex justify-end fixed top-20 bottom-0 right-0 left-0 transition-transform data-[open=false]:translate-x-full" onClick={() => setPerfil((prevState) => !prevState)}>
        <ul onClick={e => e.stopPropagation()} className="flex gap-4 flex-col p-4 w-60 h-64 rounded-es-2xl bg-black text-white">
          <li onClick={() => { router.replace("/perfil") }} className="cursor-pointer hover:underline">Perfil</li>
          <li className="cursor-pointer hover:underline pb-4 border-b-2 border-white text-gray-500">Configurações</li>
          <li className="md:hidden cursor-pointer hover:underline text-gray-500">Grupos</li>
          <li className="md:hidden cursor-pointer hover:underline text-gray-500">Eventos</li>
          <li className="cursor-pointer hover:underline text-gray-500">Posts</li>
          <li className="text-red-600 pt-4 border-t-2 border-white cursor-pointer hover:underline"><LogOut />Sair</li>
        </ul>
      </div>
    </div>
  )
}
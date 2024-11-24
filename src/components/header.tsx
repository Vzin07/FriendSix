import Logo from "@/components/logo";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="bg-black w-full h-20 flex justify-between items-center gap-9 shadow-black shadow-md fixed">
      <div className="flex justify-start items-center">
        <h1 className="text-white text-2xl mx-2 font-morsan justify-center flex-col">
          <strong>FriendSix</strong>
        </h1>

        <div className="w-16 h-16 aspect-square bg-orange-500 rounded-full flex flex-col justify-center items-center">
          <Logo title />
        </div>
      </div>
      <div className="flex items-center p-2 relative">
        <input
          type="text"
          className="pl-10 p-2 border border-gray-300 rounded-md w-full md:w-96 h-8"
          placeholder="Pesquisar"
          aria-label="Pesquisar conteúdo"
          id="pesquisa"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 absolute left-3 top-3.5 text-gray-500 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <div className="flex items-center p-2 cursor-pointer">
        <h2 className="font-morsan text-gray-200 hover:text-blue-600 text-xl pr-1">
          <strong>{session?.user.name || "Usuário"}</strong>
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-200 cursor-pointer hover:text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>
    </div>
  )
}
'use client'

import { useSession } from "next-auth/react";
import Header from "@/components/header"
import { Session } from "inspector/promises"
import { useState } from "react";
import { BookUser, CalendarRange, CircleEllipsis, ContactRound, UsersRound } from "lucide-react"



export default function Perfil() {

    const { data: session } = useSession();
    const [perfil, setPerfil] = useState(false);

    return (
        <div className="w-full h-screen bg-orange-400">

            <Header />

            <div className="w-full h-full p-2">
                <div className="w-full h-80 rounded-md bg-cyan-300">
                    <img src="" alt="" className="object-cover w-full h-full rounded-md" />
                </div>
                <div className="flex gap-3 -mt-14">
                    <div className="size-52 rounded-full border-2 border-black -mt-24 ml-12 bg-lime-600">
                        <img src="" alt="" className="object-cover w-full h-full rounded-full" />
                    </div>

                    <h1 className="font-morsan text-5xl hover:cursor-pointer">{session?.user.name}</h1>
                </div>

                <div className="flex mr-5 -mt-14 pt-2 justify-end">
                    <ul className="flex gap-14">
                        <ul className="font-morsan cursor-pointer hover:underline">
                            <ContactRound />
                            Amigos
                        </ul>
                        <ul className="font-morsan cursor-pointer hover:underline">
                            <UsersRound />
                            Grupos
                        </ul>
                        <ul className="font-morsan cursor-pointer hover:underline">
                            <CalendarRange />
                            Eventos
                        </ul>
                        <ul className="font-morsan cursor-pointer hover:underline">
                            <BookUser />
                            Posts
                        </ul>
                        <ul className="font-morsan cursor-pointer hover:underline">
                            <CircleEllipsis />
                            Mais
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    )
}
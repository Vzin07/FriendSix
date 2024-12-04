'use client'

import { useEffect, useState } from "react";
import CreatModalEvent from "./creatModalEvent"
import CreatModalGroup from "./creatModalGroup"
import { Event, Group } from "@prisma/client";
import { getEvents, getGroups } from "@/app/actions";
import Card from "./card";



export default function MenuDashboard() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [events, setEvents] = useState<Event[]>([]);

    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const events = async () => {
            setEvents(await getEvents());
        };

        const groups = async () => {
            setGroups(await getGroups());
        };

        events();
        groups();
    }, []);

    return (
        <div className="w-72 h-full border-r-2 border-solid border-black hidden md:block">
            <div>
                <div className="p-2 h-40 border-b-2 border-solid border-black">
                    <h1 className="font-morsan text-2xl text-black pb-5">AÇÕES</h1>
                    <div className="flex cursor-pointer hover:underline bg-orange-300 hover:bg-orange-600 rounded-md p-1 m-1">
                        <CreatModalGroup />
                    </div>

                    <div className="flex cursor-pointer hover:underline bg-orange-300 hover:bg-orange-600 rounded-md p-1 m-1">
                        <CreatModalEvent />
                    </div>
                </div>

                <div className=" flex w-full h-auto border-b-2 border-solid border-black">
                    <div className="w-1/2 cursor-pointer hover:underline hover:bg-orange-600 text-center border-r-2 border-solid border-black">
                        <h3 className="hover:underline cursor-pointer" onClick={() => setToggle(true)}>Meus Grupos</h3>
                    </div>

                    <div className="w-1/2 cursor-pointer hover:underline hover:bg-orange-600 text-center">
                        <h3 className="hover:underline cursor-pointer" onClick={() => setToggle(false)}>Meus Eventos</h3>
                    </div>
                </div>
            </div>

            <div className="w-full h-96 overflow-auto">
                <div className={`${toggle ? 'flex flex-col items-center ' : 'hidden'}`}>
                    <div className="w-10/12 flex flex-col gap-2 mt-2">
                        {groups.map((group, index) => (
                            <Card key={index} name={group.name} id={group.id} type="group" />
                        ))}
                    </div>
                </div>

                <div className={`${!toggle ? 'flex flex-col items-center' : 'hidden'}`}>
                    <div className="w-10/12 flex flex-col gap-2 mt-2">
                        {events.map((event, index) => (
                            <Card key={index} name={event.name} id={event.id} type="event" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
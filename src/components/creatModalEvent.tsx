'use client'

import { useEffect, useState } from "react";
import Logo from "./logo";
import { useFormState } from "react-dom";
import { InitialState } from "@/types";
import { createEvent } from "@/app/dashboard/actions";
import { Category, Event } from "@prisma/client";
import { Calendar } from "lucide-react";
import { getCategories, getEvents } from "@/app/actions";

const initialState: InitialState = {
    success: false,
    errors: {},
};

export default function CreatModalEvent() {
    const [isModalOpenEvent, setIsModalOpenEvent] = useState(false);
    const [eventCategories, setEventCategories] = useState<Category[]>([]);
    const [events, setEvents] = useState<Event[]>([])

    const [eventState, eventFormAction] = useFormState(createEvent, initialState);

    const toggleModalEvent = () => {
        setIsModalOpenEvent(!isModalOpenEvent);
    };

    useEffect(() => {
        const eventCategories = async () => {
            setEventCategories(await getCategories("EVENTO"));
        };

        eventCategories();
    }, []);

    useEffect(() => {
        const events = async () => {
            setEvents(await getEvents());
        };

        if (eventState.success == true) {
            setIsModalOpenEvent(false);
            events()
        };

    }, [eventState.success]);

    return (
        <div>
            <div onClick={toggleModalEvent}
                className="flex"
            >
                <Calendar />
                <h2 className="ps-2">Criar Eventos</h2>
            </div>
            
            {isModalOpenEvent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center relative">
                        <div
                            onClick={toggleModalEvent}
                            className="flex flex-col  cursor-pointer absolute top-0 right-0 p-2"
                        >
                            X
                        </div>
                        <div className="rounded-full bg-orange-500 w-20 flex flex-col justify-center items-center aspect-square ">
                            <Logo title />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-6">
                            Criar Evento
                        </h2>
                        <form action={eventFormAction} className="w-full">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Nome do Evento
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
                                    placeholder="Digite o nome do Evento"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="categoria"
                                >
                                    Categoria
                                </label>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                >
                                    {eventCategories.map((categoria, index) => (
                                        <option value={categoria.id} key={index}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="data"
                                >
                                    Data do Evento
                                </label>
                                <input
                                    className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    type="datetime-local"
                                    name="datetime"
                                    id=""
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="local"
                                >
                                    Local do Evento
                                </label>
                                <input
                                    className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
                                    type="text"
                                    name="local"
                                    id="local"
                                    placeholder="Endereço"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Criar Evento
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
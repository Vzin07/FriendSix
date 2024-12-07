'use client'

import { useEffect, useState } from "react";
import Logo from "./logo";
import { useFormState } from "react-dom";
import { InitialState } from "@/types";
import { createGroup } from "@/app/dashboard/actions";
import { Category, Group } from "@prisma/client";
import { getCategories, getGroups } from "@/app/actions";
import { UsersRound } from "lucide-react";

const initialState: InitialState = {
    success: false,
    errors: {},
};

interface CreatModalGroupProps {
    onNewGroup: () => Promise<void>
}

export default function CreatModalGroup(props: CreatModalGroupProps) {
    const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
    const [groupCategories, setGroupCategories] = useState<Category[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);

    const [grouptState, groupFormAction] = useFormState(createGroup, initialState);

    const toggleModalGroups = () => {
        setIsModalOpenGroup(!isModalOpenGroup);
    };

    useEffect(() => {
        const groupCategories = async () => {
            setGroupCategories(await getCategories("GRUPO"));
        };

        groupCategories();
    }, []);

    useEffect(() => {
        const groups = async () => {
            setGroups(await getGroups());
        };

        const updateGroups = async () => {
            await props.onNewGroup()
        };

        if (grouptState.success == true) {
            grouptState.success = false
            grouptState.errors = {}
            updateGroups()
            setIsModalOpenGroup(false);
            groups();
        };

    }, [grouptState.success]);

    const [groupName, setGroupName] = useState('');

    return (
        <div>
            <div onClick={toggleModalGroups}
                className="flex"
            >
                <UsersRound />
                <h2 className="ps-2">Criar Grupos</h2>
            </div>

            {isModalOpenGroup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center relative">
                        <div
                            onClick={toggleModalGroups}
                            className="flex flex-col  cursor-pointer absolute top-0 right-0 p-2"
                        >
                            X
                        </div>
                        <div className="rounded-full bg-orange-500 w-20 flex flex-col justify-center items-center aspect-square ">
                            <Logo title />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-6">
                            Criar Grupo
                        </h2>
                        <form action={groupFormAction} className="w-full">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
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
                                    {groupCategories.map((categoria, index) => (
                                        <option value={categoria.id} key={index}>
                                            {categoria.name}
                                        </option>
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
            )}
        </div>
    );
}
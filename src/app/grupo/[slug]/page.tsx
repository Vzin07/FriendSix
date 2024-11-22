"use client";

import { getGroupById } from "@/app/actions";
import { useEffect, useState } from "react";
import ConteudoPrincipal from "@/components/conteudo";
import Logo from "@/components/logo";
import ComponetGrup from "@/components/grup";
import { useSession } from "next-auth/react";
import { InitialState } from "@/types";
import { useFormState } from "react-dom";
import { createEvent, createGroup } from "./actions";
import { getCategories, getEvents, getGroups } from "@/app/actions";
import { Category, Event, Group } from "@prisma/client";
import Link from "next/link";

const initialState: InitialState = {
    success: false,
    errors: {},
  };

export default function Page({ params }: { params: { slug: string } }) {
  const [group, setGroup] = useState<
    | ({
        users: ({
          user: {
            name: string;
          };
        } & {
          owner: boolean;
          userId: string;
          groupId: string;
        })[];
      } & {
        id: string;
        name: string;
        categoryId: string;
      })
    | null
  >();

  useEffect(() => {
    const getGroup = async () => {
      const groupData = await getGroupById(params.slug);

      setGroup(groupData);
    };

    getGroup();
  }, [params.slug]);

  const { data: session } = useSession();
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [isModalOpenEvent, setIsModalOpenEvent] = useState(false);
  const [groupCategories, setGroupCategories] = useState<Category[]>([]);
  const [eventCategories, setEventCategories] = useState<Category[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Event[]>([])

  const [state, formAction] = useFormState(createGroup, initialState);
  const [state2, formAction2] = useFormState(createEvent, initialState);

  const [toggle, setToggle] = useState(true)

  const toggleModalGroups = () => {
    setIsModalOpenGroup(!isModalOpenGroup);
  };

  const toggleModalEvent = () => {
    setIsModalOpenEvent(!isModalOpenEvent);
  };

  const xModalGroup = () => {
    setIsModalOpenGroup(!isModalOpenGroup);
  };

  const xModalEvent = () => {
    setIsModalOpenEvent(!isModalOpenEvent);
  };

  useEffect(() => {
    const categories = async () => {
      setGroupCategories(await getCategories("GRUPO"));
    };

    const groups = async () => {
      setGroups(await getGroups());
    };

    categories();
    groups();
  }, []);

  useEffect(() => {
    const categories = async () => {
      setEventCategories(await getCategories("EVENTO"));
    };

    const events = async () => {
      setEvents(await getEvents());
    };

    categories();
    events();
  }, []);

  useEffect(() => {
    const groups = async () => {
      setGroups(await getGroups());
    };

    if (state.success == true) {
      setIsModalOpenGroup(false);

      groups();
    }
  }, [state.success]);

  useEffect(() => {
    const events = async () => {
      setEvents(await getEvents());
    };

    if (state2.success == true) {
      setIsModalOpenEvent(false);

      events();
    }
  }, [state.success]);
  return (
    <div>
    <div className="w-full min-h-screen bg-orange-400">
      <div className="bg-black w-full h-20 flex justify-between items-center gap-9 shadow-black shadow-md">
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

      <div className="w-full h-screen flex">
        <div className="w-3/12 rounded-none border-2 border-solid border-black shadow-black shadow-lg">
          <div className="p-2 h-1/6">
            <h1 className="font-morsan text-2xl text-black pb-5">
              <strong>AÇÕES</strong>
            </h1>

            <div
              onClick={toggleModalGroups}
              className="flex cursor-pointer bg-orange-300 hover:underline hover:bg-orange-700 items-center rounded-md mb-2 hover:shadow-sm hover:shadow-current"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-7 h-7 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-5.216-.584-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <h2 className="ps-2">Criar Grupos</h2>
            </div>

            <div
              onClick={toggleModalEvent}
              className="flex cursor-pointer bg-orange-300 hover:underline hover:bg-orange-700 items-center rounded-md hover:shadow-sm hover:shadow-current"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-7 h-7 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <h2 className="ps-2">Criar Eventos</h2>
            </div>
          </div>

          <div className="w-full h-5/6 border-black border-solid border-b-2">
            <div className="h-8 w-full flex justify-center items-center text-center">
              <div className="border-black border-solid border-y-2 border-e-2 w-6/12 pl-2 hover:bg-orange-600">
                <h3 className="hover:underline cursor-pointer" onClick={() => setToggle(true)}>Meus Grupos</h3>
              </div>
              <div className="w-6/12 border-black border-solid border-2 border-s-0 border-e-0 pl-2 hover:bg-orange-600">
                <h3 className="hover:underline cursor-pointer" onClick={() => setToggle(false)}>Meus Eventos</h3>
              </div>
            </div>
            <div className={`${toggle ? 'flex flex-col items-center w-full' : 'hidden'}`}>
              <div className="w-10/12 flex flex-col gap-2 mt-2">
                {groups.map((group, index) => (
                  <Link href={`/grupo/${group.id}`} key={index}>
                    <ComponetGrup name={group.name} />
                  </Link>
                ))}
              </div>
            </div>

            <div className={`${!toggle ? 'flex flex-col items-center w-full' : 'hidden'}`}>
              <div className="w-10/12 flex flex-col gap-2 mt-2">
                {events.map((event, index) => (
                  <ComponetGrup name={event.name} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-9/12 border-2 border-solid border-black h-screen ">
          <div className="w-full h-1/6">
            <div className="p-2 justify-start">
              <h1 className="font-morsan text-2xl text-black">GRUPO</h1>
              <div className="flex w-full justify-end ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 w-7 h-7 flex items-end cursor-pointer mx-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center h-5/6 ">
            <ConteudoPrincipal />
            <ConteudoPrincipal />
            <ConteudoPrincipal />
          </div>
        </div>

        {isModalOpenGroup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center relative">
              <div
                onClick={xModalGroup}
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
              <form action={formAction} className="w-full">
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

        {isModalOpenEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-orange-200 p-8 rounded-lg shadow-lg flex flex-col items-center relative">
              <div
                onClick={xModalEvent}
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
              <form action={formAction2} className="w-full">
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
    </div>
    </div>
  );
}

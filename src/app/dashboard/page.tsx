"use client";

import Header from "@/components/header";
import Post from "@/components/post";
import Logo from "@/components/logo";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import { InitialState } from "@/types";
import { useFormState } from "react-dom";
import { createEvent, createGroup } from "./actions";
import { getCategories, getEvents, getGroups, getPosts } from "../actions";
import { Category, Event, Group } from "@prisma/client";
import { Calendar, UsersRound } from "lucide-react";

const initialState: InitialState = {
  success: false,
  errors: {},
};

export default function Dashboard() {
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [isModalOpenEvent, setIsModalOpenEvent] = useState(false);
  const [groupCategories, setGroupCategories] = useState<Category[]>([]);
  const [eventCategories, setEventCategories] = useState<Category[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Event[]>([])
  const [posts, setPosts] = useState<any>([])

  const [grouptState, groupFormAction] = useFormState(createGroup, initialState);
  const [eventState, eventFormAction] = useFormState(createEvent, initialState);

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
    const eventCategories = async () => {
      setEventCategories(await getCategories("EVENTO"));
    };

    const groupCategories = async () => {
      setGroupCategories(await getCategories("GRUPO"));
    };

    const events = async () => {
      setEvents(await getEvents());
    };

    const groups = async () => {
      setGroups(await getGroups());
    };

    const posts = async () => {
      setPosts(await getPosts('AMBOS'));
    };

    eventCategories();
    groupCategories();
    events();
    groups();
    posts()
  }, []);

  useEffect(() => {
    const events = async () => {
      setEvents(await getEvents());
    };

    const groups = async () => {
      setGroups(await getGroups());
    };

    if (eventState.success == true) {
      setIsModalOpenEvent(false);
      events();
    };

    if (grouptState.success == true) {
      setIsModalOpenGroup(false);
      groups();
    };

  }, [grouptState.success, eventState.success]);

  return (
    <div className="w-full h-screen bg-orange-400">

      <Header />

      <div className="w-full h-full flex pt-20 justify-between">
        <div className="w-72 h-full border-r-2 border-solid border-black hidden md:block">

          <div className="p-2 h-auto border-b-2 border-solid border-black">
            <h1 className="font-morsan text-2xl text-black pb-5">AÇÕES</h1>

            <div onClick={toggleModalGroups}
              className="flex cursor-pointer hover:underline bg-orange-300 hover:bg-orange-600 rounded-md p-1 m-1">
              <UsersRound />
              <h2 className="ps-2">Criar Grupos</h2>
            </div>

            <div onClick={toggleModalEvent}
              className="flex cursor-pointer hover:underline bg-orange-300 hover:bg-orange-600 rounded-md p-1 m-1">
              <Calendar />
              <h2 className="ps-2">Criar Eventos</h2>
            </div>
          </div>

          <div className="w-full">
            <div className=" flex w-full h-auto border-b-2 border-solid border-black">
              <div className="w-1/2 cursor-pointer hover:underline hover:bg-orange-600 text-center border-r-2 border-solid border-black">
                <h3 className="hover:underline cursor-pointer" onClick={() => setToggle(true)}>Meus Grupos</h3>
              </div>

              <div className="w-1/2 cursor-pointer hover:underline hover:bg-orange-600 text-center">
                <h3 className="hover:underline cursor-pointer" onClick={() => setToggle(false)}>Meus Eventos</h3>
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
        </div>

        <div className="md:w-8/12 h-full overflow-auto">
          <div className="p-2">
            <h1 className="font-morsan text-2xl text-black">FEED</h1>
          </div>

          <div className="flex flex-col items-center justify-center mx-5 gap-4">
            {posts.map((post, index) => (
              <div className="h-auto w-8/12" key={index}>
                <Post
                  id={post.id}
                  photo={post.photo}
                  title={post.title}
                  description={post.description}
                  userId={post.userId}
                  type={post.type}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-col w-2/12 border-2 border-solid border-black hidden md:block">
          <h1>Lateral</h1>
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
    </div>
  );
}
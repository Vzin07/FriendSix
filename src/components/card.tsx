'use client'

import { createPostOnEvent, createPostOnGroup } from "@/app/dashboard/actions";
import { InitialState } from "@/types";
import { CircleX, Users } from "lucide-react";
import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";

interface CardProps {
  id: string;
  name: string;
  type: 'group' | 'event';
}

const initialState: InitialState = {
  success: false,
  errors: {},
};

export default function Card(props: CardProps) {
  const [createPost, setCreatePost] = useState(false);
  const [groupState, groupFormAction] = useFormState(createPostOnGroup, initialState);
  const [eventState, eventFormAction] = useFormState(createPostOnEvent, initialState);
  const [base64, setBase64] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const createBase64 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        let base64: string = reader.result as string;
        setBase64(base64);
        setImgSrc(URL.createObjectURL(file));
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("photo", base64);

    if (props.type === 'event') {
      eventFormAction(form);
      return;
    }

    groupFormAction(form);
  };

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  return (
    <div className="cursor-pointer w-full h-14 bg-orange-300 hover:bg-orange-500 flex items-center px-2 rounded-lg shadow-sm hover:shadow-black">
      <div className="w-1/6">
        <Users color="black" size={26} />
      </div>
      <div className="w-5/6">
        <h1 className="text-sm">{props.name}</h1>
      </div>
      <div className="cursor-pointer rounded-lg hover:bg-orange-300" onClick={toggleModal}>
        {createPost ? <CircleX /> : <Plus />}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="absolute bg-white">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={toggleModal}
            >
              X
            </button>

            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              <div className="w-24 aspect-square">
                <img
                  src={imgSrc}
                  alt="Pré-visualização"
                  className="object-cover w-full h-full"
                />
              </div>
            </label>
            <input
              className="hidden"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={createBase64}
            />

            <form onSubmit={handleSubmit}>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Adicionar Titulo
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
              />

              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Adicionar Descrição
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="w-full px-3 py-2 border bg-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
              />

              <input type="hidden" name="id" value={props.id} />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Criar Post
              </button>
            </form>
          </div>
          <div />
        </div>
      )}
    </div>
  );
}
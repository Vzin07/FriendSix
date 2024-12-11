"use client";

import { createPostOnEvent, createPostOnGroup } from "@/app/(authenticated)/dashboard/actions";
import { InitialState } from "@/types";
import { CircleX, PlusSquare, Users } from "lucide-react";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface CardProps {
  id: string;
  name: string;
  type: "group" | "event";
  onNewPost: () => Promise<void>
}

const initialState: InitialState = {
  success: false,
  errors: {},
};

export default function Card(props: CardProps) {
  const [createPost, setCreatePost] = useState(false);
  const [groupState, groupFormAction] = useFormState(
    createPostOnGroup,
    initialState
  );
  const [eventState, eventFormAction] = useFormState(
    createPostOnEvent,
    initialState
  );
  const [base64, setBase64] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [icon, setIcon] = useState<JSX.Element | null>(
    <PlusSquare size="100%" />
  );

  const createBase64 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64: string = reader.result as string;

        setBase64(base64);
        setImgSrc(URL.createObjectURL(file));
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("photo", base64);

    if (props.type === "event") {
      eventFormAction(form);
      return;
    }

    groupFormAction(form);
  };

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const updateGroups = async () => {
      await props.onNewPost()
    };

    if (groupState.success == true || eventState.success == true) {
      updateGroups()
      toggleModal();
    }

  }, [groupState.success, eventState.success]);

  const showPlusIcon = () => {
    setIcon(<PlusSquare size="100%" />);
  };

  const removeShowPlusIconOnMouseOver = () => {
    if (imgSrc) {
      setIcon(
        <img
          src={imgSrc}
          alt="Pré-visualização"
          className="object-cover w-full h-full"
        />
      );
    } else {
      setIcon(<PlusSquare size="100%" />);
    }
  };

  return (
    <div className="w-full h-14 bg-orange-300 hover:bg-orange-500 flex items-center px-2 rounded-lg shadow-sm hover:shadow-black">
      <div className="flex w-full">
        <div className="flex gap-1 w-11/12">
          <div>
            <Users color="black" size={26} />
          </div>

          <div>
            <h1 className="text-sm">{props.name}</h1>
          </div>
        </div>

        <div
          className="cursor-pointer rounded-lg hover:bg-orange-300"
          onClick={toggleModal}
        >
          {createPost ? <CircleX /> : <Plus />}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="absolute bg-orange-300 w-3/6 h-3/6 min-h-96 p-3 rounded-lg shadow-md shadow-black">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={toggleModal}
            >
              X
            </button>
            <div>
              <div className="flex justify-center">
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  <div className="w-24 aspect-square cursor-pointer flex justify-center items-center">
                    <div
                      className=" aspect-square h-28"
                      onMouseOver={showPlusIcon}
                      onMouseOut={removeShowPlusIconOnMouseOver}
                    >
                      {icon}
                    </div>
                  </div>
                </label>
              </div>
              <input
                className="hidden cursor-pointer"
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={createBase64}
              />

              <form onSubmit={handleSubmit}>
                <div className="m-3">
                  <div className=" m-3">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-lg font-bold mb-1"
                    >
                      Adicionar Titulo
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="w-full px-3 py-2 border shadow-inherit bg-orange-400 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
                    />
                  </div>

                  <div className="m-3">
                    <label
                      htmlFor="description"
                      className="block text-gray-700 text-lg font-bold mb-1"
                    >
                      Adicionar Descrição
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="w-full px-3 py-2 border shadow-inherit bg-orange-400 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
                    />
                  </div>

                  <input type="hidden" name="id" value={props.id} />

                  <button
                    type="submit"
                    className="w-full shadow-inherit bg-orange-500 text-orange-200 h-10 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Criar Post
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div />
        </div>
      )}
    </div>
  );
}

"use client";

import { Camera, BookOpen, Calendar, MoreHorizontal, UserPlus, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// import { getUserById } from "../actions";
import { User } from "@prisma/client";

// Componente: Imagem de Capa
const ProfileCover = ({ coverUrl }: { coverUrl: string }) => (
  <div className="w-full mt-16 h-80 rounded-md bg-cyan-300 hover:bg-gray-400 hover:opacity-70 transition duration-300">
    <img
      src={coverUrl || "/capa.webp"} // Fallback para uma capa padrão
      alt="Imagem de capa do perfil"
      className="object-cover w-full h-full rounded-md"
    />
  </div>
);

// Componente: Foto de Perfil
const ProfilePicture = ({ imageUrl, name, onEdit }: { imageUrl: string; name: string; onEdit: () => void }) => {
  const { data: session } = useSession();
  const { profileId } = useParams()
  const isOwner = session?.user?.id === profileId

  useEffect(() => {
    if (profileId && session?.user?.id !== profileId) {
      console.log("Você não tem permissão para editar esse perfil.");
    }
  }, [profileId, session]);

  return (
    < div className="relative w-32 h-32 rounded-full border-2 border-black bg-lime-600" >
      <img
        src={imageUrl || "/profile.webp"}
        alt={`Foto de perfil de ${name || "usuário"}`}
        className="object-cover w-full h-full rounded-full cursor-pointer"
      />
      {isOwner && (
        <button
          aria-label="Editar foto de perfil"
          onClick={onEdit}
          className="absolute bottom-0 right-0 border bg-slate-400 border-slate-400 rounded-full h-8 w-8 flex justify-center items-center hover:bg-slate-600 transition duration-300"
        >
          <Camera size={16} color="rgb(203 213 225)" />
        </button>
      )}
    </div >
  )
};

// Componente: Navegação do Perfil
const ProfileNavigation = () => {
  const navItems = [
    { icon: UserPlus, label: "Amigos" },
    { icon: Users, label: "Grupos" },
    { icon: Calendar, label: "Eventos" },
    { icon: BookOpen, label: "Posts" },
    { icon: MoreHorizontal, label: "Mais" },
  ];

  return (
    <ul className="flex gap-8">
      {navItems.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-2 cursor-pointer hover:underline"
          aria-label={item.label}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

// Componente Principal
export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const { profileId } = useParams()
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>([])

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // useEffect(() => {
  //   const getuser = async () => {
  //     const userInf = await getUserById("")
  //     setUser(userInf)
  //   }

  //   getuser()
  // }, [])

  return (
    <div className="w-full h-screen bg-orange-400">
      <Header />

      <div className="w-full h-full p-4">
        <ProfileCover coverUrl="" />

        <div className="flex items-center gap-4 -mt-20 border-b-2 pb-4">
          <ProfilePicture
            imageUrl={""}
            name={session?.user?.name || ''}
            onEdit={handleEditProfile}
          />
          <h1 className="font-bold text-4xl hover:cursor-pointer">
            {user?.name || "Usuário"}
          </h1>
        </div>

        <div className="flex justify-end mt-4">
          <ProfileNavigation />
        </div>
      </div>
    </div>
  );
}

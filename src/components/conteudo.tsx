import { Users } from "lucide-react";

export default function ConteudoPrincipal() {
  return (
    <div className="bg-orange-300 w-full h-full rounded-md p-4 space-y-2">
      <div className="flex justify-between w-full">
        <div className="flex">
          <Users color="black" size={26} />
          <h2 className="ml-2 cursor-pointer hover:underline font-morsan">Grupo X</h2>
        </div>
        <h3 className="font-morsan text-xs">Publicado em 28/09/2024 às 20:20</h3>
      </div>
      <div className="font-morsan">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, id! Dolorem modi nihil, itaque optio sed inventore quia sit excepturi! Dicta, porro mollitia quis rem inventore quasi debitis soluta nesciunt.
      </div>
    </div>
  );
}

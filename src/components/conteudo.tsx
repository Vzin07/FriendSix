import { Users } from "lucide-react";

export default function ConteudoPrincipal() {
  return (
    <div className="bg-orange-300 w-11/12 h-36 rounded-md my-3">
      <div className="m-4 flex w-full">
        <Users color="black" size={26} />
        <h2 className="mx-2 cursor-pointer hover:underline font-morsan">Grupo X</h2>
        <div className="flex w-full justify-end mr-7">
          <h3 className="font-morsan text-xs">Publicado em 28/09/2024 às 20:20</h3>
        </div>
      </div>
      <div className="font-morsan aspect-square mx-2 ">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, id! Dolorem modi nihil, itaque optio sed inventore quia sit excepturi! Dicta, porro mollitia quis rem inventore quasi debitis soluta nesciunt.
      </div>
    </div>
  );
}

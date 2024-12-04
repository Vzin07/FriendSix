import { Heart, MessageSquareText, Users } from "lucide-react";
import { useState } from "react";
import Comment from "./comment";

interface PostProps {
  id: string;
  photo: string | null;
  title: string;
  description: string;
  userId: string;
  type: string
}

export default function Post(props: PostProps) {
  const [line, setLine] = useState(true);
  return (
    <div className="bg-orange-300 rounded-md w-full p-3 space-y-2">
      <div className="flex justify-between w-full">
        <div className="flex items-center justify-between">
          <Users color="black" className="size-10 cursor-pointer hover:underline" />

          <div className="flex-col font-morsan">
            <h2 className="ml-2 text-xl cursor-pointer hover:underline">{ }usuário000</h2>
            <h4 className="ml-2 text-base cursor-pointer hover:underline">{props.type} | {props.title}</h4>
          </div>
        </div>


      </div>

      <div className="flex-col justify-center items-center">
        <div className="aspect-square w-full bottom-3">
          <img className="object-cover w-full h-full rounded-lg" src={props.photo as string} alt="image" />
        </div>

        <div className="flex w-full p-1 justify-between mt-1">
          <div className="flex gap-2">
            <Heart />
            <Comment  id={props.id}/>
          </div>

          <div>
            <h3 className="font-morsan text-xs">Publicado em 28/09/2024 às 20:20</h3>
          </div>
        </div>
      </div>

      <div className="gap-1">
        <div>
          <h2 className="text-lg pl-1 underline">{props.title}</h2>
        </div>

        <div>
          <p data-open={line} className="font-morsan text-justify data-[open=true]:line-clamp-2">
            {props.description}
          </p>
          <p onClick={() => setLine((prevState) => !prevState)} className="cursor-pointer underline text-blue-600 hover:text-purple-950 w-20">
            {line ? "ver mais" : "ver menos"}
          </p>
        </div>
      </div>
    </div>
  );
}

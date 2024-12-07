import { Heart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Comment from "./comment";
import { getLikes } from "@/app/actions";
import { creatLikes } from "@/app/dashboard/actions";

interface PostProps {
  id: string;
  photo: string | null;
  title: string;
  description: string;
  userId: string;
  user: string;
  type: string;
  datetime: Date
}

export default function Post(props: PostProps) {
  const [line, setLine] = useState(true);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const likeOnPost = async () => {
      const { likeStatus, likeCount } = await getLikes(props.id, props.type);
      setLikeStatus(likeStatus);
      setLikeCount(likeCount);
    };

    likeOnPost()
  }, [props.id, props.type]);

  const handleLikeClick = async () => {
    const likeState = await creatLikes(props.id, props.type);
    setLikeStatus(likeState);
    setLikeCount(prev => likeState ? prev + 1 : prev - 1);
  };

  const dateTime = props.datetime.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

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
          <div className="flex gap-4">
            <div className="flex gap-1">
              <Heart onClick={handleLikeClick} data-open={likeStatus} className="data-[open=true]:text-pink-600 cursor-pointer" />
              <span className="cursor-default">{likeCount}</span>
            </div>

            <Comment id={props.id} type={props.type} />
          </div>

          <div>
            <h3 className="font-morsan text-base">{dateTime ? "Publicado em  "+dateTime:'Publicado em 00/00/0000 às 00:00'}</h3>
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

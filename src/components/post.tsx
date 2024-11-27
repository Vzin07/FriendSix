import { Users } from "lucide-react";

interface PostProps {
  id: string;
  photo: string | null;
  title: string;
  description: string;
  // userId: string;
}

export default function Post(props: PostProps) {
  return (
    <div className="bg-orange-300 rounded-md w-full p-6 space-y-2">
      <div className="flex justify-between w-full">
        <div className="flex">
          <Users color="black" size={26} />
          <h2 className="ml-2 cursor-pointer hover:underline font-morsan">{props.title}</h2>
        </div>

        <h3 className="font-morsan text-xs">Publicado em 28/09/2024 às 20:20</h3>
      </div>

      <div className="flex justify-center items-center">
        <div className="aspect-square w-5/6">
          <img className="object-cover w-full h-full" src={props.photo as string} alt="image" />
        </div>
      </div>

      <div className="font-morsan">
        {props.description}
      </div>
    </div>
  );
}

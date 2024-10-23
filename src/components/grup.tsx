import { Users } from "lucide-react";

export default function ComponetGrup() {
  return (
    <div className="cursor-pointer w-full h-14 bg-orange-300 hover:bg-orange-500 flex items-center px-2 rounded-lg shadow-sm hover:shadow-black">
     <div className="w-1/6">
      <Users color="black" size={26}/>
     </div>
     <div className="w-5/6">
      <h1 className="text-sm">Grupo</h1>
      <p className="text-xs truncate">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad omnis itaque fuga fugiat atque suscipit, quidem similique tenetur nihil nesciunt, odio nisi corrupti corporis laudantium ipsa! Inventore, quisquam. Possimus, voluptas.</p>
     </div>
    </div>
  );
}

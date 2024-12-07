"use client";

import Header from "@/components/header";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import { getPosts } from "../actions";
import MenuDashboard from "@/components/menu";

export default function Dashboard() {
  const [posts, setPosts] = useState<any>([])

  useEffect(() => {
    const posts = async () => {
      setPosts(await getPosts('AMBOS'));
    };

    posts()
  }, []);

  return (
    <div className="w-full h-screen bg-orange-400">

      <Header />

      <div className="w-full h-full flex pt-20 justify-between">

        <MenuDashboard />

        <div className="md:w-8/12 h-full overflow-auto flex flex-col items-center">
          <div className="p-2 w-full justify-start">
            <h1 className="font-morsan text-2xl text-black">FEED</h1>
          </div>

          {posts?.groupPosts?.length > 0 && (
            posts?.groupPosts.map((post, index) => (
              <div className="h-auto w-8/12" key={index}>
                <Post
                  id={post.id}
                  photo={post.photo}
                  title={post.title}
                  description={post.description}
                  userId={post.userId}
                  user={post.user}
                  type={post.type}
                  datetime={post.createdAt}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex-col w-2/12 border-2 border-solid border-black hidden md:block">
          <h1>Lateral</h1>
        </div>

      </div>
    </div >
  );
}
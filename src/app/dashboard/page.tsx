import Logo from "@/components/logo";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-orange-400">
      <div className="bg-black w-full h-20 flex justify-between items-center gap-9">
        <div className="flex justify-start items-center">
          <h1 className="text-white text-2xl mx-2 font-morsan justify-center flex-col">
            <strong>FriendSix</strong>
          </h1>

          <div className="w-16 h-16 aspect-square bg-orange-500 rounded-full flex flex-col justify-center items-center">
            <Logo title />
          </div>
        </div>
        <div className="flex items-center p-2 relative">
          <input
            type="text"
            className="pl-10 p-2 border border-gray-300 rounded-md w-full md:w-96 h-8"
            placeholder="Pesquisar"
            id="pesquisa"
            name=""
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 absolute left-3 top-3.5 text-gray-500 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <div className="flex items-center p-2 cursor-pointer">
          <h2 className="font-morsan text-gray-200 hover:text-blue-600">
            <strong>Username</strong>
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-200 cursor-pointer hover:text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      </div>

      <div className="w-full h-screen flex ">
        <div className="w-3/12 rounded-none border-2 border-solid border-black ">
          <div className="p-2">
            <h1 className="font-morsan text-2xl text-white">
              <strong>AÇÕES</strong>
            </h1>
            <div className="p-y-8 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </div>
          </div>

          <div className="w-full h-9 border-black border-solid border-t-2 border-b-2">
            <div className="border-black border-solid border-y-2 "></div>
          </div>

          <div></div>
        </div>
        <div className="w-9/12 border-2 border-solid border-black ">
          <div className="p-2">
            <h1 className="font-morsan text-2xl text-white">MAIN</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

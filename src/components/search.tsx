import { fetchEvents, fetchGroups, fetchUsers } from "@/app/actions";
import { ChevronLeft, Plus, Search, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";

export default function SearchOnTerm() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<any>({
        users: [],
        groups: [],
        events: []
    })

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        setSearchTerm(term)

        if (term.trim() === "") {
            setSearchResults({
                users: [],
                groups: [],
                events: []
            })
        } else {
            search(term);
        }
    }

    const search = async (term: string) => {
        const users = await fetchUsers(term)
        const groups = await fetchGroups(term)
        const events = await fetchEvents(term)

        setSearchResults({
            users,
            groups,
            events
        })
    }

    return (
        <div onClick={() => setSearchTerm("")} className="relative">
            <div className="md:absolute items-center p-2 relative flex mt-4 md:-ml-24">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 p-2 border border-gray-300 rounded-md w-full md:w-96 h-8"
                    placeholder="Pesquisar"
                    aria-label="Pesquisar conteúdo"
                />
                <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 cursor-pointer" />
            </div>

            {searchTerm && (
                <div className="md:absolute top-16 md:-left-24 right-0 mr-28 -ml-5 md:ml-2 mx-auto bg-black text-white p-4 max-h-96 overflow-y-auto z-50 rounded-md w-56 md:min-w-96 lg:max-w-4xl">

                    <div onClick={() => setSearchTerm("")} className="block md:hidden"><ChevronLeft className="size-8 cursor-pointer hover:text-gray-500 -ml-5 mb-5" /></div>

                    <h3 className="font-bold">Usuários:</h3>
                    {searchResults.users ? (
                        searchResults.users.map((user: any) => (
                            <div key={user.id} className="text-black font-morsan text-lg bg-orange-400 border-2 border-solid border-orange-600 rounded-md p-2 flex justify-between">
                                <div className="flex gap-3">
                                    <div className="aspect-square size-5 rounded-md">
                                        {/* <img src="" alt="" className="object-contain w-full h-full rounded-md" /> */}
                                        <Users color="black" className="" />
                                    </div>

                                    <div className="underline">
                                        {user.name}
                                    </div>
                                </div>

                                <div className="flex text-gray-200 gap-1">
                                    <UserPlus />
                                    <span>Adicionar</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum usuário encontrado.</p>
                    )}

                    <h3 className="font-bold mt-4">Grupos:</h3>
                    {searchResults.groups ? (
                        searchResults.groups.map((group: any) => (
                            <div key={group.id} className=" text-black font-morsan text-lg bg-orange-400 border-2 border-solid border-orange-600 rounded-md p-2 flex justify-between">
                                <div className="flex gap-3">
                                    <div className="aspect-square size-5 rounded-md">
                                        {/* <img src="" alt="" className="object-contain w-full h-full rounded-md" /> */}
                                        <Users color="black" className="" />
                                    </div>

                                    <div className="underline">
                                        {group.name}
                                    </div>
                                </div>

                                <div className="flex cursor-pointer gap-1">
                                    <Plus />
                                    <span>Entrar</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum grupo encontrado.</p>
                    )}

                    <h3 className="font-bold mt-4">Eventos:</h3>
                    {searchResults.events ? (
                        searchResults.events.map((event: any) => (
                            <div key={event.id} className="text-black font-morsan text-lg bg-orange-400 border-2 border-solid border-orange-600 rounded-md p-2 flex justify-between">
                                <div className="flex gap-3">
                                    <div className="aspect-square size-5 rounded-md">
                                        {/* <img src="" alt="" className="object-contain w-full h-full rounded-md" /> */}
                                        <Users color="black" className="" />
                                    </div>

                                    <div className="underline">
                                        {event.name}
                                    </div>
                                </div>

                                <div className="flex cursor-pointer gap-1">
                                    <Plus />
                                    <span>Entrar</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum evento encontrado.</p>
                    )}
                </div>
            )}
        </div>
    )
}

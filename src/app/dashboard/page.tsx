import Logo from '@/components/logo';

export default function Dashboard() {
    return (
        <div className="w-full min-h-screen bg-orange-400">
            <div className='bg-black w-full h-20 flex justify-start items-center gap-96'>

                <div className='flex justify-start items-center'>

                    <h1 className="text-white text-2xl mx-2 font-morsan justify-center flex-col"><strong>FriendSix</strong></h1>

                    <div className='w-16 h-16 aspect-square bg-orange-500 rounded-full flex flex-col justify-center items-center'>
                        <Logo title/>
                    </div>

                </div>
                <div className='flex items-center p-2 relative'>
                
                <input type="text" className="pl-10 p-2 border border-gray-300 rounded-md w-96 h-8" placeholder="Pesquisar" id='pesquisa' name="" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute left-2 top-3 pl-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

                 

                </div>

            </div>
            <div className="w-full h-screen flex ">
                <div className="w-3/12 bg-blue-600">
                    <h1 className='font-morsan text-2xl'><strong>AÇÕES</strong></h1>
                </div>
                <div className="w-9/12 bg-green-600 font-morsan">
                    <h1 className='font-morsan text-2xl'>MAIN</h1>
                </div>

            </div>
        </div>
    );
}   
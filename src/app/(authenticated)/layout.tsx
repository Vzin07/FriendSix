import { nextAuthOptions } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode

}>) {
    const session = await getServerSession(nextAuthOptions)

    if (!session) {
        redirect('/')
    }

    return <>{children}</>
}
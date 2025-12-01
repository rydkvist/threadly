import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Sidebar } from "../_components/messages/Sidebar"
import { parseAuthToken } from "~/server/auth/parseAuthToken"

export default async function MessagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const token = cookieStore.get("authToken")?.value
    const userId = parseAuthToken(token);

    if (!userId) {
        redirect("/")
    }

    const threads = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ]

    return (
        <div className="flex h-screen">
            <aside className="w-64 border-r bg-white">
                <Sidebar threads={threads} />
            </aside>

            <main className="flex-1 bg-gray-50">
                {children}
            </main>
        </div>
    )
}

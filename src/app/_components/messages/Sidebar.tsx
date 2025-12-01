"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/app/_components/ui/button"
import { cn } from "~/lib/utils"

export function Sidebar({
    threads,
}: {
    threads: { id: number; name: string }[]
}) {
    const pathname = usePathname()

    const handleNewThread = () => {
        console.log("new thread dialog")
    }

    return (
        <section className="flex flex-col h-full">
            <div className="px-4 py-4 border-b">
                <h1 className="text-xl font-semibold tracking-tight">
                    <Link href="/messages">Threadly</Link>
                </h1>
            </div>

            <div className="px-4 py-4 border-b">
                <Button className="w-full cursor-pointer" variant="secondary" onClick={handleNewThread}>
                    New thread
                </Button>
            </div>

            <ul className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {threads.map((thread) => {
                    const active = pathname.endsWith(`/messages/${thread.id}`)

                    return (
                        <li key={thread.id}>
                            <Link
                                href={`/messages/${thread.id}`}
                                className={cn(
                                    "w-full block text-left cursor-pointer px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition",
                                    active && "bg-gray-100 font-medium"
                                )}
                            >
                                {thread.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

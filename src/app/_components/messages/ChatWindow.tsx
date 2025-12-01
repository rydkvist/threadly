"use client"

import { useEffect, useRef } from "react"

// api.message.list.useQuery()
// api.message.onNewMessage.useSubscription()


export function ChatWindow({ threadId }: { threadId: number }) {
    const messages = [
        { id: 1, text: "Hello!", senderId: 1 },
        { id: 2, text: "Hi there", senderId: 2 },
    ]

    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="p-4 space-y-2">
            {messages.map((m) => (
                <div
                    key={m.id}
                    className="rounded-lg bg-white p-2 shadow-sm max-w-xs"
                >
                    {m.text}
                </div>
            ))}

            <div ref={bottomRef} />
        </div>
    )
}

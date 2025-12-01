"use client"

import { useState } from "react"
import { Input } from "~/app/_components/ui/input"
import { Button } from "~/app/_components/ui/button"

export function MessageInput({ threadId }: { threadId: number }) {
    const [text, setText] = useState("")

    const handleSend = () => {
        console.log("send:", { threadId, text })
        setText("")
    }

    return (
        <div className="flex gap-2">
            <Input
                placeholder="Type a message…"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={handleSend}>Send</Button>
        </div>
    )
}

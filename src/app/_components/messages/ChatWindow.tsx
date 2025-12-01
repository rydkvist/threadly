"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "~/app/_components/ui/spinner";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAvatar } from "~/lib/getUserAvatar";
import { useUser } from "~/app/providers/UserProvider";

const POLLING_INTERVAL_MS = 1500;

export function ChatWindow({ threadId }: { threadId: number }) {
    const { id } = useUser();
    const bottomRef = useRef<HTMLDivElement>(null);

    const messageListQuery = api.message.list.useQuery(
        { threadId },
        {
            refetchInterval: POLLING_INTERVAL_MS,
        },
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageListQuery.data]);

    if (messageListQuery.isLoading) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <Spinner className="size-16" />
            </div>
        );
    }

    if (messageListQuery.data?.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
                <p>No messages yet. Start the conversation!</p>
            </div>
        );
    }

    return (
        <ul className="flex h-full flex-col justify-end space-y-2 overflow-y-auto p-4">
            {messageListQuery.data?.map((m) => {
                const isMe = m.senderId === id;
                return (
                    <li key={m.id} className={`max-w-xs ${isMe ? "self-end" : "self-start"}`}>
                        <div className={`inline-flex items-center gap-1 ${isMe ? "flex-row-reverse" : ""}`}>
                            <Avatar className="border-background border-2">
                                <AvatarImage
                                    src={getUserAvatar(m.sender.username)}
                                    alt={m.sender.username}
                                />
                                <AvatarFallback>{m.senderId}</AvatarFallback>
                            </Avatar>
                            <span className="bg-white p-2 shadow-sm rounded-lg">{m.text}</span>
                        </div>
                    </li>
                )
            })}

            <div ref={bottomRef} />
        </ul>
    );
}

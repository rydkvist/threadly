"use client";

import { useState } from "react";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

export function MessageInput({ threadId }: { threadId: number }) {
  const [text, setText] = useState("");

  const sendMessage = api.message.send.useMutation();

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;

    void sendMessage.mutateAsync({
      threadId,
      text: trimmed,
    });

    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Type a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button onClick={handleSend} disabled={sendMessage.isPending}>
        {sendMessage.isPending ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}

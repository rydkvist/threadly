import { ChatWindow } from "~/app/_components/messages/ChatWindow";
import { MessageInput } from "~/app/_components/messages/MessageInput";

export default function ThreadPage(props: { params: { threadId: string } }) {
  const threadId = Number(props.params.threadId);

  return (
    <section className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <ChatWindow threadId={threadId} />
      </div>

      <div className="border-t p-4">
        <MessageInput threadId={threadId} />
      </div>
    </section>
  );
}

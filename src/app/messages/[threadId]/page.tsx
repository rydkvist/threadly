import { ChatWindow } from "~/app/_components/messages/ChatWindow";
import { MessageInput } from "~/app/_components/messages/MessageInput";

export default async function ThreadPage(
  props: PageProps<"/messages/[threadId]">,
) {
  const { threadId } = await props.params;
  const threadIdNum = Number(threadId);

  return (
    <section className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <ChatWindow threadId={threadIdNum} />
      </div>

      <div className="border-t p-4">
        <MessageInput threadId={threadIdNum} />
      </div>
    </section>
  );
}

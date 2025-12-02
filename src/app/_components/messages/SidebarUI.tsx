import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { useUser } from "~/app/providers/UserProvider";
import { getUserAvatar } from "~/lib/getUserAvatar";
import { cn } from "~/lib/utils";
import type { RouterOutputs } from "~/trpc/react";

type SidebarUIProps = {
  threads: RouterOutputs["thread"]["list"];
  pathname: string;
};

export function SidebarUI({ threads, pathname }: SidebarUIProps) {
  const me = useUser();

  return (
    <section className="flex h-full flex-col">
      <div className="border-b px-4 py-4">
        <h1 className="text-xl font-semibold tracking-tight">
          <Link href="/messages">Threadly</Link>
        </h1>
      </div>

      <div className="px-2 pt-4">
        <p className="text-sm text-gray-500">Your profile and conversations</p>
      </div>

      <ol className="flex-1 space-y-1.5 overflow-y-auto p-2">
        {threads.map((thread) => {
          const active = pathname.endsWith(`/messages/${thread.id}`);

          return (
            <li key={thread.id}>
              <Link
                href={`/messages/${thread.id}`}
                className={cn(
                  "block w-full cursor-pointer rounded-md border px-3 py-2 text-left text-sm transition hover:bg-gray-100",
                  active && "bg-gray-100 font-medium",
                )}
              >
                <div className="flex -space-x-3">
                  {thread.participants.map((p, index) => (
                    <Avatar key={index} className="border-background border-2">
                      <AvatarImage
                        src={getUserAvatar(p.user.username)}
                        alt={p.user.username}
                      />
                      <AvatarFallback>{p.user.username}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>
                  You and{" "}
                  {thread.participants
                    .filter((p) => p.userId !== me.id)
                    .map((p) => p.user.username)
                    .join("")}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

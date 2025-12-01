"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { Input } from "~/app/_components/ui/input";
import { getUserAvatar } from "~/lib/getUserAvatar";
import { useUser } from "../providers/UserProvider";
import { Spinner } from "../_components/ui/spinner";

export default function MessagesIndexPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const me = useUser();

  const usersQuery = api.user.list.useQuery();
  const createThread = api.thread.create.useMutation();
  const utils = api.useUtils();

  async function startThread(username: string) {
    const thread = await createThread.mutateAsync({
      otherUsername: username,
    });
    await utils.thread.list.invalidate();
    router.push(`/messages/${thread.id}`);
  }

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-gray-600">
        <Spinner className="size-16" />
      </div>
    );
  }

  const users = usersQuery.data;

  if (!users) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        <p>No users available</p>
      </div>
    );
  }

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-12 p-6 md:p-16 lg:p-24">
      <section className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarImage src={getUserAvatar(me.username)} alt={me.username} />
          <AvatarFallback>{me.username}</AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          <p className="text-xl font-semibold">Welcome, {me.username}!</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Direct message someone</h2>

        <Input
          placeholder="Search username…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        {search.length > 0 && (
          <ul className="mt-2 max-w-sm space-y-2 rounded-md border bg-white p-4 shadow-sm">
            {filteredUsers.length === 0 && (
              <p className="text-sm text-gray-500">No users found</p>
            )}

            {filteredUsers.map((user) => (
              <li key={user.id}>
                <button
                  onClick={() => startThread(user.username)}
                  className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-gray-100"
                >
                  <Avatar className="size-10">
                    <AvatarImage
                      src={getUserAvatar(user.username)}
                      alt={user.username}
                    />
                    <AvatarFallback>{user.username}</AvatarFallback>
                  </Avatar>

                  <span className="text-sm font-medium">{user.username}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Explore the community</h2>

        <ul className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => startThread(user.username)}
                className="flex cursor-pointer flex-col items-center gap-2 transition hover:opacity-80"
              >
                <Avatar className="size-16">
                  <AvatarImage
                    src={getUserAvatar(user.username)}
                    alt={user.username}
                  />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>

                <p className="truncate text-sm text-gray-700">
                  {user.username}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

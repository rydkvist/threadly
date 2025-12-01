import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarClient } from "../_components/messages/SidebarClient";
import { parseAuthToken } from "~/server/auth/parseAuthToken";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import type { Metadata } from "next";
import { api, HydrateClient } from "~/trpc/server";
import { UserProvider } from "../providers/UserProvider";

export const metadata: Metadata = {
    title: "Messages",
};

export default async function MessagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    const userId = parseAuthToken(token);

    if (!userId) redirect("/");

    const user = await api.user.me()
    await api.thread.list.prefetch();

    return (
        <UserProvider user={user!}>
            <div className="flex h-screen">
                <aside className="w-64 border-r bg-white">
                    <HydrateClient>
                        <SidebarClient />
                    </HydrateClient>
                </aside>

                <main className="flex-1 bg-gray-50">{children}</main>
            </div>
        </UserProvider>
    );
}

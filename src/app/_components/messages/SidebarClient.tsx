"use client";

import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import { SidebarUI } from "./SidebarUI";

export function SidebarClient() {
  const { data: threads } = api.thread.list.useQuery();
  const pathname = usePathname();

  return <SidebarUI threads={threads ?? []} pathname={pathname} />;
}

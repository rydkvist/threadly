"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  (await cookies()).set("authToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

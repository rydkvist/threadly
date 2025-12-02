"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { setAuthCookie } from "~/app/actions/auth/setAuthCookie";

export function useLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = api.auth.login.useMutation();
  const createUserMutation = api.user.create.useMutation();

  async function login(username: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const result = await loginMutation.mutateAsync({ username, password });
      await setAuthCookie(result.token);
      router.push("/messages");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function createUser(username: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const result = await createUserMutation.mutateAsync({
        username: username,
        password: password,
      });

      await setAuthCookie(result.token);
      router.push("/messages");
    } catch {
      setError("Could not create user");
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    createUser,
    loading,
    error,
  };
}

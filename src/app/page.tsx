"use client";

import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/app/_components/ui/card";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { useLogin } from "./hooks/useLogin";
import { CreateAccountDialog } from "./_components/messages/CreateAccountDialogue";

export default function LoginPage(_: PageProps<"/">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { login, createUser, loading, error } = useLogin();

  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login(username, password);
  }

  async function handleCreateUserDialog(username: string, password: string) {
    await createUser(username, password);
  }

  async function handleSeed() {
    setSeedLoading(true);
    setSeedMessage("");

    try {
      await fetch("/api/dev/seed", { method: "POST" });
      setSeedMessage("Done");
    } catch {
      setSeedMessage("Failed to seed or you already have demo users 😁");
    } finally {
      setSeedLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-3xl font-semibold tracking-tight">Threadly</h1>
        <p className="text-muted-foreground text-sm">Simple messaging</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in or create an account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading…" : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">or</div>

          <div className="flex flex-col gap-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setDialogOpen(true)}
              disabled={loading}
            >
              Create account
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleSeed}
              disabled={seedLoading}
            >
              {seedLoading ? "Seeding…" : "Seed 8 demo users"}
            </Button>
          </div>

          {seedMessage && (
            <p className="mt-1 text-center text-xs text-gray-600">
              {seedMessage}
            </p>
          )}
        </CardContent>
      </Card>

      <CreateAccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateUserDialog}
        loading={loading}
      />
    </div>
  );
}

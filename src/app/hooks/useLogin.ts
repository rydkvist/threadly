'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react"
import { setAuthCookie } from "~/app/actions/auth/setAuthCookie"

export function useLogin() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loginMutation = api.auth.login.useMutation()
    const createMockUserMutation = api.auth.createMockUser.useMutation()

    async function login(username: string, password: string) {
        setLoading(true)
        setError(null)

        try {
            const result = await loginMutation.mutateAsync({ username, password })
            await setAuthCookie(result.token)
            router.push("/messages")
        } catch (err: any) {
            setError(err?.message ?? "Login failed")
        } finally {
            setLoading(false)
        }
    }

    async function createMockUser() {
        setLoading(true)
        setError(null)

        try {
            const mockUsername = `user${Math.floor(Math.random() * 9000)}`
            const result = await createMockUserMutation.mutateAsync({
                username: mockUsername,
                password: "pass123",
            })

            await setAuthCookie(result.token)
            router.push("/messages")
        } catch (err: any) {
            setError("Could not create mock user")
        } finally {
            setLoading(false)
        }
    }

    return {
        login,
        createMockUser,
        loading,
        error,
    }
}

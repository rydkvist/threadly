"use client"

import { createContext, useContext } from "react"

type UserContextValue = {
    id: number
    username: string
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({
    children,
    user,
}: {
    children: React.ReactNode
    user: UserContextValue
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("useUser must be used inside <UserProvider>")
    return ctx
}

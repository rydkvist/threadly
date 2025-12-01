export function parseAuthToken(token: string | undefined): number | null {
    if (!token) return null

    if (!token.startsWith("user-")) return null

    const id = Number(token.replace("user-", ""))

    return Number.isFinite(id) ? id : null
}

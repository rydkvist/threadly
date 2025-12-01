'use client'

import { useState } from 'react'
import { Button } from '~/app/_components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/app/_components/ui/card'
import { Input } from '~/app/_components/ui/input'
import { Label } from '~/app/_components/ui/label'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('login', { username, password })
    }

    const handleCreateMockUser = () => {
        console.log('create mock user')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">

            <div className="flex flex-col items-center mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">Threadly</h1>
                <p className="text-muted-foreground text-sm">Simple messaging</p>
            </div>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center">Welcome</CardTitle>
                    <CardDescription className="text-center">
                        Sign in or generate a mock account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
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

                        <Button type="submit" className="w-full">
                            Continue
                        </Button>
                    </form>

                    <div className="text-center text-sm text-gray-500">or</div>

                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleCreateMockUser}
                    >
                        Create mock user
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

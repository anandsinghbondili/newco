'use client';

import "../globals.css";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    status: string;
};

export default function LoginPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /* ─ Load users.json once ─ */
    useEffect(() => {
        fetch('/data/users.json')
            .then((r) => r.json())
            .then((d) => d.success && setUsers(d.users));
    }, []);

    /* ─ Login handler ─ */
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = users.find(
            (u) => u.username === username && u.status === 'active',
        );
        if (ok) {
            localStorage.setItem('user', JSON.stringify(ok));
            router.push('/dashboard');
        } else {
            setError('Invalid credentials or inactive account');
        }
    };

    /* ─ Top‑down layout ─ */
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
            {/* Logo */}
            <Image
                src="/newco_logo.png"
                alt="NewCo logo"
                width={220}
                height={220}
                priority
                className="drop-shadow-xl"
            />

            {/* Form card */}
            <div className="w-full max-w-md mt-8">
                <form
                    onSubmit={handleLogin}
                    className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Welcome back
                    </h1>

                    {/* Username */}
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    {/* Primary action */}
                    <Button type="submit" className="w-full">
                        Log in
                    </Button>

                    {/* Secondary links */}
                    <div className="flex items-center justify-between text-sm">
                        <Link href="/forgot-password" className="underline-offset-4 hover:underline">
                            Forgot password?
                        </Link>
                        <Link href="/signup" className="underline-offset-4 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

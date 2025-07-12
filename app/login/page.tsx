'use client';

import "../globals.css";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { showErrorToast, showSuccessToast } from "@/components/ext/window/Toaster"; // fixed casing

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
    const [loading, setLoading] = useState(false); // 👈 loading state

    useEffect(() => {
        fetch('/data/users.json')
            .then((r) => r.json())
            .then((d) => d.success && setUsers(d.users));
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = users.find((u) => u.username === username && u.status === 'active');
        if (ok) {
            setLoading(true); // 👈 show loader
            localStorage.setItem('user', JSON.stringify(ok));
            showSuccessToast('Login successful');
            setTimeout(() => router.push('/dashboard'), 1200);
        } else {
            setError('Invalid credentials or inactive account');
            showErrorToast('Invalid credentials or inactive account');
        }
    };

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

            <div className="w-full max-w-md mt-8">
                {loading ? (
                    // ✅ Load mask here
                    <div className="flex items-center justify-center rounded-xl border border-gray-300 bg-white p-12 shadow-md">
                        <div className="flex items-center gap-4 text-gray-500">
                            <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span className="text-lg font-medium">Logging in... Please wait.</span>
                        </div>
                    </div>
                ) : (
                    // 🔐 Login Form
                    <form
                        onSubmit={handleLogin}
                        className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
                    >
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                            Welcome back
                        </h1>

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

                        <Button type="submit" className="w-full">
                            Log in
                        </Button>

                        <div className="flex items-center justify-between text-sm">
                            <Link href="/forgot-password" className="underline-offset-4 hover:underline">
                                Forgot password?
                            </Link>
                            <Link href="/signup" className="underline-offset-4 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

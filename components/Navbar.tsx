"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-white font-bold text-xl"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                                <span className="text-sm">⚡</span>
                            </div>
                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </Link>

                        {status === "authenticated" && session?.user?.isApproved && (
                            <div className="hidden md:flex ml-10 space-x-1">
                                <Link
                                    href="/dashboard"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive("/dashboard")
                                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                            : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                {session.user.role === "ADMIN" && (
                                    <Link
                                        href="/admin"
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive("/admin")
                                                ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30"
                                                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                                            }`}
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {status === "loading" ? (
                            <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse"></div>
                        ) : status === "authenticated" ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-medium">
                                        {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-white font-medium">{session.user.name || session.user.email}</p>
                                        <p className="text-slate-400 text-xs capitalize">{session.user.role.toLowerCase()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 border border-slate-600/50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 shadow-lg shadow-violet-500/25"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

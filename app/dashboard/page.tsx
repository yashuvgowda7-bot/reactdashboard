"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();

    const stats = [
        { label: "Total Projects", value: "12", icon: "📁", color: "from-violet-500 to-fuchsia-500" },
        { label: "Active Tasks", value: "8", icon: "✓", color: "from-emerald-500 to-teal-500" },
        { label: "Team Members", value: "5", icon: "👥", color: "from-amber-500 to-orange-500" },
        { label: "Completed", value: "24", icon: "🎉", color: "from-pink-500 to-rose-500" },
    ];

    const recentActivity = [
        { action: "New project created", time: "2 hours ago", icon: "📁" },
        { action: "Task completed", time: "4 hours ago", icon: "✓" },
        { action: "Comment added", time: "6 hours ago", icon: "💬" },
        { action: "File uploaded", time: "1 day ago", icon: "📎" },
    ];

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {session?.user?.name || session?.user?.email?.split("@")[0]}! 👋
                    </h1>
                    <p className="text-slate-400">Here&apos;s what&apos;s happening with your projects today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <span className="text-xl">{stat.icon}</span>
                                </div>
                                <span className="text-2xl font-bold">{stat.value}</span>
                            </div>
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* User Info Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span>👤</span> Your Profile
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl font-bold">
                                    {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{session?.user?.name || "User"}</p>
                                    <p className="text-slate-400 text-sm">{session?.user?.email}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-700/50">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Role</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${session?.user?.role === "ADMIN"
                                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                            : "bg-slate-600/50 text-slate-300 border border-slate-500/30"
                                        }`}>
                                        {session?.user?.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span>📊</span> Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {recentActivity.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/30 hover:border-slate-600/50 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                        <span>{item.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.action}</p>
                                        <p className="text-slate-500 text-sm">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-2xl border border-violet-500/20 p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-lg hover:bg-violet-500/30 transition-colors border border-violet-500/30">
                            + New Project
                        </button>
                        <button className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors border border-slate-600/50">
                            📋 Create Task
                        </button>
                        <button className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors border border-slate-600/50">
                            👥 Invite Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

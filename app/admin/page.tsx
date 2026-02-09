"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
    isApproved: boolean;
    createdAt: string;
}

export default function AdminPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleApproval = async (userId: string, isApproved: boolean) => {
        setActionLoading(userId);
        try {
            await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, isApproved }),
            });
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        setActionLoading(userId);
        try {
            await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const pendingUsers = users.filter(u => !u.isApproved);
    const approvedUsers = users.filter(u => u.isApproved);

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
                    <p className="text-slate-400">Manage users and approve registrations</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <span className="text-xl">👥</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{users.length}</p>
                                <p className="text-slate-400 text-sm">Total Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/30 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                <span className="text-xl">⏳</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{pendingUsers.length}</p>
                                <p className="text-slate-400 text-sm">Pending Approval</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                <span className="text-xl">✓</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{approvedUsers.length}</p>
                                <p className="text-slate-400 text-sm">Approved Users</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Users */}
                {pendingUsers.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                            Pending Approvals
                        </h2>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/30 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700/50">
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">User</th>
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Email</th>
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Registered</th>
                                            <th className="text-right py-4 px-6 text-slate-400 font-medium text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingUsers.map((user) => (
                                            <tr key={user.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold">
                                                            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                                                        </div>
                                                        <span className="font-medium">{user.name || "No name"}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-slate-400">{user.email}</td>
                                                <td className="py-4 px-6 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleApproval(user.id, true)}
                                                            disabled={actionLoading === user.id}
                                                            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 text-sm font-medium disabled:opacity-50"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            disabled={actionLoading === user.id}
                                                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 text-sm font-medium disabled:opacity-50"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* All Users */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">All Users</h2>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-slate-400">Loading users...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700/50">
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">User</th>
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Email</th>
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Role</th>
                                            <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Status</th>
                                            <th className="text-right py-4 px-6 text-slate-400 font-medium text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.role === "ADMIN" ? "from-violet-500 to-fuchsia-500" : "from-slate-500 to-slate-600"
                                                            } flex items-center justify-center text-sm font-bold`}>
                                                            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                                                        </div>
                                                        <span className="font-medium">{user.name || "No name"}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-slate-400">{user.email}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN"
                                                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                                            : "bg-slate-600/50 text-slate-300 border border-slate-500/30"
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isApproved
                                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                                        }`}>
                                                        {user.isApproved ? "Approved" : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex justify-end gap-2">
                                                        {user.id !== session?.user?.id && (
                                                            <>
                                                                {user.isApproved ? (
                                                                    <button
                                                                        onClick={() => handleApproval(user.id, false)}
                                                                        disabled={actionLoading === user.id}
                                                                        className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm disabled:opacity-50"
                                                                    >
                                                                        Revoke
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleApproval(user.id, true)}
                                                                        disabled={actionLoading === user.id}
                                                                        className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm disabled:opacity-50"
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleDelete(user.id)}
                                                                    disabled={actionLoading === user.id}
                                                                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm disabled:opacity-50"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        )}
                                                        {user.id === session?.user?.id && (
                                                            <span className="text-slate-500 text-sm italic">You</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useSession, signOut } from "next-auth/react";

export default function PendingPage() {
    const { data: session } = useSession();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center max-w-lg mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-8 shadow-xl">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                        <span className="text-4xl">⏳</span>
                    </div>

                    {/* Content */}
                    <h1 className="text-2xl font-bold mb-4">Approval Pending</h1>
                    <p className="text-slate-400 mb-6">
                        Hi <span className="text-white font-medium">{session?.user?.name || session?.user?.email}</span>,
                        your account is currently awaiting approval from an administrator.
                    </p>

                    {/* Info box */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                        <p className="text-amber-300 text-sm">
                            You will be able to access the dashboard once an admin approves your account.
                            This usually takes 24-48 hours.
                        </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-center gap-3 p-4 bg-slate-900/50 rounded-xl mb-6">
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-slate-300">Waiting for approval</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                        >
                            Check Status
                        </button>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full py-3 px-4 bg-slate-700/50 text-slate-300 font-semibold rounded-xl hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/50"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

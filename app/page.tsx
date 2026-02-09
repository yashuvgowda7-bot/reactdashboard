import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Hero badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm text-slate-300">Secure Admin Approval System</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
            Welcome to
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
            Dashboard
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          A secure platform with role-based access control. Sign up to request access,
          and admins will review your request before granting access to the dashboard.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="group px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
          >
            Get Started
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-lg font-semibold text-slate-300 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:scale-105"
          >
            Sign In
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Auth</h3>
            <p className="text-slate-400 text-sm">Email & password authentication with encrypted credentials</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
            <p className="text-slate-400 text-sm">Admin and user roles with different permission levels</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Admin Approval</h3>
            <p className="text-slate-400 text-sm">New users must be approved by admins before access</p>
          </div>
        </div>
      </div>
    </div>
  );
}

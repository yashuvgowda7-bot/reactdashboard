import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./db";

declare module "next-auth" {
    interface User {
        id: string;
        role: string;
        isApproved: boolean;
    }
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            role: string;
            isApproved: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        isApproved: boolean;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    const isPasswordValid = await compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        isApproved: user.isApproved,
                    };
                } catch (error) {
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.isApproved = user.isApproved;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.isApproved = token.isApproved;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "development-secret-should-fail-in-production",
};

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET && process.env.NEXT_PHASE !== "phase-production-build") {
    console.warn("WARNING: NEXTAUTH_SECRET is not set in production. This will likely cause the 'Server Configuration' error.");
}

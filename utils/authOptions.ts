import { AuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials) return null;
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });
                if(!user) return null;
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if(!isValid) return null;

                return {
                    id: String(user.id),
                    name: user.fullName,
                    email: user.username,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: User | undefined }) {
            if(user) token.user = user;
            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            if(token.user) session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
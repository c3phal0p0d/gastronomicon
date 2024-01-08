import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import clientPromise from "./clientPromise";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "email@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("authorize")
                await dbConnect();

                if (credentials == null) return null;
                try {
                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password,
                        );
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or password is incorrect");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        newUser: "/",
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.user = {
                    _id: user._id,
                    email: user.email,
                };
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.user = token.user;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
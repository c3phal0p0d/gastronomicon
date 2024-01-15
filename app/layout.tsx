import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from "./Provider";
import './globals.css'

import Footer from "./footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Gastronomicon',
    description: 'Recipe app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>
                    {children}
                    <Footer />
                </NextAuthProvider>
            </body>
        </html>
    )
}

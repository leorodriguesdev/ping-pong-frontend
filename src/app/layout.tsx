// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { GlobalContextProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "Meu App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>
          <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3">
            <nav className="max-w-6xl mx-auto flex items-center justify-between">
              <Link href="/" className="font-bold text-xl">
                Monitor de Sites
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                <Link href="/sites" className="hover:underline">
                  Sites
                </Link>
                <Link href="/sites/new" className="hover:underline">
                  Cadastrar
                </Link>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </div>
            </nav>
          </header>

          <main>{children}</main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

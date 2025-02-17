// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Meu App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              Monitor de Sites
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/sites"
                className="hover:underline"
              >
                Sites
              </Link>
              <Link
                href="/sites/new"
                className="hover:underline"
              >
                Cadastrar
              </Link>
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto p-4 sm:p-8">{children}</main>
      </body>
    </html>
  );
}

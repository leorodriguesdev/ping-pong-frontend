// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { GlobalContextProvider } from "@/context/GlobalContext";
import AuthGuard from "./AuthGuard";
import Header from "./Header";

export const metadata = {
  title: "Meu App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <GlobalContextProvider>
          <AuthGuard>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {children}
            </main>
          </AuthGuard>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

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
      <body>
        <GlobalContextProvider>
          <AuthGuard>
            <Header />
            <main className="min-h-screen">{children}</main>
          </AuthGuard>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

// src/app/dashboard/layout.tsx
import React from "react";
import "../globals.css"; // caso precise ter certeza que o Tailwind está disponível

export const metadata = {
  title: "Dashboard - Monitor de Sites",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 px-4 py-6">
        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Home
          </a>
          <a
            href="/sites"
            className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Sites
          </a>
          <a
            href="/sites/new"
            className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cadastrar Site
          </a>
          {/* etc. */}
        </nav>
      </aside>

      {/* Área principal do dashboard */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

// src/app/dashboard/layout.tsx
import React from "react";
import "../globals.css";

export const metadata = {
  title: "Dashboard - Monitor de Sites",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

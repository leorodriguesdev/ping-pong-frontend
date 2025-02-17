// src/app/sites/page.tsx
"use client";

import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";

function StatusBadge({ status }: { status: string }) {
  return status === "online" ? (
    <span className="inline-block px-2 py-1 text-sm rounded bg-green-100 text-green-800 font-semibold">
      ONLINE
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-1 text-sm rounded bg-red-100 text-red-800 font-semibold">
      OFFLINE
    </span>
  );
}

export default function SitesPage() {
  const { sites, getSites } = useGlobalContext();

  useEffect(() => {
    getSites();
  }, [getSites]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Sites Cadastrados
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sites.map((site) => (
            <div
              key={site.site_id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {site.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 break-all mb-4">
                {site.url}
              </p>
              <div className="mb-4">
                <StatusBadge status={site.status} />
              </div>
              <div className="mt-auto">
                <Link
                  href={`/sites/${site.site_id}`}
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Ver logs →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "@/context/GlobalContext";

export default function DashboardHomePage() {
  const { sites, getSites } = useGlobalContext();
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    getSites();
    let interval: number | null = null;
    if (autoRefresh) {
      interval = window.setInterval(() => {
        getSites();
      }, 30000);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [getSites, autoRefresh]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <div className="text-center">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold">DASHBOARD</h1>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {autoRefresh ? "Parar Auto-Refresh" : "Iniciar Auto-Refresh"}
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Fullscreen
          </button>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Acompanhe em tempo real o status dos seus sites
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {sites.map((site) => (
          <div
            key={site.site_id}
            className={`rounded-lg p-4 flex flex-col justify-center items-center transition-shadow w-full ${
              site.status === "offline"
                ? "border-4 border-red-500 animate-pulse"
                : "border border-gray-200 dark:border-gray-700"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-1">{site.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{site.url}</p>
            {site.status === "offline" ? (
              <span className="inline-flex items-center px-2 py-1 text-sm rounded bg-red-100 text-red-800 font-semibold">
                OFFLINE
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 text-sm rounded bg-green-100 text-green-800 font-semibold">
                ONLINE
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
